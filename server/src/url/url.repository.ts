import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Url } from './schemas/url.schema';

@Injectable()
export class UrlRepository {
  constructor(
    @InjectModel(Url.name)
    private readonly urlModel: Model<Url>,
  ) {}

  async isShortCodeExists(shortCode: string): Promise<boolean> {
    const exists = await this.urlModel.exists({ shortCode });
    return !!exists;
  }

  async create(
    originalUrl: string,
    shortCode: string,
    userId?: string,
  ): Promise<Url> {
    const newUrl = new this.urlModel({
      originalUrl,
      shortCode,
      userId: userId ? new Types.ObjectId(userId) : undefined,
    });
    return newUrl.save();
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return this.urlModel.findOne({ shortCode }).exec();
  }

  async incrementClicks(url: Url): Promise<void> {
    url.clicks += 1;
    await url.save();
  }

  async findByUserId(userId: string): Promise<Url[]> {
    return this.urlModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByIdAndUser(id: string, userId: string): Promise<Url | null> {
    return this.urlModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });
  }

  async updateUrl(url: Url, newUrl: string): Promise<Url> {
    url.originalUrl = newUrl;
    return url.save();
  }

  async deleteById(id: string): Promise<void> {
    await this.urlModel.deleteOne({ _id: id });
  }
}
