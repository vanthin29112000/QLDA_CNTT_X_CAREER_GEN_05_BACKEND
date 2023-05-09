import { HttpException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './auth.model';
import { UpdateAddressInfo } from './dto/updateAddressInfo';
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

@Injectable()
export class AuthService {
  // private auth: Auth[] = [];
  constructor(@InjectModel('user') private readonly authModel: Model<User>) {}

  async LoginUser(email: string, password: string, req) {
    if (!req.email_verified) {
      throw new HttpException(
        'Email chưa được xác thực vui lòng xác thực email của bạn',
        400
      );
    }
    const user = await this.authModel
      .findOne({ email: email })
      .select('-password ');

    if (!user) {
      throw new HttpException('Email chưa được đăng kí', 400);
    }

    if (user.block.isBLocking) {
      throw new HttpException('Tài khoản đã bị khóa !!', 400);
    } else {
      return {
        user: user,
        token: JWT.sign({ email }, 'Ma bi mat', { expiresIn: '1d' })
      };
    }
  }

  async RegisterUser(
    email: string,
    password: string,
    name: string,
    phone: string,
    token: string
  ) {
    const userExist = await this.authModel.findOne({ email });
    if (userExist) {
      throw new HttpException('Email đã được đăng kí', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new this.authModel({
      email: email,
      password: passwordHash,
      role: 0,
      name: name,
      phone: phone
    });

    const result = await user.save();
    const userTemp = await this.authModel
      .findOne({ email: email })
      .select('-password');

    return {
      user: userTemp,
      // token: JWT.sign({ email }, 'Ma bi mat', { expiresIn: '1d' }),
      token: JWT.sign({ email }, 'Ma bi mat', { expiresIn: '1d' })
    };
  }

  async LoginWithFirebase(
    email: string,
    name: string,
    phone: string,
    avatar: string,
    token: string
  ) {
    const user = await this.authModel
      .findOne({ email: email })
      .select('-password ');
    if (user.block.isBLocking) {
      throw new HttpException('Tài khoản đã bị khóa', 400);
    } else {
      const tokenSign = JWT.sign({ email }, 'Ma bi mat', { expiresIn: '1d' });
      if (user) {
        return { user: user, token: tokenSign };
      } else {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('123456789', salt);
        const tempUser = new this.authModel({
          email: email,
          password: passwordHash,
          role: 0,
          name: name,
          phone: phone,
          avatar: avatar
        });
        const result = await tempUser.save();

        const authTemp = await this.authModel
          .findOne({ email: email })
          .select('-password ');

        return {
          user: authTemp,
          token: tokenSign
        };
      }
    }
  }

  async updateInfoUser(
    email: string,
    name: string,
    phone: string,
    password: string,
    avatar: string,
    gender: number,
    nationality: string,
    address: UpdateAddressInfo,
    birthday: Date,
    user: User
  ) {
    const userTemp = await this.authModel.findOne({ _id: user._id });
    userTemp.email = email || userTemp.email;
    userTemp.name = name || userTemp.name;
    userTemp.phone = phone || userTemp.phone;
    userTemp.avatar = avatar || userTemp.avatar;
    userTemp.birthday = birthday || userTemp.birthday;
    userTemp.nationality = nationality || userTemp.nationality;
    if (gender >= -1 && gender <= 2) {
      userTemp.gender = gender;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      userTemp.password = passwordHash;
    }

    if (address) {
      if (
        address.mainAddress !== '' &&
        address.city.id !== '' &&
        address.district.id !== '' &&
        address.ward.id !== ''
      ) {
        userTemp.address = address;
      }
    }

    const temp = userTemp.save();

    return temp;
  }

  async getAllUser() {
    const listUser = await this.authModel.find().select('-password ');
    return listUser;
  }

  async blockingUser(id: string) {
    const user = await this.authModel.findById(id).select('-password ');
    user.block.isBLocking = !user.block.isBLocking;

    await user.save();
    return await this.authModel.find().select('-password ');
  }
}
