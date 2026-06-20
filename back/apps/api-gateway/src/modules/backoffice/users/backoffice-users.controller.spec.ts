import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeUsersController } from './backoffice-users.controller';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('BackofficeUsersController', () => {
  let controller: BackofficeUsersController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeUsersController],
      providers: [{ provide: 'AUTH_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<BackofficeUsersController>(BackofficeUsersController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of({}));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should send "findAllUsers" with pagination and search', () => {
      controller.findAll(1, 10, '');
      expect(mockClient.send).toHaveBeenCalledWith('findAllUsers', { page: 1, perPage: 10, search: '' });
    });
  });

  describe('find', () => {
    it('should send "findUser" with id', async () => {
      await controller.find(1);
      expect(mockClient.send).toHaveBeenCalledWith('findUser', { id: 1 });
    });
  });

  describe('create', () => {
    it('should send "createUser" with dto', () => {
      const dto = { name: 'John', email: 'john@test.com', roleId: 1 } as any;
      controller.create(dto);
      expect(mockClient.send).toHaveBeenCalledWith('createUser', dto);
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
