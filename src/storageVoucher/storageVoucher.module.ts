import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { storageVoucher } from './storageVoucher.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'storageVoucher', schema: storageVoucher }
    ])
  ]
})
export class StorageVoucherModule {}
