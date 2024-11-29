import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const { username, password, role } = dto;

    try {
      const hash = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        username,
        password: hash,
        role
      });

      const savedUser = await this.userRepository.save(user);
      return this.signToken(savedUser.id, savedUser.username);
      
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('Username already taken ');
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const { username, password } = dto;

    const user = await this.userRepository.findOne({ 
      where: { username },
      select: ['id', 'username', 'password']
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect 🥹');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    
    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect 🥹');
    }

    return this.signToken(user.id, user.username);
  }

  private async signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}