import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS explicitly
  app.enableCors({
    origin: 'http://localhost:3001', // allow React frontend
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true, // if you send cookies or Authorization headers
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

