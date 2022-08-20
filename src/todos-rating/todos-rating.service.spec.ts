import { Test, TestingModule } from '@nestjs/testing';
import { TodosRatingService } from './todos-rating.service';

describe('TodosRatingService', () => {
  let service: TodosRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosRatingService],
    }).compile();

    service = module.get<TodosRatingService>(TodosRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
