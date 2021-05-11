import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { Express } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function createApp(
  expressApp: Express,
): Promise<INestApplication> {

  const app = await NestFactory.create(AppModule,  new ExpressAdapter(expressApp));

  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Datavia Infrastructure Manager')
  .setDescription('Datavia Infrastructure Manager API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
  });

  return app;
}