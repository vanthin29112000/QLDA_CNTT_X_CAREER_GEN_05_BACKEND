import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { VouchersService } from "./vouchers/vouchers.service";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const date = new Date().toLocaleDateString();
    return date;
  }
  
}
