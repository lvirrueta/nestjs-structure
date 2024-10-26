import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      filter: true,
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();

const swaggerOptions = new DocumentBuilder()
  .setTitle('Basic Structure NestJs')
  .setDescription('Basic Structure')
  .setVersion('0.0.1')
  .addBearerAuth()
  .addSecurityRequirements('bearer')
  .build();
