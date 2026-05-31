// Modelos que definem os dados necessários para cada operação de autenticação no Controller

import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
