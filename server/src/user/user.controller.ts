import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { User } from './user.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getMe(@Req() req: Request & { user: User }) {
    const user = req.user;
    delete user.password;
    return user;
  }
}