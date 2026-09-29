import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Application Configuration
 *
 * Bootstraps top-level providers for the Angular standalone application:
 * - `provideBrowserGlobalErrorListeners()`: Captures and handles unhandled browser errors.
 * - `provideRouter(routes)`: Configures client-side routing defined in `app.routes.ts`.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
