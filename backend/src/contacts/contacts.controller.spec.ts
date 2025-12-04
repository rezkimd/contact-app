import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ContactsController', () => {
  let controller: ContactsController;

  const mockContactsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    removeByPhone: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [{ provide: ContactsService, useValue: mockContactsService }],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct dto', async () => {
      const dto: CreateContactDto = { name: 'John', phone: '123' };
      mockContactsService.create.mockResolvedValue(dto);
      expect(await controller.create(dto)).toEqual(dto);
      expect(mockContactsService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all contacts', async () => {
      const result = [{ id: '1', name: 'John', phone: '123' }];
      mockContactsService.findAll.mockResolvedValue(result);
      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return contact if found', async () => {
      const contact = { id: '1', name: 'John', phone: '123' };
      mockContactsService.findOne.mockResolvedValue(contact);
      expect(await controller.findOne('1')).toEqual(contact);
    });

    it('should throw 404 if contact not found', async () => {
      mockContactsService.findOne.mockResolvedValue(null);
      await expect(controller.findOne('999')).rejects.toThrow(
        new HttpException('Contact not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update contact if exists', async () => {
      const updateDto: UpdateContactDto = { name: 'Jane' };
      const updated = { id: '1', name: 'Jane', phone: '123' };
      mockContactsService.update.mockResolvedValue(updated);
      expect(await controller.update('1', updateDto)).toEqual(updated);
    });

    it('should throw 404 if contact to update not found', async () => {
      mockContactsService.update.mockResolvedValue(null);
      const updateDto: UpdateContactDto = { name: 'Jane' };
      await expect(controller.update('999', updateDto)).rejects.toThrow(
        new HttpException('Contact not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('remove', () => {
    it('should remove contact if exists', async () => {
      const deleted = { id: '1', name: 'John', phone: '123' };
      mockContactsService.remove.mockResolvedValue(deleted);
      expect(await controller.remove('1')).toEqual(deleted);
    });

    it('should throw 404 if contact to delete not found', async () => {
      mockContactsService.remove.mockResolvedValue(null);
      await expect(controller.remove('999')).rejects.toThrow(
        new HttpException('Contact not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('removeByPhone', () => {
    it('should remove contact by phone if exists', async () => {
      const deleted = { id: '1', name: 'John', phone: '123' };
      mockContactsService.removeByPhone.mockResolvedValue(deleted);
      expect(await controller.removeByPhone('123')).toEqual(deleted);
    });

    it('should throw 404 if contact by phone not found', async () => {
      mockContactsService.removeByPhone.mockResolvedValue(null);
      await expect(controller.removeByPhone('999')).rejects.toThrow(
        new HttpException(
          'Contact with phone 999 not found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
