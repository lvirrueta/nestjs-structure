import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
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

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.verbose(`Running in port: ${port}`);
}
bootstrap();

const swaggerOptions = new DocumentBuilder()
  .setTitle('Basic Structure NestJs')
  .setDescription('Basic Structure')
  .setVersion('0.0.1')
  .addBearerAuth()
  .addSecurityRequirements('bearer')
  .build();
