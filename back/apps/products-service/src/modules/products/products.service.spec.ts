import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { AppRpcException } from '@app/common/errors/app-rpc.exception';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProductsRepository = {
    findMany: jest.fn(),
    count: jest.fn(),
    findById: jest.fn(),
    findBySlug: jest.fn(),
    findManyByIds: jest.fn(),
    findManyByName: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    updateStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: mockProductsRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated products', async () => {
      mockProductsRepository.findMany.mockResolvedValue([{ id: 1 }]);
      mockProductsRepository.count.mockResolvedValue(1);
      const result = await service.findAll({ page: 1, perPage: 10 });
      expect(result.data).toEqual([{ id: 1 }]);
      expect(result.meta.total).toBe(1);
    });
  });

  describe('find', () => {
    it('should return a product when it exists', async () => {
      mockProductsRepository.findById.mockResolvedValue({ id: 1, name: 'Product' });
      const result = await service.find(1);
      expect(result).toEqual({ id: 1, name: 'Product' });
    });

    it('should throw AppRpcException 404 when product is not found', async () => {
      mockProductsRepository.findById.mockResolvedValue(null);
      await expect(service.find(999)).rejects.toThrow(AppRpcException);
    });
  });

  describe('findBySlug', () => {
    it('should return a product by slug', async () => {
      mockProductsRepository.findBySlug.mockResolvedValue({ id: 1, slug: 'product-1' });
      const result = await service.findBySlug('product-1');
      expect(result.slug).toBe('product-1');
    });

    it('should throw 404 when product is not found by slug', async () => {
      mockProductsRepository.findBySlug.mockResolvedValue(null);
      await expect(service.findBySlug('nonexistent')).rejects.toThrow(AppRpcException);
    });
  });

  describe('findManyByName', () => {
    it('should return empty array when search is empty', async () => {
      const result = await service.findManyByName('');
      expect(result).toEqual([]);
      expect(mockProductsRepository.findManyByName).not.toHaveBeenCalled();
    });

    it('should return products matching the search term', async () => {
      mockProductsRepository.findManyByName.mockResolvedValue([{ id: 1, name: 'Product' }]);
      const result = await service.findManyByName('Product');
      expect(result).toEqual([{ id: 1, name: 'Product' }]);
    });
  });

  describe('create', () => {
    it('should create a product with a slugified name', async () => {
      const dto = { name: 'My Product', categoryId: 1, description: 'Desc', price: 100, stock: 10 } as any;
      mockProductsRepository.create.mockResolvedValue({ id: 1, slug: 'my-product' });
      await service.create(dto);
      expect(mockProductsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'My Product', slug: 'my-product' }),
      );
    });
  });

  describe('delete', () => {
    it('should delete a product and return its id', async () => {
      mockProductsRepository.findById.mockResolvedValue({ id: 1 });
      mockProductsRepository.delete.mockResolvedValue(undefined);
      const result = await service.delete(1);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw 404 when product to delete is not found', async () => {
      mockProductsRepository.findById.mockResolvedValue(null);
      await expect(service.delete(999)).rejects.toThrow(AppRpcException);
    });
  });

  describe('stockAvailable', () => {
    it('should return true when all items have sufficient stock', async () => {
      mockProductsRepository.findById.mockResolvedValue({ id: 1, name: 'Product', stock: 10 });
      const result = await service.stockAvailable([{ productId: 1, quantity: 5 }]);
      expect(result).toBe(true);
    });

    it('should throw 403 when stock is insufficient', async () => {
      mockProductsRepository.findById.mockResolvedValue({ id: 1, name: 'Product', stock: 2 });
      await expect(service.stockAvailable([{ productId: 1, quantity: 5 }])).rejects.toThrow(AppRpcException);
    });
  });

  describe('increaseStock', () => {
    it('should increase stock for each item', async () => {
      mockProductsRepository.findById.mockResolvedValue({ id: 1, stock: 5 });
      mockProductsRepository.updateStock.mockResolvedValue(undefined);
      await service.increaseStock([{ productId: 1, quantity: 3 }]);
      expect(mockProductsRepository.updateStock).toHaveBeenCalledWith(1, { increment: 3 });
    });
  });

  describe('decreaseStock', () => {
    it('should decrease stock for each item', async () => {
      mockProductsRepository.findById.mockResolvedValue({ id: 1, name: 'Product', stock: 10 });
      mockProductsRepository.updateStock.mockResolvedValue(undefined);
      await service.decreaseStock([{ productId: 1, quantity: 3 }]);
      expect(mockProductsRepository.updateStock).toHaveBeenCalledWith(1, { decrement: 3 });
    });

    it('should throw 403 when stock is insufficient to decrease', async () => {
      mockProductsRepository.findById.mockResolvedValue({ id: 1, name: 'Product', stock: 1 });
      await expect(service.decreaseStock([{ productId: 1, quantity: 5 }])).rejects.toThrow(AppRpcException);
    });
  });
});
