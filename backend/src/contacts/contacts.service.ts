import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  private logger = new Logger('ContactsService');

  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<ContactDocument> {
    const createdContact = new this.contactModel(createContactDto);
    const result = await createdContact.save();
    this.logger.log(`Contact created: ${String(result._id)}`);
    return result;
  }

  async findAll(): Promise<ContactDocument[]> {
    const contacts = await this.contactModel.find().exec();
    this.logger.log(`Retrieved ${contacts.length} contacts`);
    return contacts;
  }

  async findOne(id: string): Promise<ContactDocument | null> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) {
      this.logger.warn(`Contact not found: ${id}`);
    }
    return contact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<ContactDocument | null> {
    const updatedContact = await this.contactModel
      .findByIdAndUpdate(id, updateContactDto, { new: true })
      .exec();
    if (updatedContact) {
      this.logger.log(`Contact updated: ${id}`);
    }
    return updatedContact;
  }

  async remove(id: string): Promise<ContactDocument | null> {
    const deletedContact = await this.contactModel.findByIdAndDelete(id).exec();
    if (deletedContact) {
      this.logger.log(`Contact deleted: ${id}`);
    }
    return deletedContact;
  }

  async removeByPhone(phone: string): Promise<ContactDocument | null> {
    const deletedContact = await this.contactModel
      .findOneAndDelete({ phone })
      .exec();
    if (deletedContact) {
      this.logger.log(`Contact deleted by phone: ${phone}`);
    }
    return deletedContact;
  }
}
