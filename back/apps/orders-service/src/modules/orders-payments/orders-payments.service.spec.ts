import { Test, TestingModule } from '@nestjs/testing';
import { OrdersPaymentsService } from './orders-payments.service';
import { OrdersPaymentsRepository } from './orders-payments.repository';

describe('OrdersPaymentsService', () => {
  let service: OrdersPaymentsService;

  const mockOrdersPaymentsRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersPaymentsService,
        { provide: OrdersPaymentsRepository, useValue: mockOrdersPaymentsRepository },
      ],
    }).compile();

    service = module.get<OrdersPaymentsService>(OrdersPaymentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order payment with a card token', async () => {
      const data = {
        orderId: 1,
        cardBrand: 'VISA',
        cardNumber: '1234567890123456',
        holderName: 'John Doe',
        expiresMonth: 12,
        expiresYear: 2026,
      };
      mockOrdersPaymentsRepository.create.mockResolvedValue({ id: 1, orderId: 1 });

      const result = await service.create(data);

      expect(mockOrdersPaymentsRepository.create).toHaveBeenCalledWith({
        orderId: 1,
        cardToken: 'token_123',
        cardBrand: 'VISA',
        cardLast4: '1234567890123456',
        cardHolderName: 'John Doe',
        cardExpiresMonth: 12,
        cardExpiresYear: 2026,
      });
      expect(result).toEqual({ id: 1, orderId: 1 });
    });
  });
});
