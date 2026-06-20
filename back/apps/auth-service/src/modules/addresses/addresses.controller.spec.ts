import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

describe('AddressesController', () => {
  let controller: AddressesController;
  let service: AddressesService;

  const mockAddressesService = {
    get: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [{ provide: AddressesService, useValue: mockAddressesService }],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
    service = module.get<AddressesService>(AddressesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('authAddresses', () => {
    it('should call addressesService.get with userId from payload', async () => {
      mockAddressesService.get.mockResolvedValue([{ id: 1 }]);
      await controller.authAddresses({ userId: 1 });
      expect(service.get).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should call addressesService.create with userId and dto', async () => {
      const dto = { street: 'Rua A', city: 'São Paulo', state: 'SP', zipCode: '01000-000' } as any;
      mockAddressesService.create.mockResolvedValue({ id: 1 });
      await controller.create({ userId: 1, dto });
      expect(service.create).toHaveBeenCalledWith(1, dto);
    });
  });
});
