import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRolesBuilder, RolesBuilder } from "nest-access-control";
import { AppResources } from "src/app.roles";
import { postTypes } from "src/common/code-type/posts.code-type";
import { Auth, User } from "src/common/decorators";
import { Resp } from "src/common/resp";
import { UserDto } from "src/users/dtos";
import { CreatePostDto } from "./dtos/posts.dto";
import { PostService } from "./posts.service";

@ApiTags('Posts')
@Controller("posts")
export class PostsController {
    constructor(
        private readonly postService: PostService,
        @InjectRolesBuilder()
        private readonly roleBuilder: RolesBuilder,
    ) {}


    @Auth({
        resource: AppResources.POSTS,
        action: 'read',
        possession: 'own',
    })
    @Get('/get-by-author')
    async getByAuthor(@User() user: UserDto): Promise<Resp> {
        try {
            const where = {
                author: {
                    id: user.id
                }
            }
            const result = [];
            const value = await this.postService.getAll(where);
            for(let index = 0; index < value.length; index += 1) {
                result.push({
                    ...value[index],
                    author: UserDto.plainToClass(value[index].author),
                })
            }
            return {
                status: HttpStatus.OK,
                data: result,
            }
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                data: [postTypes().POST_CREATE_ERROR],
                error: error.message,
            }
        }
    }
    @Auth({
        resource: AppResources.POSTS,
        action: 'create',
        possession: 'own',
    })
    @Post('/create')
    async createPost(@Body() postData: CreatePostDto, @User() author: UserDto): Promise<any> {
        try {
            const savedData = await this.postService.save({
                ...postData,
                author: UserDto.plainToClass(author),
            });
            return {
                status: HttpStatus.OK,
                data: [savedData],
                message: postTypes().POST_CREATE_SUCCESSFULLY.message
            }
        } catch (error) {
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                data: [postTypes().POST_CREATE_ERROR],
                error: error.message,
            }
        }
    }
}