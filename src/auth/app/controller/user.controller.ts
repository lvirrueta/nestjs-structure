// Dependencies
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, HttpStatus, Param } from '@nestjs/common';

// Service
import { UserService } from '@auth/domain/service/user.service';

// Dto

// Api Model
import { UserApi } from '@auth/app/swagger/user-api';

// Models
import { JsonResponse } from '@shared/app/model/json-response.class';

// Decorator
import { ApiJsonResponse } from '@shared/app/decorator/api-response.decorator';

// Types
import { UUID } from '@shared/app/types/types.types';

// Constants
import { Routes } from '@shared/app/routes/routes.constants';

@ApiExtraModels(UserApi)
@ApiTags(Routes.User.ApiTags)
@Controller(Routes.User.Controller)
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Get(Routes.User.List)
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserApi] })
  @ApiOperation({ summary: 'View all users registered in the application', description: 'all users registered in the app' })
  async getAll(): Promise<JsonResponse<UserApi[]>> {
    const data = await this.authService.getUsers();
    return new JsonResponse<UserApi[]>({ data });
  }

  @Get(Routes.User.Detail)
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserApi] })
  @ApiOperation({ summary: 'View all users registered in the application', description: 'all users registered in the app' })
  async detail(@Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    const data = await this.authService.detailUser(id);
    return new JsonResponse<UserApi>({ data });
  }

  @Delete(Routes.User.Delete)
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserApi] })
  @ApiOperation({ summary: 'delete user', description: 'delete user' })
  async delete(@Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    const data = await this.authService.deleteUser(id);
    return new JsonResponse<UserApi>({ data });
  }
}
