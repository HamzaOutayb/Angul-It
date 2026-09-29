import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root Application Component (App)
 *
 * Flow & Role:
 * - Serves as the top-level shell for the entire application.
 * - Houses the `<router-outlet>` in `app.html` which dynamically displays
 *   the routed components (HomeComponent, CaptchaComponent, ResultComponent).
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Application title
  readonly title = 'Angul-It';
}
