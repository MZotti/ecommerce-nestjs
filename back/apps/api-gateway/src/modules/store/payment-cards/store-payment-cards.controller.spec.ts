import { Test, TestingModule } from '@nestjs/testing';
import { StorePaymentCardsController } from './store-payment-cards.controller';
import { JwtAuthGuard } from 'apps/api-gateway/src/common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('StorePaymentCardsController', () => {
  let controller: StorePaymentCardsController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorePaymentCardsController],
      providers: [{ provide: 'AUTH_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<StorePaymentCardsController>(StorePaymentCardsController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('authAddresses (findAll)', () => {
    it('should send "findAllPaymentCards" with user from request', async () => {
      const user = { id: 1 };
      await controller.authAddresses({ user });
      expect(mockClient.send).toHaveBeenCalledWith('findAllPaymentCards', user);
    });
  });

  describe('create', () => {
    it('should send "createPaymentCard" with userId and dto', () => {
      const dto = { brand: 'VISA', cardNumber: '1234', type: 'CREDIT', holderName: 'John', expiresMonth: 12, expiresYear: 2026 } as any;
      controller.create(1, dto);
      expect(mockClient.send).toHaveBeenCalledWith('createPaymentCard', { userId: 1, dto });
    });
  });

  describe('delete', () => {
    it('should send "deletePaymentCard" with userId and cardId', () => {
      controller.delete(1, 5);
      expect(mockClient.send).toHaveBeenCalledWith('deletePaymentCard', { userId: 1, cardId: 5 });
    });
  });
});
