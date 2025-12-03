import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactsSeederService {
  private logger = new Logger('ContactsSeeder');

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async seed(): Promise<void> {
    const count = await this.contactModel.countDocuments().exec();

    if (count > 0) {
      this.logger.log('Database already seeded, skipping...');
      return;
    }

    const dummyContacts = [
      {
        name: 'Rezki Muhammad',
        email: 'rezki@example.com',
        phone: '+6281234567890',
      },
      {
        name: 'Siti Nurhaliza',
        email: 'siti@example.com',
        phone: '+6289876543210',
      },
      {
        name: 'Budi Santoso',
        email: 'budi@example.com',
        phone: '+6285555555555',
      },
      {
        name: 'Ani Wijaya',
        email: 'ani@example.com',
        phone: '+6287777777777',
      },
      {
        name: 'Doni Hermawan',
        email: 'doni@example.com',
        phone: '+6282222222222',
      },
    ];

    try {
      const created = await this.contactModel.insertMany(dummyContacts);
      this.logger.log(`✅ Successfully seeded ${created.length} contacts`);
    } catch (error) {
      this.logger.error('Failed to seed database', error);
    }
  }
}
