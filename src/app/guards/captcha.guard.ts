import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CaptchaService } from '../services/captcha';

/**
 * Captcha Guard (`captchaGuard`)
 *
 * Flow & Security Purpose:
 * - Protects the `/captcha` route so that users who have already completed all stages
 *   cannot re-enter the challenge by typing `/captcha` in the URL bar.
 * - Flow:
 *   1. Reads `isAllDone()` from `CaptchaService`.
 *   2. If true (all stages completed), redirects the user to `/result`.
 *   3. If false (stages still in progress), grants access (`return true`).
 */
export const captchaGuard: CanActivateFn = () => {
  const captchaService = inject(CaptchaService);
  const router = inject(Router);

  // If all stages are done, send them to the result page
  if (captchaService.isAllDone()) {
    return router.createUrlTree(['/result']);
  }

  // Otherwise allow access — the captcha component will display the current stage
  return true;
};
