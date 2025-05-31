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
      shortCode = nanoid(6) as string;
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
}
