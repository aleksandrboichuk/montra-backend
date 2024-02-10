import { Injectable } from '@nestjs/common';
import {User, Prisma} from "@prisma/client";
import * as bcrypt from 'bcrypt'
import {PrismaService} from "../prisma/prisma.service";
import {SignupUserDto} from "./dto/signup-user.dto";
import {UserFindInterface} from "./interfaces/user-find.interface";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput | SignupUserDto): Promise<User>
    {
        const password = await bcrypt.hash(data.password, 5)

        return this.prisma.user.create({data: {...data, password}});
    }

    async findOne(data: UserFindInterface, select?: Prisma.UserSelect): Promise<Prisma.UserGetPayload<any>>
    {
        return this.prisma.user.findFirst({
            where: data,
            select
        })
    }
}
