import { Module, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsSeederService } from './contacts/contacts.seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/contact-app',
      {
        connectionFactory: (connection: Connection) => {
          const logger = new Logger('MongooseConnection');
          if (connection.readyState === ConnectionStates.connected) {
            logger.log(
              `✅ MongoDB Connected successfully! Database: ${connection.name}`,
            );
          } else {
            logger.warn(`⚠️  Connection state: ${connection.readyState}`);
          }
          return connection;
        },
      },
    ),
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(ContactsSeederService) private seederService: ContactsSeederService,
  ) {}

  async onModuleInit() {
    const logger = new Logger('AppModule');
    logger.log('🌱 Running database seeder...');
    await this.seederService.seed();
  }
}
