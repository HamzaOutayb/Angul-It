import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * HomeComponent
 *
 * Flow & Responsibilities:
 * 1. Serves as the landing page for users entering the Angul-It application.
 * 2. Displays brief introductory information about the multi-stage CAPTCHA verification.
 * 3. Provides a "Start Challenge" button that programmatically navigates to `/captcha`.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  // Angular Router injected for programmatic navigation
  private readonly router = inject(Router);

  /**
   * Initiates the CAPTCHA workflow by navigating the user to the challenge page.
   */
  startChallenge(): void {
    this.router.navigate(['/captcha']);
  }
}
