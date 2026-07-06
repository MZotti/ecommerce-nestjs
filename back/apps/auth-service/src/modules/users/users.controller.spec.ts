import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findAll: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call usersService.findAll with payload', async () => {
      const payload = { query: { page: 1, perPage: 10, search: '' } };
      mockUsersService.findAll.mockResolvedValue({ data: [], meta: {} });
      await controller.findAll(payload);
      expect(service.findAll).toHaveBeenCalledWith(payload);
    });
  });

  describe('find', () => {
    it('should call usersService.find with numeric id', async () => {
      mockUsersService.find.mockResolvedValue({ id: 1 });
      await controller.find({ id: '1' });
      expect(service.find).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should call usersService.create with dto', async () => {
      const dto = { name: 'John', email: 'john@test.com', roleId: 1 } as any;
      mockUsersService.create.mockResolvedValue({ id: 1 });
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should call usersService.update with numeric id and data', async () => {
      const data = { name: 'Updated' } as any;
      mockUsersService.update.mockResolvedValue({ id: 1 });
      await controller.update({ id: '1', data });
      expect(service.update).toHaveBeenCalledWith(1, data);
    });
  });

  describe('delete', () => {
    it('should call usersService.delete with numeric id', async () => {
      mockUsersService.delete.mockResolvedValue({ id: 1 });
      await controller.delete({ id: '1' });
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
