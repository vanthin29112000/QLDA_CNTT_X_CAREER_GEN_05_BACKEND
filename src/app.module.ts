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
import { InvoiceModule } from './invoice/invoices.module';
import { StorageVoucherModule } from './storageVoucher/storageVoucher.module';
import { StaffModule } from './staff/staff.module';
import { LoggerAdminMiddleware } from './common/middleware/loggerAdmin.middleware';
import { StaffSchema } from './staff/staff.model';

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
    InvoiceModule,
    StorageVoucherModule,
    StaffModule,
    MongooseModule.forRoot(MONGODBHOST),
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: AuthSchema
      },
      {
        name: 'staff',
        schema: StaffSchema
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
      .forRoutes(
        { path: 'auth', method: RequestMethod.GET },
        { path: 'auth', method: RequestMethod.PUT }
      );
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'auth/all', method: RequestMethod.GET });
    // consumer
    //   .apply(LoggerAdminMiddleware)
    //   .forRoutes({ path: 'staff', method: RequestMethod.GET });

    consumer
      .apply(logger)
      .exclude(
        { path: 'auth', method: RequestMethod.GET },
        { path: 'auth', method: RequestMethod.PUT },
        { path: 'auth/blocking/:id', method: RequestMethod.POST },
        { path: 'auth/all', method: RequestMethod.GET }
      )
      .forRoutes('auth');

    consumer.apply(LoggerMiddleware).forRoutes('cart-item');
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'invoice', method: RequestMethod.GET },
        { path: 'invoice', method: RequestMethod.PUT }
      );
    // consumer
    //   .apply(logger)
    //   .exclude({ path: 'news', method: RequestMethod.GET })
    //   .forRoutes('news');

    consumer
      .apply(LoggerAdminMiddleware)
      .forRoutes(
        { path: 'staff', method: RequestMethod.GET },
        { path: 'auth/all', method: RequestMethod.GET },
        { path: 'auth/blocking/:id', method: RequestMethod.POST }
      );
  }
}
