import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  // Get user's shortened URLs
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async myUrls(@CurrentUser() user: User) {
    return this.urlService.getUserUrls(user._id.toString());
  }

  // Create a short URL
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async shorten(@Body() body: CreateUrlDto, @CurrentUser() user: User) {
    const url = await this.urlService.shortenUrl(
      body.originalUrl,
      user?._id.toString(),
    );

    return {
      shortUrl: `https://linkify.app/${url.shortCode}`,
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      _id: url._id,
    };
  }

  // Public redirection
  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.urlService.getOriginalUrl(shortCode);

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    return res.redirect(HttpStatus.MOVED_PERMANENTLY, url.originalUrl);
  }
}
