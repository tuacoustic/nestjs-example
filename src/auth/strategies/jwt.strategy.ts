import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import configuration from "src/config/configuration";
import { UserService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
    ) {
       super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configuration().publicKey, // Verify
       });
    }

    async validate(payload: any) {
        const {sub: id} = payload;
        const where = {
            id,
        }

        return await this.userService.getOne(where, "id", "email", "lastname", "firstname", "roles");
    }
}