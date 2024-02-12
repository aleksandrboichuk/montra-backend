import { Injectable } from '@nestjs/common';
import {User, Prisma} from "@prisma/client";
import * as argon2 from 'argon2';
import {PrismaService} from "../prisma/prisma.service";
import {RegisterUserDto} from "../auth/dto/register-user.dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput | RegisterUserDto): Promise<User>
    {
        const password = await argon2.hash(data.password)

        return this.prisma.user.create({data: {...data, password}});
    }

    async findOne(data: Prisma.UserWhereInput, select?: Prisma.UserSelect): Promise<Prisma.UserGetPayload<any>>
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

    async updatePassword(id: string, password: string)
    {
        return this.prisma.user.update({where: {
                id
            }, data: {
                password: await argon2.hash(password)
            }, select: {
                id:true
            }})
    }

    async getUserByEmailVerificationCode(code: string)
    {
        return this.findOne({email_verification_code: code}, {
            id: true,
            email: true
        });
    }

    async updateEmailVerificationCode(userId: string, code: string|null)
    {
        return this.prisma.user.update({
            data: {
                email_verification_code: code
            },
            where: {
                id: userId,
                email_verified: false
            }
        });
    }

    async setUserEmailVerified(userId: string)
    {
        return this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                email_verified: true,
                email_verification_code: null
            }
        })
    }
}
