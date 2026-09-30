import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaService } from '../services/captcha';

export const captchaGuard: CanActivateFn = () => {
  const captchaService = inject(CaptchaService);
  const router = inject(Router);

  if (captchaService.isAllDone()) {
    return router.createUrlTree(['/result']);
  }

  // Otherwise allow access — the captcha component will display the current stage
  return true;
};
