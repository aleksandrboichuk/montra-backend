import {Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {Prisma} from "@prisma/client";
import {ApiOperation} from "@nestjs/swagger";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
}
