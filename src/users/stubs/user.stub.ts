import { UserDto } from "../dtos";

export const userStub = (): UserDto => {
    return {
        id: '2cf6e154-f7a0-4b6e-a827-62ef74d6c9fe',
        email: 'test@gmail.com',
        firstname: 'Test',
        lastname: 'Test',
        phone: '0975089502',
        password: '123',
        roles: ['ADMIN'],
        isActive: false,
    }
}