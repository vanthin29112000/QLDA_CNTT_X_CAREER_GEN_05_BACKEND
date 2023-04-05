import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: ['https://voucher-hunter-app.netlify.app/', 'http://localhost:3000'],
//     methods: ['POST', 'PUT', 'DELETE', 'GET'],
//     credentials: true,
//   });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    });

    app.enableCors({
        allowedHeaders:"*",
        origin: "*"
    });

  await app.listen(3003);
}
bootstrap();
