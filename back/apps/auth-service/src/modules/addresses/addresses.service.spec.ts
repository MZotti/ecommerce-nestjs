import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { AddressesRepository } from './addresses.repository';

describe('AddressesService', () => {
  let service: AddressesService;

  const mockAddressesRepository = {
    findByUserId: jest.fn(),
    countByUserId: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        { provide: AddressesRepository, useValue: mockAddressesRepository },
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return addresses for a user', async () => {
      mockAddressesRepository.findByUserId.mockResolvedValue([{ id: 1 }]);
      const result = await service.get(1);
      expect(mockAddressesRepository.findByUserId).toHaveBeenCalledWith(1);
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('create', () => {
    const dto = { street: 'Rua A', city: 'São Paulo', state: 'SP', zipCode: '01000-000' } as any;

    it('should set isDefault to true when user has no existing addresses', async () => {
      mockAddressesRepository.countByUserId.mockResolvedValue(0);
      mockAddressesRepository.create.mockResolvedValue({ id: 1, isDefault: true });
      await service.create(1, dto);
      expect(mockAddressesRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: 1, isDefault: true }),
      );
    });

    it('should set isDefault to false when user already has addresses', async () => {
      mockAddressesRepository.countByUserId.mockResolvedValue(2);
      mockAddressesRepository.create.mockResolvedValue({ id: 2, isDefault: false });
      await service.create(1, dto);
      expect(mockAddressesRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: 1, isDefault: false }),
      );
    });
  });
});
