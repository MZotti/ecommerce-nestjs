import { Test, TestingModule } from '@nestjs/testing';
import { StoreProductsController } from './store-products.controller';
import { of } from 'rxjs';

describe('StoreProductsController', () => {
  let controller: StoreProductsController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreProductsController],
      providers: [{ provide: 'PRODUCTS_SERVICE', useValue: mockClient }],
    }).compile();

    controller = module.get<StoreProductsController>(StoreProductsController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should send "findAllStoreProducts" with pagination, search and filters', () => {
      controller.findAll(1, 10, 'shirt', 'clothing');
      expect(mockClient.send).toHaveBeenCalledWith('findAllStoreProducts', {
        page: 1,
        perPage: 10,
        search: 'shirt',
        filters: 'clothing',
      });
    });
  });

  describe('find', () => {
    it('should send "findBySlug" with the product slug', async () => {
      await controller.find('product-slug');
      expect(mockClient.send).toHaveBeenCalledWith('findBySlug', { slug: 'product-slug' });
    });
  });
});
