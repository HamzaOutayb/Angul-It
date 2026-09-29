import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CaptchaService } from '../../services/captcha';
import { type GridImage } from '../../models/captcha-data';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './captcha.html',
  styleUrl: './captcha.css',
})
export class CaptchaComponent {
  readonly svc = inject(CaptchaService);
  private readonly router = inject(Router);

  // ─── Stage 1 state ──────────────────────────────────────────────────────────
  selectedIds: string[] = [];

  toggleImage(img: GridImage): void {
    const i = this.selectedIds.indexOf(img.id);
    if (i > -1) this.selectedIds.splice(i, 1);
    else this.selectedIds.push(img.id);
  }

  isSelected(img: GridImage): boolean {
    return this.selectedIds.includes(img.id);
  }

  // ─── Stage 2 state ──────────────────────────────────────────────────────────
  typedText = '';

  // ─── Stage 3 state ──────────────────────────────────────────────────────────
  typedAnswer: number | null = null;

  // ─── Shared feedback ────────────────────────────────────────────────────────
  message = '';
  isSuccess = false;

  // ─── Verify current stage ───────────────────────────────────────────────────
  verify(): void {
    const stage = this.svc.stage();

    if (stage === 0) {
      if (this.selectedIds.length === 0) {
        this.message = 'Please select at least one image.';
        this.isSuccess = false;
        return;
      }
      const ok = this.svc.verifyStage1(this.selectedIds);
      this.message = ok ? '✓ Correct! You may continue.' : '✗ Wrong selection. Try again.';
      this.isSuccess = ok;

    } else if (stage === 1) {
      if (!this.typedText || !this.typedText.trim()) {
        this.message = 'Please type the characters shown in the image.';
        this.isSuccess = false;
        return;
      }
      const ok = this.svc.verifyStage2(this.typedText);
      this.message = ok ? '✓ Correct!' : '✗ Incorrect. Look carefully and try again.';
      this.isSuccess = ok;

    } else if (stage === 2) {
      if (this.typedAnswer === null || this.typedAnswer === undefined || this.typedAnswer.toString().trim() === '') {
        this.message = 'Please enter your answer.';
        this.isSuccess = false;
        return;
      }
      const ok = this.svc.verifyStage3(this.typedAnswer);
      this.message = ok ? '✓ Correct!' : '✗ Wrong answer. Try again.';
      this.isSuccess = ok;
    }
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────
  goBack(): void {
    this.svc.prevStage();
    this.resetFeedback();
  }

  goNext(): void {
    const stage = this.svc.stage();
    if (!this.svc.stageIsDone(stage)) return;

    if (stage === 2) {
      this.router.navigate(['/result']);
    } else {
      this.svc.nextStage();
      this.resetFeedback();
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  private resetFeedback(): void {
    this.message = '';
    this.isSuccess = false;
  }

  get isLastStage(): boolean {
    return this.svc.stage() === 2;
  }

  get currentStageDone(): boolean {
    return this.svc.stageIsDone(this.svc.stage());
  }
}
