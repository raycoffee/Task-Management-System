import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);

 app.enableCors({
  origin: ['http://localhost:3000', 'https://rayjuno.online'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
 });
 
 app.useGlobalPipes(new ValidationPipe({
   whitelist: true 
 }));
 app.useGlobalInterceptors(new LoggingInterceptor());


 const config = new DocumentBuilder()
   .setTitle('Task Management API')
   .setDescription('The Task Management API description')
   .setVersion('1.0')
   .addBearerAuth()
   .build();
   
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);

 await app.listen(process.env.PORT ?? 3001);
}
bootstrap();