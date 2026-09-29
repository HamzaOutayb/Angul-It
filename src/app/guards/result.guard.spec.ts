import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { resultGuard } from './result.guard';
import { CaptchaService } from '../services/captcha';
import { STAGE1_CORRECT_IDS } from '../models/captcha-data';

describe('resultGuard', () => {
  let service: CaptchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(CaptchaService);
  });

  it('should redirect to /captcha when not all stages are done', () => {
    expect(service.isAllDone()).toBe(false);
    const result = TestBed.runInInjectionContext(() => resultGuard({} as any, {} as any));
    expect(result instanceof UrlTree).toBe(true);
    expect((result as UrlTree).toString()).toBe('/captcha');
  });

  it('should allow access to /result when all stages are completed', () => {
    // Complete all 3 stages
    service.verifyStage1(STAGE1_CORRECT_IDS);
    service.verifyStage2(service.sample().answer);
    service.verifyStage3(service.math().answer);

    expect(service.isAllDone()).toBe(true);

    const result = TestBed.runInInjectionContext(() => resultGuard({} as any, {} as any));
    expect(result).toBe(true);
  });
});
