import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardsController } from './payment-cards.controller';
import { PaymentCardsService } from './payment-cards.service';

describe('PaymentCardsController', () => {
  let controller: PaymentCardsController;
  let service: PaymentCardsService;

  const mockPaymentCardsService = {
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentCardsController],
      providers: [{ provide: PaymentCardsService, useValue: mockPaymentCardsService }],
    }).compile();

    controller = module.get<PaymentCardsController>(PaymentCardsController);
    service = module.get<PaymentCardsService>(PaymentCardsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call paymentCardsService.findAll with userId payload', async () => {
      mockPaymentCardsService.findAll.mockResolvedValue([]);
      await controller.findAll({ userId: 1 });
      expect(service.findAll).toHaveBeenCalledWith({ userId: 1 });
    });
  });

  describe('create', () => {
    it('should call paymentCardsService.create with userId and dto payload', async () => {
      const dto = { brand: 'VISA', cardNumber: '1234', type: 'CREDIT', holderName: 'John', expiresMonth: 12, expiresYear: 2026 } as any;
      mockPaymentCardsService.create.mockResolvedValue({ id: 1 });
      await controller.create({ userId: 1, dto });
      expect(service.create).toHaveBeenCalledWith({ userId: 1, dto });
    });
  });

  describe('delete', () => {
    it('should call paymentCardsService.delete with numeric userId and cardId', async () => {
      mockPaymentCardsService.delete.mockResolvedValue({ id: 1 });
      await controller.delete({ userId: '1', cardId: 5 });
      expect(service.delete).toHaveBeenCalledWith({ userId: 1, cardId: 5 });
    });
  });
});
