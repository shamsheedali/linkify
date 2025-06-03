import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Url } from './schemas/url.schema';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async shortenUrl(originalUrl: string, userId?: string): Promise<Url> {
    let shortCode: string;

    // Generate a unique short code
    do {
      shortCode = nanoid(6);
    } while (await this.urlModel.exists({ shortCode }));

    const newUrl = new this.urlModel({
      originalUrl,
      shortCode,
      userId: userId ? new Types.ObjectId(userId) : undefined,
    });

    return newUrl.save();
  }

  async getOriginalUrl(shortCode: string): Promise<Url> {
    const found = await this.urlModel.findOne({ shortCode }).exec();
    if (!found) {
      throw new NotFoundException('Short URL not found');
    }

    found.clicks += 1;
    await found.save();

    return found;
  }

  async getUserUrls(userId: string): Promise<Url[]> {
    return this.urlModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateUrl(id: string, userId: string, newUrl: string): Promise<Url> {
    const url = await this.urlModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!url) {
      throw new NotFoundException('URL not found or not owned by user');
    }

    url.originalUrl = newUrl;
    return await url.save();
  }

  async deleteUrl(id: string, userId: string): Promise<void> {
    const url = await this.urlModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });

    if (!url) {
      throw new NotFoundException('URL not found or not owned by user');
    }

    await this.urlModel.deleteOne({ _id: url._id });
  }
}
