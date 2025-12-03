import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  // Add global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);

  logger.log(`✅ Application is running on: http://localhost:${port}`);
  logger.log(
    `📡 Database URI: ${process.env.MONGO_URI || 'mongodb://localhost:27017/contact-app'}`,
  );
  logger.log('🚀 Server started successfully!');
}
void bootstrap();
