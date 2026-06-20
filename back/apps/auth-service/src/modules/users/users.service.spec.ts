import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findMany: jest.fn(),
    count: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      mockUsersRepository.findMany.mockResolvedValue([{ id: 1 }]);
      mockUsersRepository.count.mockResolvedValue(1);
      const result = await service.findAll({ page: 1, perPage: 10 });
      expect(result.data).toEqual([{ id: 1 }]);
      expect(result.meta.total).toBe(1);
    });
  });

  describe('find', () => {
    it('should return a user when it exists', async () => {
      mockUsersRepository.findById.mockResolvedValue({ id: 1 });
      const result = await service.find(1);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw AppRpcException 404 when user is not found', async () => {
      mockUsersRepository.findById.mockResolvedValue(null);
      await expect(service.find(999)).rejects.toThrow(AppRpcException);
    });
  });

  describe('create', () => {
    const dto = { name: 'John', email: 'john@test.com', roleId: 1 } as any;

    it('should create a user with a hashed random password', async () => {
      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.create.mockResolvedValue({ id: 1, name: 'John' });
      await service.create(dto);
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(mockUsersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'John', email: 'john@test.com', roleId: 1 }),
      );
    });

    it('should throw 409 when email is already in use', async () => {
      mockUsersRepository.findByEmail.mockResolvedValue({ id: 1 });
      await expect(service.create(dto)).rejects.toThrow(AppRpcException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto = { name: 'Updated' } as any;
      mockUsersRepository.findById.mockResolvedValue({ id: 1 });
      mockUsersRepository.update.mockResolvedValue({ id: 1, name: 'Updated' });
      const result = await service.update(1, dto);
      expect(result.name).toBe('Updated');
    });

    it('should throw 404 when user is not found', async () => {
      mockUsersRepository.findById.mockResolvedValue(null);
      await expect(service.update(999, {} as any)).rejects.toThrow(AppRpcException);
    });
  });

  describe('delete', () => {
    it('should delete a user and return its id', async () => {
      mockUsersRepository.findById.mockResolvedValue({ id: 1 });
      mockUsersRepository.delete.mockResolvedValue(undefined);
      const result = await service.delete(1);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw 404 when user to delete is not found', async () => {
      mockUsersRepository.findById.mockResolvedValue(null);
      await expect(service.delete(999)).rejects.toThrow(AppRpcException);
    });
  });
});
