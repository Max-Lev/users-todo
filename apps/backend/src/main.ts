// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

export const createNestApp = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  app.enableCors({
    origin: ['http://localhost:4200',
      'https://users-todo-6a278.web.app',
      'https://users-todo-6a278.firebaseapp.com'], // ❌ remove trailing slashes
    methods: ['GET', 'POST'], // ✅ array or string
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // ✅ if you want cookies/session headers to work
    maxAge: 86400,
  });
  await app.init();

  // ✅ Only listen and log when not running inside Firebase
  if (!process.env.FUNCTION_NAME) {
    const port = process.env.PORT || 3000;
    expressInstance.listen(port, () => {
      console.log(`🚀 NestJS app running on http://localhost:${port}`);
    });
  }
  
};

createNestApp(expressApp);

export const nestApp = expressApp;


