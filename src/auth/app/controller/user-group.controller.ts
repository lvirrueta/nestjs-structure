// Dependencies
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';

// Service
import { UserGroupService } from '@auth/domain/service/user-group.service';

// Dto
import { CreateUserGroupDto } from '../dto/create-user-group.dto';
import { UpdateUserGroupDto } from '../dto/update-user-group.dto';

// Api Model
import { UserGroupApi } from '../swagger/user-group-api';

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

@ApiExtraModels(UserGroupApi)
@ApiTags(Routes.UserGroup.ApiTags)
@Controller(Routes.UserGroup.Controller)
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Get(Routes.UserGroup.List)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserGroupApi] })
  @ApiOperation({ summary: 'View all users groups registered in the application', description: 'all users groups registered in the app' })
  async getAll(): Promise<JsonResponse<UserGroupApi[]>> {
    const data = await this.userGroupService.getUserGroups();
    return new JsonResponse<UserGroupApi[]>({ data });
  }

  @Get(Routes.UserGroup.Detail)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserGroupApi })
  @ApiOperation({ summary: 'get the detail of the user group', description: 'get the detail of the user group' })
  async detail(@Param('id') id: UUID): Promise<JsonResponse<UserGroupApi>> {
    const data = await this.userGroupService.detailUserGroup(id);
    return new JsonResponse<UserGroupApi>({ data });
  }

  @Post(Routes.UserGroup.Create)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserGroupApi })
  @ApiOperation({ summary: 'Create any user group', description: 'Create any user group' })
  async create(@Body() dto: CreateUserGroupDto): Promise<JsonResponse<UserGroupApi>> {
    const data = await this.userGroupService.createUserGroup(dto);
    return new JsonResponse<UserGroupApi>({ data });
  }

  @Put(Routes.UserGroup.Update)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserGroupApi })
  @ApiOperation({ summary: 'Update any user group', description: 'Update any user group' })
  async update(@Body() dto: UpdateUserGroupDto): Promise<JsonResponse<UserGroupApi>> {
    const data = await this.userGroupService.updateUserGroup(dto);
    return new JsonResponse<UserGroupApi>({ data });
  }

  @Delete(Routes.UserGroup.Delete)
  @Roles([UserTypeEnum.ADMIN])
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserGroupApi })
  @ApiOperation({ summary: 'delete user group', description: 'delete user group' })
  async delete(@Param('id') id: UUID): Promise<JsonResponse<UserGroupApi>> {
    const data = await this.userGroupService.deleteUserGroup(id);
    return new JsonResponse<UserGroupApi>({ data });
  }
}
