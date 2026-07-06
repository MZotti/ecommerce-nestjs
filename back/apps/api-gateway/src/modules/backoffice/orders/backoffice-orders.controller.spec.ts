import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeOrdersController } from './backoffice-orders.controller';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('BackofficeOrdersController', () => {
  let controller: BackofficeOrdersController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeOrdersController],
      providers: [{ provide: 'ORDERS_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<BackofficeOrdersController>(BackofficeOrdersController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should send "findAllOrders" with page and perPage as numbers', () => {
      controller.findAll({ page: 1, perPage: 30 });
      expect(mockClient.send).toHaveBeenCalledWith('findAllOrders', { page: 1, perPage: 10 });
    });
  });

  describe('find', () => {
    it('should send "findOrder" with id', async () => {
      await controller.find(1);
      expect(mockClient.send).toHaveBeenCalledWith('findOrder', { id: 1 });
    });
  });

  describe('create', () => {
    it('should send "createOrder" with dto', async () => {
      const dto = { userId: 1, items: [], paymentMethod: 'PIX' } as any;
      await controller.create(dto);
      expect(mockClient.send).toHaveBeenCalledWith('createOrder', dto);
    });
  });

  describe('cancelOrder', () => {
    it('should send "cancelOrder" with id', async () => {
      await controller.cancelOrder(1);
      expect(mockClient.send).toHaveBeenCalledWith('cancelOrder', { id: 1 });
    });
  });

  describe('findCustomerOrders', () => {
    it('should send "findCustomerOrders" with userId and pagination', () => {
      controller.findCustomerOrders(1, 1, 10, '');
      expect(mockClient.send).toHaveBeenCalledWith('findCustomerOrders', {
        userId: 1,
        page: 1,
        perPage: 10,
        search: '',
      });
    });
  });
});
