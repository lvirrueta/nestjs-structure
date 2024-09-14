// Dependencies
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// Modules
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SettingsModule } from './settings/settings.module';

// Guards
import { JwtAuthGuard } from '@auth/app/guards/jwt.auth.guard';

@Module({
  imports: [AuthModule, SharedModule, SettingsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
