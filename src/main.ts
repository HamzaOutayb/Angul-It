import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * Main Application Entry Point
 *
 * Bootstraps the standalone `App` component with providers configured in `appConfig`.
 */
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
