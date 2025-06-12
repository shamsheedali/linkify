import { Injectable, NotFoundException } from '@nestjs/common';
import { Url } from './schemas/url.schema';
import { UrlRepository } from './url.repository';
import { Types } from 'mongoose';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepo: UrlRepository) {}

  async shortenUrl(originalUrl: string, userId?: string): Promise<Url> {
    const { nanoid } = await import('nanoid');

    let shortCode: string;
    do {
      shortCode = nanoid(6);
    } while (await this.urlRepo.isShortCodeExists(shortCode));

    return this.urlRepo.create(originalUrl, shortCode, userId);
  }

  async getOriginalUrl(shortCode: string): Promise<Url> {
    const url = await this.urlRepo.findByShortCode(shortCode);
    if (!url) throw new NotFoundException('Short URL not found');

    await this.urlRepo.incrementClicks(url);
    return url;
  }

  async getUserUrls(userId: string): Promise<Url[]> {
    return this.urlRepo.findByUserId(userId);
  }

  async updateUrl(id: string, userId: string, newUrl: string): Promise<Url> {
    const url = await this.urlRepo.findByIdAndUser(id, userId);
    if (!url) throw new NotFoundException('URL not found or not owned by user');

    return this.urlRepo.updateUrl(url, newUrl);
  }

  async deleteUrl(id: string, userId: string): Promise<void> {
    const url = await this.urlRepo.findByIdAndUser(id, userId);
    if (!url) throw new NotFoundException('URL not found or not owned by user');

    await this.urlRepo.deleteById((url._id as Types.ObjectId).toString());
  }
}
