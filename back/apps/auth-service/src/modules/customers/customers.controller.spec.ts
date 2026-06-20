import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  const mockCustomersService = {
    findAll: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: CustomersService, useValue: mockCustomersService }],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call customersService.findAll with payload', async () => {
      const payload = { page: 1, perPage: 10, search: '' };
      mockCustomersService.findAll.mockResolvedValue({ data: [], meta: {} });
      await controller.findAll(payload);
      expect(service.findAll).toHaveBeenCalledWith(payload);
    });
  });

  describe('find', () => {
    it('should call customersService.find with numeric id', async () => {
      mockCustomersService.find.mockResolvedValue({ id: 1 });
      await controller.find({ id: '1' });
      expect(service.find).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should call customersService.create with dto', async () => {
      const dto = { name: 'Jane', email: 'jane@test.com', document: '12345', phone: '999' } as any;
      mockCustomersService.create.mockResolvedValue({ id: 1 });
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});
