import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200',
      'https://users-todo-6a278.web.app',
      'https://users-todo-6a278.firebaseapp.com'], // ❌ remove trailing slashes
    methods: ['GET', 'POST'], // ✅ array or string
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // ✅ if you want cookies/session headers to work
    maxAge: 86400,
  });


  console.log()
  await app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
bootstrap();
