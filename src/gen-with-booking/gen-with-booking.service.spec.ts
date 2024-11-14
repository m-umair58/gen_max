import { Test, TestingModule } from '@nestjs/testing';
import { GenWithBookingService } from './gen-with-booking.service';

describe('GenWithBookingService', () => {
  let service: GenWithBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenWithBookingService],
    }).compile();

    service = module.get<GenWithBookingService>(GenWithBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
