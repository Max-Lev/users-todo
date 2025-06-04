import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withInMemoryScrolling, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideNativeDateAdapter()
  ]
};

// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay())]
// };
