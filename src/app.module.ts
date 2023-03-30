import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthSchema } from './auth/auth.model';
import { AuthModule } from './auth/auth.module';
import { logger } from './common/middleware/checkTokenFirebase';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { NewsModule } from './news/news.module';
import { ProductModule } from './product/product.module';
import { FeedsModule } from './feeds/feeds.module';
import { CartItemModule } from './cartItem/cart-item.module';

const MONGODBLOCAL = 'mongodb://localhost:27017/nest';
const MONGODBHOST =
  'mongodb+srv://vanthin1203:thin0909679602@cluster0.epzf5.mongodb.net/?retryWrites=true&w=majority';
@Module({
  imports: [
    AuthModule,
    NewsModule,
    ProductModule,
    FeedsModule,
    CartItemModule,
    MongooseModule.forRoot(MONGODBLOCAL),
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: AuthSchema
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'auth', method: RequestMethod.GET });

    consumer
      .apply(logger)
      .exclude({ path: 'auth', method: RequestMethod.GET })
      .forRoutes('auth');

    // consumer
    //   .apply(logger)
    //   .exclude({ path: 'news', method: RequestMethod.GET })
    //   .forRoutes('news');
  }
}
