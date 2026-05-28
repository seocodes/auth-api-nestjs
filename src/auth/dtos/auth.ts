// Interfaces que define os dados necessários para cada operação de autenticação no Controller

export interface SignUpDto {
  name: string;
  email: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
}
