import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaService } from '../services/captcha';

// Blocks /result unless all 3 stages are done
export const resultGuard: CanActivateFn = () => {
  const svc = inject(CaptchaService);
  const router = inject(Router);
  return svc.isAllDone() ? true : router.createUrlTree(['/captcha']);
};
