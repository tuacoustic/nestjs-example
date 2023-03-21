import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { RolesBuilder } from "nest-access-control";
import { Resp } from "../common/resp";
import { Repository } from "typeorm";
import { userStub } from "./stubs/user.stub";
import { UsersController } from "./users.controller"
import { UserEntity } from "./users.entity";
import { UserService } from "./users.service";
import { BaseService } from "../common/mysql/base.service";

jest.mock('./__mocks__/users.service');

describe('UsersController', () => {
    let usersController: UsersController;
    let userService: UserService;
    let baseService: BaseService<UserEntity>;
    // let userRepository: Repository<UserEntity>

    const roles: RolesBuilder = new RolesBuilder();
    // const userRepo = getRepositoryToken(UserEntity);
    // const baseRepo = getRepositoryToken(UserEntity);
    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            // providers: [
            //     UserService,
            //     {
            //         provide: userRepo,
            //         useValue: {} 
            //     },
            //     {
            //         provide: '__roles_builder__',
            //         useValue: roles,
            //     }
            // ],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        getOneNew: jest.fn(),
                    }
                },
                {
                    provide: BaseService,
                    useValue: {
                        getOne: jest.fn(),
                    }
                },
                {
                    provide: '__roles_builder__',
                    useValue: roles,
                }
            ],
            controllers: [UsersController]
        }).compile();

        usersController = moduleRef.get<UsersController>(UsersController);
        userService = moduleRef.get<UserService>(UserService);
        baseService = moduleRef.get<BaseService<UserEntity>>(BaseService);
    });

    it('should be defined', () => {
        expect(usersController).toBeDefined();
    })

    it('getOne', async () => {
        const user = await usersController.getUserById(userStub().id);
        console.log(user);
    })

})