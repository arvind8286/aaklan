import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { customInterceptor } from './core/interceptor/custom.interceptor';
// import {HashLocationStrategy,LocationStrategy}from '@angular/common'

export const appConfig: ApplicationConfig = {
  // providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(),provideHttpClient(withInterceptors([customInterceptor]))]
  providers: [provideRouter(routes),provideAnimationsAsync(), provideAnimationsAsync(),provideHttpClient(withInterceptors([customInterceptor]))]
};
