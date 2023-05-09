import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { Staff } from 'src/staff/staff.model';
const JWT = require('jsonwebtoken');

@Injectable()
export class LoggerAdminMiddleware implements NestMiddleware {
  // constructor(private readonly authModel: Model<Auth>) {}
  constructor(
    @InjectModel('staff') private readonly StaffModel: Model<Staff>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.split(' ')[1];
      try {
        const resultVerify = JWT.verify(token, 'Ma bi mat');
        const user = await this.StaffModel.findOne({
          username: resultVerify.username
        }).select('-password ');

        if (!user || user.block.isBLocking) {
          throw new HttpException('Không tìm thấy tài khoản này', 400);
        }

        req.user = user;
        next();
      } catch (error) {
        throw new HttpException('Vui lòng đăng nhập/ đăng kí', 401);
      }
    } else {
      throw new HttpException('Vui lòng đăng nhập/ đăng kí', 401);
    }
  }
}
