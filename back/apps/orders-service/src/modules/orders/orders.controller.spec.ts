import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrdersService = {
    findAll: jest.fn(),
    findCustomerOrders: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    cancelOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: mockOrdersService }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call ordersService.findAll with payload', async () => {
      const payload = { query: { page: 1, perPage: 10 } };
      mockOrdersService.findAll.mockResolvedValue({ data: [], meta: {} });
      await controller.findAll(payload);
      expect(service.findAll).toHaveBeenCalledWith(payload);
    });
  });

  describe('findCustomerOrders', () => {
    it('should call ordersService.findCustomerOrders with payload', async () => {
      const payload = { userId: 1, page: 1, perPage: 10 };
      mockOrdersService.findCustomerOrders.mockResolvedValue({ data: [], meta: {} });
      await controller.findCustomerOrders(payload);
      expect(service.findCustomerOrders).toHaveBeenCalledWith(payload);
    });
  });

  describe('find', () => {
    it('should call ordersService.find with numeric id', async () => {
      mockOrdersService.find.mockResolvedValue({ id: 1 });
      await controller.find({ id: 1 });
      expect(service.find).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should call ordersService.create with dto', async () => {
      const dto = { userId: 1, items: [], paymentMethod: 'PIX' } as any;
      mockOrdersService.create.mockResolvedValue({ id: 1 });
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('createCustomerOrder', () => {
    it('should merge userId into dto and call ordersService.create', async () => {
      const dto = { items: [], paymentMethod: 'PIX' } as any;
      mockOrdersService.create.mockResolvedValue({ id: 1 });
      await controller.createCustomerOrder({ userId: 1, dto });
      expect(service.create).toHaveBeenCalledWith({ userId: 1, ...dto });
    });
  });

  describe('cancelOrder', () => {
    it('should call ordersService.cancelOrder with numeric id', async () => {
      mockOrdersService.cancelOrder.mockResolvedValue({ id: 5, status: 'CANCELED' });
      await controller.cancelOrder({ id: 5 });
      expect(service.cancelOrder).toHaveBeenCalledWith(5);
    });
  });
});
