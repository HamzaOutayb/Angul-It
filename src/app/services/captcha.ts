import { Injectable, signal, computed } from '@angular/core';
import {
  STAGE1_GRID,
  STAGE1_CORRECT_IDS,
  STAGE2_SAMPLES,
  type GridImage,
  type SampleImage,
} from '../models/captcha-data';

// ─── State shape ──────────────────────────────────────────────────────────────

export interface MathChallenge {
  a: number;
  b: number;
  answer: number; // a + b
}

export interface CaptchaState {
  // which stage the user is on (0, 1, 2)
  stage: number;

  // stage completion flags
  stage1Done: boolean;
  stage2Done: boolean;
  stage3Done: boolean;

  // stage 2: which sample image is shown this session
  sample: SampleImage;

  // stage 3: the equation for this session
  math: MathChallenge;
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CaptchaService {

  // Pick a random item from an array
  private pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Build a fresh initial state
  private freshState(): CaptchaState {
    const a = Math.floor(Math.random() * 101);
    const b = Math.floor(Math.random() * 101);
    return {
      stage: 0,
      stage1Done: false,
      stage2Done: false,
      stage3Done: false,
      sample: this.pick(STAGE2_SAMPLES),
      math: { a, b, answer: a + b },
    };
  }

  // Main reactive state
  private readonly _state = signal<CaptchaState>(this.freshState());
  readonly state = this._state.asReadonly();

  // Convenient computed helpers for templates
  readonly stage         = computed(() => this._state().stage);
  readonly stage1Done    = computed(() => this._state().stage1Done);
  readonly stage2Done    = computed(() => this._state().stage2Done);
  readonly stage3Done    = computed(() => this._state().stage3Done);
  readonly isAllDone     = computed(() =>
    this._state().stage1Done &&
    this._state().stage2Done &&
    this._state().stage3Done
  );
  readonly sample        = computed(() => this._state().sample);
  readonly math          = computed(() => this._state().math);

  // Stage 1 data (always the same hardcoded grid)
  readonly grid: GridImage[]  = STAGE1_GRID;
  readonly correctIds: string[] = STAGE1_CORRECT_IDS;

  // ─── Stage verification ─────────────────────────────────────────────────────

  /** Stage 1: user must select exactly the 3 cat tiles */
  verifyStage1(selectedIds: string[]): boolean {
    const correct =
      selectedIds.length === this.correctIds.length &&
      this.correctIds.every(id => selectedIds.includes(id));

    if (correct) {
      this._state.update(s => ({ ...s, stage1Done: true }));
    }
    return correct;
  }

  /** Stage 2: user types the text shown in the sample image (case-insensitive) */
  verifyStage2(typed: string): boolean {
    const correct = typed.trim().toLowerCase() === this._state().sample.answer.toLowerCase();
    if (correct) {
      this._state.update(s => ({ ...s, stage2Done: true }));
    }
    return correct;
  }

  /** Stage 3: user types the sum of a + b */
  verifyStage3(typed: number | null | undefined): boolean {
    const correct = typed === this._state().math.answer;
    if (correct) {
      this._state.update(s => ({ ...s, stage3Done: true }));
    }
    return correct;
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────

  goTo(stage: number): void {
    this._state.update(s => ({ ...s, stage }));
  }

  nextStage(): void {
    this._state.update(s => ({ ...s, stage: Math.min(s.stage + 1, 2) }));
  }

  prevStage(): void {
    this._state.update(s => ({ ...s, stage: Math.max(s.stage - 1, 0) }));
  }

  canGoBack(): boolean {
    return this._state().stage > 0;
  }

  stageIsDone(stage: number): boolean {
    const s = this._state();
    if (stage === 0) return s.stage1Done;
    if (stage === 1) return s.stage2Done;
    if (stage === 2) return s.stage3Done;
    return false;
  }

  // ─── Session reset ───────────────────────────────────────────────────────────

  restart(): void {
    this._state.set(this.freshState());
  }
}
