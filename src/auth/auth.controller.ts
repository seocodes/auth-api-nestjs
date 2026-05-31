import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dtos/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


// Mapeia os endpoints (rota + metodo HTTP) e lida com reqs e responses para passar
// e aplicar as regras de negócio
@Controller('auth')
export class AuthController {
  // Injeta AuthService no controller (eh uma dependencia pro controller),
  // instanciando-o automaticamente pelo NestJS por meio da injeção de dependencia
  constructor(private readonly authService: AuthService) {}

  // POST /auth/signup
  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return await this.authService.signup(body);
  }

  // POST /auth/signin
  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return await this.authService.signin(body);
  }

  // GET /auth/me
  @UseGuards(AuthGuard)  // Roda primeiro o AuthGuard, depois o handler
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}

