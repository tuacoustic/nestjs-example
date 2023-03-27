import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Resp } from '../common/resp';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { mockTestControllerRepo } from './__mocks__/test.controller';
import { testStub } from './stubs/test.stub';
import { testTypes } from '../common/code-type/test.code-type';

describe('TestController', () => {
  let controller: TestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [TestService],
    })
      .overrideProvider(TestService)
      .useValue(mockTestControllerRepo)
      .compile();

    controller = module.get<TestController>(TestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a test', async () => {
    const dto = {name: 'Fake User'}
    let expectedResponse: Resp;
    const data = await controller.create(dto);
    expectedResponse = {
      data: data.data
    }
    expect(data).toEqual(expectedResponse)
    expect(mockTestControllerRepo.create).toHaveBeenCalled();
  })

  it('should update a test', async () => {
    const dto = testStub();
    let expectedResponse: Resp;
    const data = await controller.update(dto.id, dto)
    expectedResponse = {
      data: data.data,
      message: testTypes().TEST_UPDATE_SUCCESSFULLY.message,
    }
    expect(data).toEqual(expectedResponse);
    expect(mockTestControllerRepo.update).toHaveBeenCalled();
  })
});
