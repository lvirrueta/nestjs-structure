// Dependencies
import { Controller, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/domain/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  async signUp() {
    return await this.authService.createUser();
  }
}
