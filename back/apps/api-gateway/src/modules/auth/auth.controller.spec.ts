import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from '../../common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('AuthController', () => {
  let controller: AuthController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: 'AUTH_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should send "register" message with dto', async () => {
      const dto = { name: 'John', email: 'john@test.com', password: '123', roleId: 1 } as any;
      await controller.register(dto);
      expect(mockClient.send).toHaveBeenCalledWith('register', dto);
    });
  });

  describe('registerCustomer', () => {
    it('should send "registerCustomer" message with dto', async () => {
      const dto = { name: 'Jane', email: 'jane@test.com', document: '12345', phone: '999', password: '123' } as any;
      await controller.registerCustomer(dto);
      expect(mockClient.send).toHaveBeenCalledWith('registerCustomer', dto);
    });
  });

  describe('login', () => {
    it('should send "login" message with dto', async () => {
      const dto = { email: 'john@test.com', password: '123' } as any;
      await controller.login(dto);
      expect(mockClient.send).toHaveBeenCalledWith('login', dto);
    });
  });

  describe('me', () => {
    it('should send "me" message with user from request', async () => {
      const user = { id: 1, email: 'john@test.com' };
      await controller.me({ user });
      expect(mockClient.send).toHaveBeenCalledWith('me', { user });
    });
  });
});
