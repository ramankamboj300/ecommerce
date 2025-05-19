import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideCharts } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [provideCharts(),provideAnimations(), provideRouter(routes),provideHttpClient(),provideToastr(),provideAnimations()]
};
