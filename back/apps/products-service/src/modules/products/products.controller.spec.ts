import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    findAll: jest.fn(),
    findAllStore: jest.fn(),
    findManyByIds: jest.fn(),
    findManyByName: jest.fn(),
    find: jest.fn(),
    findBySlug: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    stockAvailable: jest.fn(),
    increaseStock: jest.fn(),
    decreaseStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call productsService.findAll with payload', async () => {
      mockProductsService.findAll.mockResolvedValue({ data: [], meta: {} });
      await controller.findAll({ page: 1, perPage: 10 });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, perPage: 10 });
    });
  });

  describe('findAllStore', () => {
    it('should call productsService.findAllStore with payload', async () => {
      mockProductsService.findAllStore.mockResolvedValue({ data: [], meta: {} });
      await controller.findAllStore({ page: 1, perPage: 10 });
      expect(service.findAllStore).toHaveBeenCalledWith({ page: 1, perPage: 10 });
    });
  });

  describe('find', () => {
    it('should call productsService.find with numeric id', async () => {
      mockProductsService.find.mockResolvedValue({ id: 1 });
      await controller.find({ id: '1' });
      expect(service.find).toHaveBeenCalledWith(1);
    });
  });

  describe('findBySlug', () => {
    it('should call productsService.findBySlug with slug', async () => {
      mockProductsService.findBySlug.mockResolvedValue({ id: 1, slug: 'product-1' });
      await controller.findBySlug({ slug: 'product-1' });
      expect(service.findBySlug).toHaveBeenCalledWith('product-1');
    });
  });

  describe('create', () => {
    it('should call productsService.create with dto', async () => {
      const dto = { name: 'Product', categoryId: 1, description: 'Desc', price: 100, stock: 10 } as any;
      mockProductsService.create.mockResolvedValue({ id: 1 });
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should call productsService.update with numeric id and data', async () => {
      const data = { name: 'Updated', price: 150 } as any;
      mockProductsService.update.mockResolvedValue({ id: 1 });
      await controller.update({ id: '1', data });
      expect(service.update).toHaveBeenCalledWith(1, data);
    });
  });

  describe('delete', () => {
    it('should call productsService.delete with numeric id', async () => {
      mockProductsService.delete.mockResolvedValue({ id: 1 });
      await controller.delete({ id: '1' });
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('stockAvailable', () => {
    it('should call productsService.stockAvailable with items', async () => {
      const items = [{ productId: 1, quantity: 2 }];
      mockProductsService.stockAvailable.mockResolvedValue(true);
      await controller.stockAvailable(items);
      expect(service.stockAvailable).toHaveBeenCalledWith(items);
    });
  });

  describe('increaseProductStock', () => {
    it('should call productsService.increaseStock with item as array', async () => {
      const item = { productId: 1, quantity: 5 };
      mockProductsService.increaseStock.mockResolvedValue(true);
      await controller.increaseProductStock(item);
      expect(service.increaseStock).toHaveBeenCalledWith([item]);
    });
  });
});
