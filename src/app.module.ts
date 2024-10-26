// Dependencies
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

// Modules
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SettingsModule } from './settings/settings.module';

// Guards
import { RolesGuard } from '@auth/app/guards/roles.guard';
import { JwtAuthGuard } from '@auth/app/guards/jwt.auth.guard';

// Filter
import { HttpExceptionFilter } from '@shared/app/exception/http-exception.filter';

@Module({
  imports: [AuthModule, SharedModule, SettingsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
