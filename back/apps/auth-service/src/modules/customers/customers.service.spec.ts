import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './customers.repository';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('CustomersService', () => {
  let service: CustomersService;

  const mockCustomersRepository = {
    findMany: jest.fn(),
    count: jest.fn(),
    findById: jest.fn(),
    findUserByEmail: jest.fn(),
    findByDocument: jest.fn(),
    createUserWithCustomer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: CustomersRepository, useValue: mockCustomersRepository },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    jest.clearAllMocks();
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated customers', async () => {
      mockCustomersRepository.findMany.mockResolvedValue([{ id: 1 }]);
      mockCustomersRepository.count.mockResolvedValue(1);
      const result = await service.findAll({ page: 1, perPage: 10 });
      expect(result.data).toEqual([{ id: 1 }]);
      expect(result.meta.total).toBe(1);
    });
  });

  describe('find', () => {
    it('should return a customer when it exists', async () => {
      mockCustomersRepository.findById.mockResolvedValue({ id: 1 });
      const result = await service.find(1);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw AppRpcException 404 when customer is not found', async () => {
      mockCustomersRepository.findById.mockResolvedValue(null);
      await expect(service.find(999)).rejects.toThrow(AppRpcException);
    });
  });

  describe('create', () => {
    const dto = { name: 'Jane', email: 'jane@test.com', document: '12345', phone: '999' } as any;

    it('should create a customer successfully', async () => {
      mockCustomersRepository.findUserByEmail.mockResolvedValue(null);
      mockCustomersRepository.findByDocument.mockResolvedValue(null);
      mockCustomersRepository.createUserWithCustomer.mockResolvedValue({ id: 1 });
      const result = await service.create(dto);
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(result).toEqual({ id: 1 });
    });

    it('should throw 409 when email is already in use', async () => {
      mockCustomersRepository.findUserByEmail.mockResolvedValue({ id: 1 });
      await expect(service.create(dto)).rejects.toThrow(AppRpcException);
    });

    it('should throw 409 when document is already in use', async () => {
      mockCustomersRepository.findUserByEmail.mockResolvedValue(null);
      mockCustomersRepository.findByDocument.mockResolvedValue({ id: 1 });
      await expect(service.create(dto)).rejects.toThrow(AppRpcException);
    });
  });
});
