import {Resolver, Query, Mutation, Args, Context} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CurrentUser} from "../decorators/current-user.decorator";
import {User, UserPayload} from "./graphql.schema";

@Resolver('User')
export class UserResolver {

    constructor(private readonly userService: UserService) {}

    @Query("profile")
    @UseGuards(JwtAuthGuard)
    async profile(@CurrentUser() user: UserPayload): Promise<User>{
        return await this.userService.getProfile(user.id)
    }
}
