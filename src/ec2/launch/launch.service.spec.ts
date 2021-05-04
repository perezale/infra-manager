import { Test, TestingModule } from '@nestjs/testing';
import { LaunchService } from './launch.service';

describe('LaunchService', () => {
  let service: LaunchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaunchService],
    }).compile();

    service = module.get<LaunchService>(LaunchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
