import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff } from './staff.model';
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

@Injectable()
export class StaffService {
  // private auth: Auth[] = [];
  constructor(
    @InjectModel('staff') private readonly staffModel: Model<Staff>
  ) {}

  async LoginStaff(username: string, password: string) {
    const user = await this.staffModel.findOne({ username: username });

    if (!user) {
      throw new HttpException('Tài khoản chưa được đăng kí', 400);
    }

    const flag = await bcrypt.compare(password, user.password);
    console.log('flag', flag);

    if (!flag) {
      throw new HttpException('Tài khoản hoặc mật khẩu không đúng!!', 400);
    }

    if (user.block.isBLocking) {
      throw new HttpException('Tài khoản đã bị khóa !!', 400);
    } else {
      return {
        user: user,
        token: JWT.sign({ username }, 'Ma bi mat', { expiresIn: '1d' })
      };
    }
  }

  async RegisterStaff(
    username: string,
    password: string,
    name: string,
    phone: string
  ) {
    const userExist = await this.staffModel.findOne({ username });
    if (userExist) {
      throw new HttpException('Tài khoản đã được đăng kí', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new this.staffModel({
      username: username,
      password: passwordHash,
      role: 1,
      name: name,
      phone: phone
    });

    const result = await user.save();
    const userTemp = await this.staffModel
      .findOne({ username: username })
      .select('-password');

    return {
      user: userTemp,
      token: JWT.sign({ username }, 'Ma bi mat', { expiresIn: '1d' })
    };
  }
}
