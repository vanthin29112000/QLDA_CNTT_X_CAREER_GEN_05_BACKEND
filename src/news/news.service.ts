import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './news.model';

@Injectable()
export class NewsService {
  // private auth: Auth[] = [];
  constructor(@InjectModel('news') private readonly newsModel: Model<News>) {}

  async AddNews(
    imgThumbnail: string,
    title: string,
    type: string,
    status: string,
    content: string,
  ) {
    const news = new this.newsModel({
      imgThumbnail: imgThumbnail,
      title: title,
      type: type,
      status: status,
      content: content,
    });

    const result = await news.save();

    const listNews = await this.newsModel.find();
    return listNews;
  }

  async GetAllNews() {
    const listNews = await this.newsModel.find();
    return listNews;
  }

  async GetNewID(id: string) {
    const newItem = await this.newsModel.findById(id);
    return newItem;
  }

  async GetViewNewID(id: string) {
    const newItem = await this.newsModel.findById(id);
    newItem.views = +newItem.views + 1;

    const result = await newItem.save();

    return result;
  }

  async updateNewItem(
    id: string,
    imgThumbnail: string,
    title: string,
    type: string,
    status: string,
    content: string,
  ) {
    const newItem = await this.newsModel.findById(id);

    newItem.imgThumbnail = imgThumbnail;
    newItem.title = title;
    newItem.type = type;
    newItem.status = status;
    newItem.content = content;

    const result = await newItem.save();

    const listNews = await this.newsModel.find();
    return listNews;
  }

  async deleteNew(id: string) {
    const newItem = await this.newsModel.findById(id);
    newItem.status = 'delete';

    const result = await newItem.save();

    const listNews = await this.newsModel.find();
    return listNews;
  }
}
