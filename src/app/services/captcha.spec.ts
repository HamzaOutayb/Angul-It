import { TestBed } from '@angular/core/testing';
import { CaptchaService } from './captcha';
import { STAGE1_CORRECT_IDS, STAGE1_GRID } from '../models/captcha-data';

describe('CaptchaService', () => {
  let svc: CaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    svc = TestBed.inject(CaptchaService);
  });

  it('should start at stage 0 with nothing done', () => {
    expect(svc.stage()).toBe(0);
    expect(svc.stage1Done()).toBe(false);
    expect(svc.stage2Done()).toBe(false);
    expect(svc.stage3Done()).toBe(false);
    expect(svc.isAllDone()).toBe(false);
  });

  it('should expose the hardcoded grid with 9 images (3 cats)', () => {
    expect(svc.grid.length).toBe(9);
    const cats = svc.grid.filter(img => img.isCat);
    expect(cats.length).toBe(3);
  });

  it('stage 1 — correct selection succeeds', () => {
    expect(svc.verifyStage1(STAGE1_CORRECT_IDS)).toBe(true);
    expect(svc.stage1Done()).toBe(true);
  });

  it('stage 1 — wrong selection fails', () => {
    const wrong = [STAGE1_GRID[1].id, STAGE1_GRID[3].id, STAGE1_GRID[5].id];
    expect(svc.verifyStage1(wrong)).toBe(false);
    expect(svc.stage1Done()).toBe(false);
  });

  it('stage 2 — correct text (case-insensitive) succeeds', () => {
    const answer = svc.sample().answer;
    expect(svc.verifyStage2(answer.toUpperCase())).toBe(true);
    expect(svc.stage2Done()).toBe(true);
  });

  it('stage 2 — wrong text fails', () => {
    expect(svc.verifyStage2('wrong')).toBe(false);
    expect(svc.stage2Done()).toBe(false);
  });

  it('stage 3 — correct sum succeeds', () => {
    const { answer } = svc.math();
    expect(svc.verifyStage3(answer)).toBe(true);
    expect(svc.stage3Done()).toBe(true);
  });

  it('stage 3 — wrong sum fails', () => {
    const { answer } = svc.math();
    expect(svc.verifyStage3(answer + 1)).toBe(false);
    expect(svc.stage3Done()).toBe(false);
  });

  it('navigation: canGoBack is false on stage 0, true after moving forward', () => {
    expect(svc.canGoBack()).toBe(false);
    svc.verifyStage1(STAGE1_CORRECT_IDS);
    svc.nextStage();
    expect(svc.stage()).toBe(1);
    expect(svc.canGoBack()).toBe(true);
  });

  it('restart resets all state', () => {
    svc.verifyStage1(STAGE1_CORRECT_IDS);
    svc.restart();
    expect(svc.stage()).toBe(0);
    expect(svc.stage1Done()).toBe(false);
    expect(svc.isAllDone()).toBe(false);
  });

  it('isAllDone only true when all three stages are verified', () => {
    svc.verifyStage1(STAGE1_CORRECT_IDS);
    svc.verifyStage2(svc.sample().answer);
    expect(svc.isAllDone()).toBe(false);
    svc.verifyStage3(svc.math().answer);
    expect(svc.isAllDone()).toBe(true);
  });
});
