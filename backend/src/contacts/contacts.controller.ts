import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  async findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const contact = await this.contactsService.findOne(id);
    if (!contact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    return contact;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    const updatedContact = await this.contactsService.update(
      id,
      updateContactDto,
    );
    if (!updatedContact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    return updatedContact;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedContact = await this.contactsService.remove(id);
    if (!deletedContact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    return deletedContact;
  }

  @Delete('phone/:phone')
  async removeByPhone(@Param('phone') phone: string) {
    const deletedContact = await this.contactsService.removeByPhone(phone);
    if (!deletedContact) {
      throw new HttpException(
        `Contact with phone ${phone} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return deletedContact;
  }
}
