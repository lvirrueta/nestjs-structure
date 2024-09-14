// Dependencies
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

// Service
import { AuthService } from '@auth/domain/service/auth.service';

// Dto
import { SignUpDto } from '@auth/app/dto/sign-up.dto';
import { SignInDto } from '@auth/app/dto/sign-in.dto';

// Api Model
import { UserApi } from '@auth/app/swagger/user-api';

// Models
import { JsonResponse } from '@shared/app/model/json-response.class';

// Decorator
import { ApiJsonResponse } from '@shared/app/decorator/api-response.decorator';

// Constants
import { Routes } from '@shared/app/routes/routes.constants';

@ApiExtraModels(UserApi)
@ApiTags(Routes.Auth.ApiTags)
@Controller(Routes.Auth.Controller)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Routes.Auth.signUp)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  @ApiOperation({ summary: 'Register to the application', description: 'return an access token & refresh token' })
  async signUp(@Body() dto: SignUpDto): Promise<JsonResponse<UserApi>> {
    const data = await this.authService.signUp(dto);
    return new JsonResponse<UserApi>({ data });
  }

  @Post(Routes.Auth.signIn)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  @ApiOperation({ summary: 'Login to the application', description: 'return an access token & refresh token' })
  async signIn(@Body() dto: SignInDto): Promise<JsonResponse<UserApi>> {
    const data = await this.authService.signIn(dto);
    return new JsonResponse<UserApi>({ data });
  }
}
