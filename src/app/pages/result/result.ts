import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaService } from '../../services/captcha';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class ResultComponent {
  readonly svc = inject(CaptchaService);
  private readonly router = inject(Router);

  readonly stages = [
    { label: 'Stage 1 — Find the cats' },
    { label: 'Stage 2 — Type the image text' },
    { label: 'Stage 3 — Solve the equation' },
  ];

  restart(): void {
    this.svc.restart();
    this.router.navigate(['/captcha']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
