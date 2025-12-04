import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto';
import { getModelToken } from '@nestjs/mongoose';
import { ContactDocument } from './schemas/contact.schema';

describe('ContactsService', () => {
  let service: ContactsService;

  class MockContactModel {
    constructor(private dto: Partial<ContactDocument>) {}

    save = jest.fn().mockImplementation(() =>
      Promise.resolve({
        _id: '1',
        ...this.dto,
      }),
    );
    static find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([
        {
          _id: '1',
          name: 'John',
          phone: '123',
        },
      ]),
    });
    static findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        _id: '1',
        name: 'John',
        phone: '123',
      }),
    });
    static findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        _id: '1',
        name: 'Jane',
        phone: '123',
      }),
    });
    static findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        _id: '1',
        name: 'John',
        phone: '123',
      }),
    });
    static findOneAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({
        _id: '1',
        name: 'John',
        phone: '123',
      }),
    });
  }

  // const MockContactModel = {
  //   create: jest.fn(),
  //   find: jest.fn(),
  //   findById: jest.fn(),
  //   findByIdAndUpdate: jest.fn(),
  //   findByIdAndDelete: jest.fn(),
  //   findOneAndDelete: jest.fn(),
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getModelToken('Contact'),
          useValue: MockContactModel,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create', () => {
  //   it('should create a contact', async () => {
  //     const dto: CreateContactDto = { name: 'John', phone: '123' };
  //     MockContactModel.create.mockResolvedValue(dto);
  //     expect(await service.create(dto)).toEqual(dto);
  //     expect(MockContactModel.create).toHaveBeenCalledWith(dto);
  //   });
  // });

  describe('create', () => {
    it('should create a contact', async () => {
      const dto: CreateContactDto = { name: 'John', phone: '123' };
      const result = await service.create(dto);
      expect(result).toHaveProperty('_id', '1');
      expect(result).toHaveProperty('name', 'John');
      expect(result).toHaveProperty('phone', '123');
    });
  });

  describe('findAll', () => {
    it('should return all contacts', async () => {
      const contacts = [{ id: '1', name: 'John', phone: '123' }];
      MockContactModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(contacts),
      });
      expect(await service.findAll()).toEqual(contacts);
    });
  });

  describe('findOne', () => {
    it('should return a contact by id', async () => {
      const contact = { id: '1', name: 'John', phone: '123' };
      MockContactModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(contact),
      });
      expect(await service.findOne('1')).toEqual(contact);
    });
  });

  describe('update', () => {
    it('should update a contact', async () => {
      const updateDto: UpdateContactDto = { name: 'Jane' };
      const updated = { id: '1', name: 'Jane', phone: '123' };
      MockContactModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updated),
      });
      expect(await service.update('1', updateDto)).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('should remove a contact', async () => {
      const deleted = { id: '1', name: 'John', phone: '123' };
      MockContactModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(deleted),
      });
      expect(await service.remove('1')).toEqual(deleted);
    });
  });

  describe('removeByPhone', () => {
    it('should remove a contact by phone', async () => {
      const deleted = { id: '1', name: 'John', phone: '123' };
      MockContactModel.findOneAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(deleted),
      });
      expect(await service.removeByPhone('123')).toEqual(deleted);
    });
  });
});
