import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthMessages } from 'src/common/constants/messages';

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

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_JWT_SECRET')!,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      user,
      message: AuthMessages.REGISTER_SUCCESS,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.login(loginUserDto);

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_JWT_SECRET')!,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      user,
      message: AuthMessages.LOGIN_SUCCESS,
    };
  }
}
