import { userStub } from "../stubs/user.stub";

export const UserService = jest.fn().mockReturnValue({
    getuserById: jest.fn().mockResolvedValue(userStub()),
    getAllUsers: jest.fn().mockResolvedValue([userStub()]),
    registerUser: jest.fn().mockResolvedValue(userStub()),
    updateuserById: jest.fn().mockResolvedValue(userStub()),
})