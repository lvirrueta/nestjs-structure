// Dependencies
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

// Modules
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SettingsModule } from './settings/settings.module';

// Guards
import { JwtAuthGuard } from '@auth/app/guards/jwt.auth.guard';
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
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
