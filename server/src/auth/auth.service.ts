import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(createUserDto);

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
    };

    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_JWT_SECRET')!,
      expiresIn: '7d',
    });

    return {
      access_token,
      refresh_token,
      user,
    };
  }
}
