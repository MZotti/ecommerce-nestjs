import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeCategoriesController } from './backoffice-categories.controller';
import { JwtAuthGuard } from '../../../common/jwt/jwt-auth.guard';
import { of } from 'rxjs';

describe('BackofficeCategoriesController', () => {
  let controller: BackofficeCategoriesController;

  const mockClient = {
    send: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeCategoriesController],
      providers: [{ provide: 'PRODUCTS_SERVICE', useValue: mockClient }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<BackofficeCategoriesController>(BackofficeCategoriesController);
    jest.clearAllMocks();
    mockClient.send.mockReturnValue(of([]));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should send "findAllCategories" message', () => {
      controller.findAll();
      expect(mockClient.send).toHaveBeenCalledWith('findAllCategories', {});
    });
  });
});
