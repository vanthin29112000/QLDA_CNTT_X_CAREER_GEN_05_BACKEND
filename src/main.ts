import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
=======
  app.enableCors();
>>>>>>> c193428462ef8cb8c948879e455e2a19f5cc46b9
  await app.listen(3000);
}
bootstrap();
