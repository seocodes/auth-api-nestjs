import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignInDto } from './dtos/auth';

@Injectable() // Dita que a classe é injetável (dependency injection), e portanto, é um Provider!
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(data: SignUpDto) {
    const userAlreadyExists = await this.prisma.user.findUnique({ where: { email: data.email } })
    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }
    const user = await this.prisma.user.create({ data })
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async signin(data: SignInDto) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { message: 'User signed in successfully' };
  }
}
