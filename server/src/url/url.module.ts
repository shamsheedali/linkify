import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './schemas/url.schema';
import { UrlRepository } from './url.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  providers: [UrlService, UrlRepository],
  controllers: [UrlController],
})
export class UrlModule {}
