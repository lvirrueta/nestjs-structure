import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AuthModule, SharedModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
