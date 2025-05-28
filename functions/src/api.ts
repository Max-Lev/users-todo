import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Import the AppModule using the path alias
import { AppModule } from '@backend/app.module';

const expressServer = express();

let nestApp: any = null;

const createNestServer = async (expressInstance: express.Express) => {
    console.log('AppModule ',AppModule)
  if (nestApp) {
    return nestApp;
  }

  try {
    const adapter = new ExpressAdapter(expressInstance);
    nestApp = await NestFactory.create(AppModule, adapter, {
      logger: ['error', 'warn', 'log'],
    });
    
    nestApp.enableCors({
      origin: true,
      credentials: true,
    });
    
    nestApp.setGlobalPrefix('api');
    await nestApp.init();
    
    console.log('NestJS application initialized successfully');
    return nestApp;
  } catch (error) {
    console.error('Failed to create NestJS server:', error);
    throw error;
  }
};

// Initialize the server
createNestServer(expressServer).catch(console.error);

// Middleware to ensure NestJS is initialized
expressServer.use(async (req, res, next) => {
  try {
    if (!nestApp) {
      await createNestServer(expressServer);
    }
    next();
  } catch (error) {
    console.error('NestJS initialization error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const api = expressServer;
// import { NestFactory } from '@nestjs/core';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import express from 'express';
// import { AppModule } from './modules/app.module';

// const expressServer = express();
// let nestApp: any = null;

// const createNestServer = async (expressInstance: express.Express) => {
//   if (nestApp) {
//     return nestApp;
//   }

//   try {
//     const adapter = new ExpressAdapter(expressInstance);
//     nestApp = await NestFactory.create(AppModule, adapter, {
//       logger: ['error', 'warn', 'log'],
//     });
    
//     nestApp.enableCors({
//       origin: true,
//       credentials: true,
//     });
    
//     nestApp.setGlobalPrefix('api');
//     await nestApp.init();
    
//     console.log('NestJS application initialized successfully');
//     return nestApp;
//   } catch (error) {
//     console.error('Failed to create NestJS server:', error);
//     throw error;
//   }
// };

// // Initialize the server
// createNestServer(expressServer).catch(console.error);

// // Middleware to ensure NestJS is initialized
// expressServer.use(async (req, res, next) => {
//   try {
//     if (!nestApp) {
//       await createNestServer(expressServer);
//     }
//     next();
//   } catch (error) {
//     console.error('NestJS initialization error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// export const api = expressServer;

// // import { NestFactory } from '@nestjs/core';
// // import { ExpressAdapter } from '@nestjs/platform-express';
// // // import { AppModule } from '../../apps/backend/src/app.module';
// // import { AppModule } from '../../apps/backend/src/app.module';
// // // import { AppModule } from '../../apps/backend/src/app.module';
// // import express from 'express';

// // const expressServer = express();

// // const createNestServer = async (expressInstance: express.Express) => {
// //   const adapter = new ExpressAdapter(expressInstance);
// //   const app = await NestFactory.create(AppModule, adapter, {
// //     logger: ['error', 'warn', 'log'],
// //   });
  
// //   app.enableCors({
// //     origin: true,
// //     credentials: true,
// //   });
  
// //   app.setGlobalPrefix('api');
// //   await app.init();
// //   return app;
// // };

// // createNestServer(expressServer);

// // export const api = expressServer;
// // // import { NestFactory } from '@nestjs/core';
// // // import { ExpressAdapter } from '@nestjs/platform-express';
// // // import { AppModule } from '../../apps/backend/src/app.module';
// // // import express from 'express';

// // // const expressServer = express();

// // // const createNestServer = async (expressInstance: express.Express) => {
// // //   const adapter = new ExpressAdapter(expressInstance);
// // //   const app = await NestFactory.create(AppModule, adapter, {
// // //     logger: ['error', 'warn', 'log'],
// // //   });
  
// // //   app.enableCors({
// // //     origin: true,
// // //     credentials: true,
// // //   });
  
// // //   app.setGlobalPrefix('api');
// // //   await app.init();
// // //   return app;
// // // };

// // // createNestServer(expressServer);

// // // export const api = expressServer;