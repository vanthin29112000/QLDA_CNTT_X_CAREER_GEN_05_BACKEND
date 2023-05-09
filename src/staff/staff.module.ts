import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { StaffSchema } from './staff.model';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'staff',
        schema: StaffSchema
      }
    ]),
    JwtModule.register({
      secret: 'ma bi mat',
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {}
