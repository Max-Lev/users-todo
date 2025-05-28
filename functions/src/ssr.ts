import express from 'express';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

const app = express();
const DIST_FOLDER = join(process.cwd(), 'apps/frontend/dist');
const SERVER_BUNDLE = join(DIST_FOLDER, 'server', 'server.mjs');

// Check if server bundle exists
if (!existsSync(SERVER_BUNDLE)) {
  throw new Error(`Server bundle not found at: ${SERVER_BUNDLE}`);
}

// Import the Angular SSR app
let angularApp: any;

const initializeApp = async () => {
  try {
    // Dynamic import of the Angular SSR server bundle
    const serverModule = await import(SERVER_BUNDLE);
    angularApp = serverModule.app || serverModule.default;
    
    if (!angularApp) {
      throw new Error('No Angular app export found in server bundle');
    }
  } catch (error) {
    console.error('Failed to initialize Angular SSR app:', error);
    throw error;
  }
};

// Initialize the app
initializeApp().catch(console.error);

// Serve static files from browser build
const browserPath = join(DIST_FOLDER, 'browser');
app.use(express.static(browserPath, {
  maxAge: '1y',
  index: false // Don't serve index.html for static files
}));

// Handle all routes with Angular SSR
app.get('*', async (req, res, next) => {
  try {
    if (!angularApp) {
      await initializeApp();
    }
    
    // Use the Angular SSR handler
    return angularApp(req, res, next);
  } catch (error) {
    console.error('SSR Error:', error);
    // Fallback to serving static index.html
    const indexPath = join(browserPath, 'index.html');
    if (existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(500).send('Server Error');
    }
  }
});

export const ssrApp = app;


// import express from 'express';
// import { join } from 'path';
// import { existsSync, readFileSync } from 'fs';

// const app = express();
// const DIST_FOLDER = join(process.cwd(), 'apps/frontend/dist');
// const SERVER_BUNDLE = join(DIST_FOLDER, 'server', 'server.mjs');

// // Check if server bundle exists
// if (!existsSync(SERVER_BUNDLE)) {
//     throw new Error(`Server bundle not found at: ${SERVER_BUNDLE}`);
// }

// // Import the Angular SSR app
// let angularApp: any;

// const initializeApp = async () => {
//     try {
//         // Dynamic import of the Angular SSR server bundle
//         const serverModule = await import(SERVER_BUNDLE);
//         angularApp = serverModule.app || serverModule.default;

//         if (!angularApp) {
//             throw new Error('No Angular app export found in server bundle');
//         }
//     } catch (error) {
//         console.error('Failed to initialize Angular SSR app:', error);
//         throw error;
//     }
// };

// // Initialize the app
// initializeApp().catch(console.error);

// // Serve static files from browser build
// const browserPath = join(DIST_FOLDER, 'browser');
// app.use(express.static(browserPath, {
//     maxAge: '1y',
//     index: false // Don't serve index.html for static files
// }));

// // Handle all routes with Angular SSR
// app.get('*', async (req, res, next) => {
//     try {
//         if (!angularApp) {
//             await initializeApp();
//         }

//         // Use the Angular SSR handler
//         return angularApp(req, res, next);
//     } catch (error) {
//         console.error('SSR Error:', error);
//         // Fallback to serving static index.html
//         const indexPath = join(browserPath, 'index.html');
//         if (existsSync(indexPath)) {
//             res.sendFile(indexPath);
//         } else {
//             res.status(500).send('Server Error');
//         }
//     }
// });

// export const ssrApp = app;

// // import { ngExpressEngine } from '@nguniversal/express-engine';
// // import { APP_BASE_HREF } from '@angular/common';
// // // import { existsSync } from 'fs';
// // import express from 'express';
// // import { join } from 'path';

// // // import { AppServerModule } from '../../apps/frontend/src/main.server';
// // import { AppServerModule } from '../../apps/frontend/src/main.server';

// // const app = express();
// // const DIST_FOLDER = join(process.cwd());

// // // Angular Universal Express Engine
// // app.engine('html', ngExpressEngine({
// //   bootstrap: AppServerModule,
// // }));

// // app.set('view engine', 'html');
// // app.set('views', DIST_FOLDER);

// // // Serve static files
// // app.get('*.*', express.static(DIST_FOLDER, {
// //   maxAge: '1y'
// // }));

// // // Serve Angular app
// // app.get('*', (req, res) => {
// //   res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
// // });

// // export const ssrApp = app;