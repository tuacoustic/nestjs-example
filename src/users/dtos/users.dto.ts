import { Expose, Transform } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { AppRoles } from "src/app.roles";
import { BaseData } from "src/common/base.dto";
import { EnumToString } from "src/common/helpers/enumToString";
export class UserDto extends BaseData {
    @IsNotEmpty()
    firstname: string;
    @IsNotEmpty()
    lastname: string;

    @Transform(({obj})=>obj.firstname+' '+obj.lastname)
    @Expose()
    fullname?: string

    @Expose()
    phone: string
    
    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Expose()
    isActive: boolean

    @IsNotEmpty()
    password: string

    @Expose()
    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `Role value is not valid, must be ${EnumToString(AppRoles)}`
    })
    roles: string[]
}