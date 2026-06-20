import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardsService } from './payment-cards.service';
import { PaymentCardsRepository } from './payment-cards.repository';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';

describe('PaymentCardsService', () => {
  let service: PaymentCardsService;

  const mockPaymentCardsRepository = {
    findByUserId: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    findByIdAndUserId: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentCardsService,
        { provide: PaymentCardsRepository, useValue: mockPaymentCardsRepository },
      ],
    }).compile();

    service = module.get<PaymentCardsService>(PaymentCardsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all cards for a user', async () => {
      mockPaymentCardsRepository.findByUserId.mockResolvedValue([{ id: 1 }]);
      const result = await service.findAll({ userId: 1 });
      expect(mockPaymentCardsRepository.findByUserId).toHaveBeenCalledWith(1);
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('create', () => {
    it('should create a payment card storing only the last 4 digits', async () => {
      const dto = { brand: 'VISA', cardNumber: '1234567890123456', type: 'CREDIT', holderName: 'John', expiresMonth: 12, expiresYear: 2026 } as any;
      mockPaymentCardsRepository.create.mockResolvedValue({ id: 1 });
      await service.create({ userId: 1, dto });
      expect(mockPaymentCardsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ last4: '3456', userId: 1, isDefault: false }),
      );
    });
  });

  describe('update', () => {
    it('should update an existing payment card', async () => {
      const dto = { holderName: 'Jane' } as any;
      mockPaymentCardsRepository.findById.mockResolvedValue({ id: 1 });
      mockPaymentCardsRepository.update.mockResolvedValue({ id: 1, holderName: 'Jane' });
      const result = await service.update(1, dto);
      expect(result.holderName).toBe('Jane');
    });

    it('should throw 404 when card is not found', async () => {
      mockPaymentCardsRepository.findById.mockResolvedValue(null);
      await expect(service.update(999, {} as any)).rejects.toThrow(AppRpcException);
    });
  });

  describe('delete', () => {
    it('should delete a payment card belonging to the user', async () => {
      mockPaymentCardsRepository.findByIdAndUserId.mockResolvedValue({ id: 1 });
      mockPaymentCardsRepository.delete.mockResolvedValue({ id: 1 });
      await service.delete({ userId: 1, cardId: 1 });
      expect(mockPaymentCardsRepository.delete).toHaveBeenCalledWith(1, 1);
    });

    it('should throw 404 when card does not belong to user', async () => {
      mockPaymentCardsRepository.findByIdAndUserId.mockResolvedValue(null);
      await expect(service.delete({ userId: 1, cardId: 999 })).rejects.toThrow(AppRpcException);
    });
  });
});
