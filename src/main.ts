import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: ['https://voucher-hunter-app.netlify.app/', 'http://localhost:3000'],
//     methods: ['POST', 'PUT', 'DELETE', 'GET'],
//     credentials: true,
//   });
  app.enableCors(
    { 
      origin: ['https://betterjavacode.com', 'https://www.google.com'],
      methods: ['POST', 'PUT', 'DELETE', 'GET']
    }
  );

  await app.listen(3003);
}
bootstrap();
