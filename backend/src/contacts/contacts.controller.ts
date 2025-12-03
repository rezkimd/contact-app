import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

interface Contact {
  id: string;
  [key: string]: unknown;
}

@Controller('contacts')
export class ContactsController {
  // temporary in-memory store because `ContactsService` is empty in this project
  private contacts: Contact[] = [];

  @Post()
  create(@Body() createContactDto: Partial<Contact>) {
    const id = Date.now().toString();
    const contact: Contact = {
      id,
      ...(createContactDto as Record<string, unknown>),
    };
    this.contacts.push(contact);
    return contact;
  }

  @Get()
  findAll() {
    return this.contacts;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const contact = this.contacts.find((c) => c.id === id);
    if (!contact)
      throw new NotFoundException(`Contact with id ${id} not found`);
    return contact;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: Partial<Contact>) {
    const idx = this.contacts.findIndex((c) => c.id === id);
    if (idx === -1)
      throw new NotFoundException(`Contact with id ${id} not found`);
    this.contacts[idx] = {
      ...this.contacts[idx],
      ...(updateContactDto as Record<string, unknown>),
    };
    return this.contacts[idx];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const idx = this.contacts.findIndex((c) => c.id === id);
    if (idx === -1)
      throw new NotFoundException(`Contact with id ${id} not found`);
    const [removed] = this.contacts.splice(idx, 1);
    return removed;
  }
}
