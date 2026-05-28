import { Injectable } from '@nestjs/common';

@Injectable() // Dita que a classe é injetável (dependency injection), e portanto, é um Provider!
export class AuthService {
  async signup(data: SignupDto) {
    console.log({data})
    return { message: 'User created successfully' };
  }

  async signin(data: SigninDto) {
    console.log({data})
    return { message: 'User signed in successfully' };
  }
}
