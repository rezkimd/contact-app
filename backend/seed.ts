import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ContactsSeederService } from './src/contacts/contacts.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(ContactsSeederService);
  await seeder.seed();
  await app.close();
}

bootstrap();
