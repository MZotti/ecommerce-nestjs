import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersPaymentsService } from '../orders-payments/orders-payments.service';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';
import { OrderStatusEnum } from '@app/common/enums/order-status.enum';
import { of } from 'rxjs';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockOrdersRepository = {
    findMany: jest.fn(),
    count: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findOrderItems: jest.fn(),
  };

  const mockOrdersPaymentsService = {
    create: jest.fn(),
  };

  const mockProductsClient = {
    send: jest.fn(),
  };

  const mockEventBus = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrdersRepository, useValue: mockOrdersRepository },
        { provide: OrdersPaymentsService, useValue: mockOrdersPaymentsService },
        { provide: 'PRODUCTS_SERVICE', useValue: mockProductsClient },
        { provide: 'EVENT_BUS', useValue: mockEventBus },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated orders', async () => {
      mockOrdersRepository.findMany.mockResolvedValue([{ id: 1 }]);
      mockOrdersRepository.count.mockResolvedValue(1);
      const result = await service.findAll({ page: 1, perPage: 10 });
      expect(result.data).toEqual([{ id: 1 }]);
      expect(result.meta.total).toBe(1);
      expect(result.meta.lastPage).toBe(1);
    });

    it('should calculate skip based on page and perPage', async () => {
      mockOrdersRepository.findMany.mockResolvedValue([]);
      mockOrdersRepository.count.mockResolvedValue(0);
      await service.findAll({ page: 3, perPage: 10 });
      expect(mockOrdersRepository.findMany).toHaveBeenCalledWith({ skip: 20, take: 10 });
    });
  });

  describe('findCustomerOrders', () => {
    it('should return paginated orders filtered by userId', async () => {
      mockOrdersRepository.findMany.mockResolvedValue([{ id: 1, userId: 1 }]);
      mockOrdersRepository.count.mockResolvedValue(1);
      const result = await service.findCustomerOrders({ userId: 1, page: 1, perPage: 10 });
      expect(result.data).toEqual([{ id: 1, userId: 1 }]);
    });
  });

  describe('find', () => {
    it('should return an order when it exists', async () => {
      mockOrdersRepository.findById.mockResolvedValue({ id: 1 });
      const result = await service.find(1);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw AppRpcException 404 when order is not found', async () => {
      mockOrdersRepository.findById.mockResolvedValue(null);
      await expect(service.find(999)).rejects.toThrow(AppRpcException);
    });
  });

  describe('create', () => {
    const products = [{ id: 1, name: 'Product', price: 50, imageUrl: 'url.jpg', stock: 10 }];
    const dto = {
      userId: 1,
      paymentMethod: 'PIX',
      items: [{ productId: 1, quantity: 2 }],
      shippingCity: 'City',
      shippingCountry: 'BR',
      shippingNeighborhood: 'Neighborhood',
      shippingNumber: '123',
      shippingState: 'SP',
      shippingStreet: 'Street',
      shippingZipCode: '01000-000',
      shippingComplement: '',
    } as any;

    it('should create an order and emit orderCreated event', async () => {
      mockProductsClient.send.mockReturnValueOnce(of(products)).mockReturnValueOnce(of(true));
      mockOrdersRepository.create.mockResolvedValue({ id: 1, total: 100, status: OrderStatusEnum.PENDING });
      const result = await service.create(dto);
      expect(result.id).toBe(1);
      expect(mockEventBus.emit).toHaveBeenCalledWith('orderCreated', expect.any(Object));
    });

    it('should throw 404 when a product is not found', async () => {
      mockProductsClient.send.mockReturnValue(of([]));
      await expect(service.create(dto)).rejects.toThrow(AppRpcException);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel a pending order and emit orderCanceled event', async () => {
      const order = { id: 1, status: OrderStatusEnum.PENDING };
      mockOrdersRepository.findById.mockResolvedValue(order);
      mockOrdersRepository.findOrderItems.mockResolvedValue([{ productId: 1, quantity: 1 }]);
      mockOrdersRepository.update.mockResolvedValue({ ...order, status: OrderStatusEnum.CANCELED });
      const result = await service.cancelOrder(1);
      expect(result.status).toBe(OrderStatusEnum.CANCELED);
      expect(mockEventBus.emit).toHaveBeenCalledWith('orderCanceled', expect.any(Object));
    });

    it('should throw 404 when order is not found', async () => {
      mockOrdersRepository.findById.mockResolvedValue(null);
      await expect(service.cancelOrder(999)).rejects.toThrow(AppRpcException);
    });

    it('should throw 403 when order is already finished', async () => {
      mockOrdersRepository.findById.mockResolvedValue({ id: 1, status: OrderStatusEnum.FINISHED });
      await expect(service.cancelOrder(1)).rejects.toThrow(AppRpcException);
    });

    it('should throw 403 when order is already canceled', async () => {
      mockOrdersRepository.findById.mockResolvedValue({ id: 1, status: OrderStatusEnum.CANCELED });
      await expect(service.cancelOrder(1)).rejects.toThrow(AppRpcException);
    });
  });
});
