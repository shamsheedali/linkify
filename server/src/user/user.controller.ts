import { Controller, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt')) // Protect all endpoints
export class UserController {
  constructor(private readonly userService: UserService) {}
}
