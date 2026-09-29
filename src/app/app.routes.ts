import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ResultComponent } from './pages/result/result';
import { CaptchaComponent } from './pages/captcha/captcha';
import { resultGuard } from './guards/result.guard';
import { captchaGuard } from './guards/captcha.guard';

/**
 * Application Route Definitions
 *
 * Flow & Routing Architecture:
 * - `''` (Home): Landing page with "Start Challenge" button.
 * - `'captcha'`: Interactive multi-stage CAPTCHA verification interface.
 *   Guarded by `captchaGuard` — redirects to `/result` if all stages are already completed.
 * - `'result'`: Protected completion dashboard guarded by `resultGuard`.
 *   Redirects to `/captcha` (current stage) if stages are not yet all completed.
 * - `'**'`: Wildcard fallback redirecting any unknown route back to Home.
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Angul-It • Verification Home',
  },
  {
    path: 'captcha',
    component: CaptchaComponent,
    title: 'Angul-It • CAPTCHA Challenge',
    canActivate: [captchaGuard], // Blocks re-entry after all stages are completed
  },
  {
    path: 'result',
    component: ResultComponent,
    title: 'Angul-It • Verification Result',
    canActivate: [resultGuard], // Guard prevents direct access unless all stages are verified
  },
  {
    path: '**',
    redirectTo: '',
  },
];
