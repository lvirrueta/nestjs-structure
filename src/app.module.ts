import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [AuthModule, SharedModule, SettingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
