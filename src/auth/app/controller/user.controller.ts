// Dependencies
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';

// Service
import { UserService } from '@auth/domain/service/user.service';

// Dto
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

// Api Model
import { UserApi } from '@auth/app/swagger/user-api';

// Models
import { JsonResponse } from '@shared/app/model/json-response.class';

// Decorator
import { Roles } from '../decorators/roles.decorator';
import { ApiJsonResponse } from '@shared/app/decorator/api-response.decorator';

// Types
import { UUID } from '@shared/app/types/types.types';
import { UserTypeEnum } from '@auth/domain/enum/user.enum';

// Constants
import { Routes } from '@shared/app/routes/routes.constants';

@ApiExtraModels(UserApi)
@ApiTags(Routes.User.ApiTags)
@Controller(Routes.User.Controller)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(Routes.User.List)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserApi] })
  @ApiOperation({ summary: 'View all users registered in the application', description: 'all users registered in the app' })
  async getAll(): Promise<JsonResponse<UserApi[]>> {
    const data = await this.userService.getUsers();
    return new JsonResponse<UserApi[]>({ data });
  }

  @Get(Routes.User.Detail)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  @ApiOperation({ summary: 'get the detail of the user', description: 'get the detail of the user' })
  async detail(@Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    const data = await this.userService.detailUser(id);
    return new JsonResponse<UserApi>({ data });
  }

  @Post(Routes.User.Create)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  @ApiOperation({ summary: 'Create any user', description: 'Create any user' })
  async create(@Body() dto: CreateUserDto): Promise<JsonResponse<UserApi>> {
    const data = await this.userService.createUser(dto);
    return new JsonResponse<UserApi>({ data });
  }

  @Put(Routes.User.Update)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  @ApiOperation({ summary: 'Update any user', description: 'Update any user' })
  async update(@Body() dto: UpdateUserDto): Promise<JsonResponse<UserApi>> {
    const data = await this.userService.updateUser(dto);
    return new JsonResponse<UserApi>({ data });
  }

  @Delete(Routes.User.Delete)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  @ApiOperation({ summary: 'delete user', description: 'delete user' })
  async delete(@Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    const data = await this.userService.deleteUser(id);
    return new JsonResponse<UserApi>({ data });
  }
}
