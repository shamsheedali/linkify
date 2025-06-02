import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  NotFoundException,
  HttpCode,
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  async myUrls(@CurrentUser() user: User) {
    return this.urlService.getUserUrls(user._id.toString());
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async shorten(@Body() body: CreateUrlDto, @CurrentUser() user: User) {
    const url = await this.urlService.shortenUrl(
      body.originalUrl,
      user._id.toString(),
    );

    return {
      shortUrl: `https://linkify.app/${url.shortCode}`,
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      _id: url._id,
    };
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.urlService.getOriginalUrl(shortCode);

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    return res.redirect(HttpStatus.MOVED_PERMANENTLY, url.originalUrl);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUrl(
    @Param('id') id: string,
    @Body('originalUrl') originalUrl: string,
    @CurrentUser() user: User,
  ) {
    return this.urlService.updateUrl(id, user._id.toString(), originalUrl);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUrl(@Param('id') id: string, @CurrentUser() user: User) {
    await this.urlService.deleteUrl(id, user._id.toString());
  }
}
