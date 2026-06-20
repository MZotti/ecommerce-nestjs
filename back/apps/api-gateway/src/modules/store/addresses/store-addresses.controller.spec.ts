import { Test, TestingModule } from '@nestjs/testing';
import { StoreAddressesController } from './store-addresses.controller';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('StoreAddressesController', () => {
  let controller: StoreAddressesController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreAddressesController],
      providers: [{ provide: 'AUTH_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<StoreAddressesController>(StoreAddressesController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('authAddresses', () => {
    it('should send "getAddresses" with user from request', async () => {
      const user = { id: 1 };
      await controller.authAddresses({ user });
      expect(mockClient.send).toHaveBeenCalledWith('getAddresses', user);
    });
  });

  describe('create', () => {
    it('should send "createAddress" with userId and dto', () => {
      const dto = { street: 'Rua A', city: 'São Paulo', state: 'SP', zipCode: '01000-000' } as any;
      controller.create(1, dto);
      expect(mockClient.send).toHaveBeenCalledWith('createAddress', { userId: 1, dto });
    });
  });
});
