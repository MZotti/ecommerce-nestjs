import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    registerCustomer: jest.fn(),
    login: jest.fn(),
    me: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should delegate to authService.register', async () => {
      const dto = { name: 'John', email: 'john@example.com', password: '123456', roleId: 1 };
      mockAuthService.register.mockResolvedValue({ id: 1, email: 'john@example.com' });
      await controller.register(dto);
      expect(service.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('registerCustomer', () => {
    it('should delegate to authService.registerCustomer', async () => {
      const dto = { name: 'Jane', email: 'jane@example.com', document: '12345', phone: '999', password: '123456' };
      mockAuthService.registerCustomer.mockResolvedValue({ id: 2 });
      await controller.registerCustomer(dto);
      expect(service.registerCustomer).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should delegate to authService.login', async () => {
      const dto = { email: 'john@example.com', password: '123456' };
      mockAuthService.login.mockResolvedValue({ user: {}, access_token: 'token' });
      await controller.login(dto);
      expect(service.login).toHaveBeenCalledWith(dto);
    });
  });

  describe('me', () => {
    it('should delegate to authService.me with the user from payload', async () => {
      const user = { id: 1, email: 'john@example.com' } as any;
      mockAuthService.me.mockResolvedValue(user);
      await controller.me({ user });
      expect(service.me).toHaveBeenCalledWith(user);
    });
  });
});
