import { Controller, Post, Body } from '@nestjs/common';
import type { SignUpDto, SignInDto } from './dtos/auth';
import { AuthService } from './auth.service';


// Mapeia os endpoints (rota + metodo HTTP) e lida com reqs e responses para passar
// e aplicar as regras de negócio
@Controller('auth')
export class AuthController {
  // InjetaAuthService no controller (eh uma dependencia pro controller),
  // instanciando-o automaticamente pelo NestJS por meio da injeção de dependencia
  constructor(private readonly authService: AuthService) {}

  // POST /auth/signup
  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    console.log({ body });
    await this.authService.signup(body);
    return this.authService.signup(body);
  }

  // POST /auth/signin
  @Post('signin')
  async signin(@Body() body: SignInDto) {
    console.log({ body });
    await this.authService.signin(body);
    return body;
  }
}


