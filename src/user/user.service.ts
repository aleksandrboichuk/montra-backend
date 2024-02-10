import { Injectable } from '@nestjs/common';
import {User, Prisma} from "@prisma/client";
import * as argon2 from 'argon2';
import {PrismaService} from "../prisma/prisma.service";
import {SignupUserDto} from "./dto/signup-user.dto";
import {UserFindInterface} from "./interfaces/user-find.interface";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput | SignupUserDto): Promise<User>
    {
        const password = await argon2.hash(data.password)

        return this.prisma.user.create({data: {...data, password}});
    }

    async findOne(data: UserFindInterface, select?: Prisma.UserSelect): Promise<Prisma.UserGetPayload<any>>
    {
        return this.prisma.user.findFirst({
            where: data,
            select
        })
    }

    async updateRefreshToken(id: string, token: string)
    {
        return this.prisma.user.update({where: {
            id
        }, data: {
            refresh_token: await argon2.hash(token)
        }, select: {
            id:true
        }})
    }
}
