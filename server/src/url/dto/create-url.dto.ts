import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @IsUrl({}, { message: 'Must be a valid URL' })
  @IsNotEmpty({ message: 'URL is required' })
  originalUrl: string;
}
