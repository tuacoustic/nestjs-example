import { Resp } from "src/common/resp"

export const mockTestControllerRepo = {
    create: jest.fn((dto): Resp => {
      return {
        id: Date.now(),
        ...dto
      }
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
  }