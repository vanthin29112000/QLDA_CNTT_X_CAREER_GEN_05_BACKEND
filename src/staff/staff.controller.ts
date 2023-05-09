import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { StaffService } from './staff.service';
import { User } from 'src/auth/auth.decorator';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  async GetProfileStaff(@User() user) {
    return user;
  }

  @Post('/login')
  async LoginUser(
    @Body('password') password: string,
    @Body('username') username: string
  ) {
    const user = await this.staffService.LoginStaff(username, password);
    return { user };
  }

  @Post('/register')
  async RegisterUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('phone') phone: string
  ) {
    const user = await this.staffService.RegisterStaff(
      username,
      password,
      name,
      phone
    );
    return { user };
  }
}
