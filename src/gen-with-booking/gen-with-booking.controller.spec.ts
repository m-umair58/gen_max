import { Test, TestingModule } from '@nestjs/testing';
import { GenWithBookingController } from './gen-with-booking.controller';

describe('GenWithBookingController', () => {
  let controller: GenWithBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenWithBookingController],
    }).compile();

    controller = module.get<GenWithBookingController>(GenWithBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
