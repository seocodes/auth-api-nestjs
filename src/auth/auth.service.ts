import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignInDto } from './dtos/auth';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable() // Dita que a classe é injetável (dependency injection), e portanto, é um Provider!
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}
  async signup(data: SignUpDto) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    // Aqui faz sentido usar Await porque bcrypt.hash é uma função assíncrona e retorna uma Promise
    const hashed_password = await bcrypt.hash(data.password, 10); // 10 is the number of salt rounds

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashed_password
      },
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async signin(data: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const acess_token = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return { acess_token };
  }
}
