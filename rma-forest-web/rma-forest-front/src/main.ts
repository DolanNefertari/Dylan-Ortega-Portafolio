import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import localeEsCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsCL);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
