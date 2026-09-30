import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ResultComponent } from './pages/result/result';
import { CaptchaComponent } from './pages/captcha/captcha';
import { resultGuard } from './guards/result.guard';
import { captchaGuard } from './guards/captcha.guard';


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
    canActivate: [captchaGuard],
  },
  {
    path: 'result',
    component: ResultComponent,
    title: 'Angul-It • Verification Result',
    canActivate: [resultGuard], 
  },
  {
    path: '**',
    redirectTo: '',
  },
];
