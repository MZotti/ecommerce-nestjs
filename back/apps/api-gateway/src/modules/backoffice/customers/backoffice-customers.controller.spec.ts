import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeCustomersController } from './backoffice-customers.controller';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('BackofficeCustomersController', () => {
  let controller: BackofficeCustomersController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeCustomersController],
      providers: [{ provide: 'AUTH_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<BackofficeCustomersController>(BackofficeCustomersController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should send "findAllCustomers" with pagination and search', () => {
      controller.findAll(1, 10, '');
      expect(mockClient.send).toHaveBeenCalledWith('findAllCustomers', { page: 1, perPage: 10, search: '' });
    });
  });

  describe('find', () => {
    it('should send "findCustomer" with id', async () => {
      await controller.find(1);
      expect(mockClient.send).toHaveBeenCalledWith('findCustomer', { id: 1 });
    });
  });

  describe('create', () => {
    it('should send "createCustomer" with dto', () => {
      const dto = { name: 'Jane', email: 'jane@test.com', document: '12345', phone: '999' } as any;
      controller.create(dto);
      expect(mockClient.send).toHaveBeenCalledWith('createCustomer', dto);
    });
  });

  describe('update', () => {
    it('should send "updateUser" with id and data', async () => {
      const dto = { name: 'Updated' } as any;
      await controller.update(1, dto);
      expect(mockClient.send).toHaveBeenCalledWith('updateUser', { id: 1, data: dto });
    });
  });

  describe('delete', () => {
    it('should send "deleteUser" with id', async () => {
      await controller.delete(1);
      expect(mockClient.send).toHaveBeenCalledWith('deleteUser', { id: 1 });
    });
  });
});
