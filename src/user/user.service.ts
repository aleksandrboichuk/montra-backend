import { Injectable } from '@nestjs/common';
import {Prisma} from "@prisma/client";
import * as argon2 from 'argon2';
import {prismaExclude} from "../prisma/utils/exclude.util";
import {PrismaService} from "../prisma/prisma.service";
import {RegisterInput} from "../auth/graphql.schema";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput | RegisterInput): Promise<any> {
        const password = await argon2.hash(data.password)

        return this.prisma.user.create({
            data: {...data, password},
            select: {id: true}
        });
    }

    async findOne(data: Prisma.UserWhereInput, select?: Prisma.UserSelect): Promise<Prisma.UserGetPayload<any>>
    {
        return this.prisma.user.findFirst({
            where: data,
            select
        })
    }

    async updateRefreshToken(id: string, token: string): Promise<{id: string}>
    {
        return this.prisma.user.update({where: {
            id
        }, data: {
            refresh_token: await argon2.hash(token)
        }, select: {
            id:true
        }})
    }

    async updatePassword(id: string, password: string): Promise<{id: string}>
    {
        return this.prisma.user.update({where: {
                id
            }, data: {
                password: await argon2.hash(password)
            }, select: {
                id:true
            }})
    }

    async getUserByEmailVerificationCode(code: string): Promise<Prisma.UserGetPayload<any>>
    {
        return this.findOne({email_verification_code: code}, {
            id: true,
            email: true
        });
    }

    async updateEmailVerificationCode(userId: string, code: string|null): Promise<any>
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

    async setUserEmailVerified(userId: string): Promise<any>
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

    async getProfile(id: string)
    {
        return this.prisma.user.findUnique({
            where: {id},
            select: {
                ...prismaExclude('User', [
                    'password',
                    'refresh_token',
                    'last_login',
                    'created_at',
                    'updated_at',
                    'email_verified_at',
                    'phone_verified_at'
                ]),
                wallets: {
                    select: {
                        id: true,
                        name:true,
                        balance: true,
                        currency: true
                    }
                }
            },
        })
    }

    async deleteUser(userId: string): Promise<any>
    {
        return this.prisma.user.delete({where: {
            id: userId
        }});
    }
}
