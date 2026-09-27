import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ResultComponent } from './pages/result/result';
import { CaptchaComponent } from './pages/captcha/captcha';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'result',
        component: ResultComponent
    },
    { 
        path: 'captcha', 
        component: CaptchaComponent },
];