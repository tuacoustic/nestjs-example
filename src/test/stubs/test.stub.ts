import { TestDto } from "../test.dto"

export const testStub = (): TestDto => {
    return {
        id: '1',
        name: 'Fake users',
    }
}