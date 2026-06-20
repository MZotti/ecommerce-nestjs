import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeProductsController } from './backoffice-products.controller';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('BackofficeProductsController', () => {
  let controller: BackofficeProductsController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeProductsController],
      providers: [{ provide: 'PRODUCTS_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<BackofficeProductsController>(BackofficeProductsController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should send "findAllProducts" with pagination and search', () => {
      controller.findAll(1, 10, '');
      expect(mockClient.send).toHaveBeenCalledWith('findAllProducts', { page: 1, perPage: 10, search: '' });
    });
  });

  describe('findManyByName', () => {
    it('should send "findManyByName" with search term', () => {
      controller.findManyByName('shirt');
      expect(mockClient.send).toHaveBeenCalledWith('findManyByName', { search: 'shirt' });
    });
  });

  describe('find', () => {
    it('should send "findProduct" with id', async () => {
      await controller.find(1);
      expect(mockClient.send).toHaveBeenCalledWith('findProduct', { id: 1 });
    });
  });

  describe('create', () => {
    it('should send "createProduct" with dto', () => {
      const dto = { name: 'Product', categoryId: 1, price: 100, stock: 10, description: 'Desc' } as any;
      controller.create(dto);
      expect(mockClient.send).toHaveBeenCalledWith('createProduct', dto);
    });
  });

  describe('update', () => {
    it('should send "updateProduct" with id and data', async () => {
      const dto = { name: 'Updated' } as any;
      await controller.update(1, dto);
      expect(mockClient.send).toHaveBeenCalledWith('updateProduct', { id: 1, data: dto });
    });
  });

  describe('delete', () => {
    it('should send "deleteProduct" with id', async () => {
      await controller.delete(1);
      expect(mockClient.send).toHaveBeenCalledWith('deleteProduct', { id: 1 });
    });
  });

  describe('increaseStock', () => {
    it('should send "increaseProductStock" with productId and quantity', async () => {
      await controller.increaseStock(1, { quantity: 5 } as any);
      expect(mockClient.send).toHaveBeenCalledWith('increaseProductStock', { productId: 1, quantity: 5 });
    });
  });
});
