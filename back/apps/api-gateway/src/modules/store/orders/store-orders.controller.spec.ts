import { Test, TestingModule } from '@nestjs/testing';
import { StoreOrdersController } from './store-orders.controller';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('StoreOrdersController', () => {
  let controller: StoreOrdersController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreOrdersController],
      providers: [{ provide: 'ORDERS_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<StoreOrdersController>(StoreOrdersController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should send "findCustomerOrders" with userId and pagination', () => {
      controller.findAll(1, 1, 10, '');
      expect(mockClient.send).toHaveBeenCalledWith('findCustomerOrders', {
        userId: 1,
        page: 1,
        perPage: 10,
        search: '',
      });
    });
  });

  describe('find', () => {
    it('should send "findOrder" with id', async () => {
      await controller.find(1);
      expect(mockClient.send).toHaveBeenCalledWith('findOrder', { id: 1 });
    });
  });

  describe('create', () => {
    it('should send "createCustomerOrder" with userId and dto', () => {
      const dto = { items: [], paymentMethod: 'PIX' } as any;
      controller.create(1, dto);
      expect(mockClient.send).toHaveBeenCalledWith('createCustomerOrder', { userId: 1, dto });
    });
  });
});
