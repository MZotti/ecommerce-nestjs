import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@app/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    customer: {
      findFirst: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('jwt_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const dto = { name: 'John', email: 'john@test.com', password: 'pass123', roleId: 1 };

    it('should create a user and return it without password', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({ id: 1, name: 'John', email: 'john@test.com' });
      const result = await service.register(dto);
      expect(bcrypt.hash).toHaveBeenCalledWith('pass123', 10);
      expect(result.email).toBe('john@test.com');
    });

    it('should throw AppRpcException 409 if email is already in use', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });
      await expect(service.register(dto)).rejects.toThrow(AppRpcException);
    });
  });

  describe('registerCustomer', () => {
    const dto = { name: 'Jane', email: 'jane@test.com', document: '12345', phone: '999', password: 'pass123' };

    it('should create a user with customer profile', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.customer.findFirst.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({ id: 2, name: 'Jane', email: 'jane@test.com', customer: {} });
      const result = await service.registerCustomer(dto);
      expect(result.email).toBe('jane@test.com');
    });

    it('should throw 409 if email is already in use', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });
      await expect(service.registerCustomer(dto)).rejects.toThrow(AppRpcException);
    });

    it('should throw 409 if document is already in use', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.customer.findFirst.mockResolvedValue({ id: 1 });
      await expect(service.registerCustomer(dto)).rejects.toThrow(AppRpcException);
    });
  });

  describe('login', () => {
    const user = { id: 1, email: 'john@test.com', password: 'hashed_password' };

    it('should return user and access_token on valid credentials', async () => {
      mockPrisma.user.findUnique
        .mockResolvedValueOnce(user)
        .mockResolvedValueOnce({ id: 1, email: 'john@test.com' });
      const result = await service.login({ email: 'john@test.com', password: 'pass123' });
      expect(result.access_token).toBe('jwt_token');
      expect(result.user).toBeDefined();
    });

    it('should throw 401 if user is not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.login({ email: 'no@test.com', password: 'pass' })).rejects.toThrow(AppRpcException);
    });

    it('should throw 401 if password is invalid', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(service.login({ email: 'john@test.com', password: 'wrong' })).rejects.toThrow(AppRpcException);
    });
  });

  describe('me', () => {
    it('should return the user profile', async () => {
      const user = { id: 1 } as any;
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, name: 'John', email: 'john@test.com' });
      const result = await service.me(user);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 1 } }));
      expect(result).toBeDefined();
    });
  });
});
