import {BadRequestException, Injectable} from '@nestjs/common';
import {ForgotPasswordDto} from "./dto/forgot-password.dto";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {UsersService} from "../users/users.service";
import {randomUUID} from "crypto";
import {MailService} from "../mail/mail.service";
import {ResetPasswordDto} from "./dto/reset-password.dto";
import {PASSWORD_RESET_TOKEN_LIFETIME_H} from "../environments/environments";
import {incorrectKey} from "../common/utils/error-key-generator.util";

@Injectable()
export class PasswordsService {

    constructor(
        private prisma: PrismaService,
        private usersService: UsersService,
        private mailService: MailService
    ) {}

    async sendForgotPasswordLink(dto: ForgotPasswordDto): Promise<boolean>
    {
        const user: Prisma.UserGetPayload<any> = await this.usersService.findOne(dto, {id:true, name: true})

        if(!user){
            throw new BadRequestException("User with this email does not exists")
        }

        const code: string = randomUUID();

        await this.invalidateUserPasswordResets(user.id)

        await this.createPasswordResetEntry(code, user);

        return this.mailService.sendPasswordResetLink(code, dto.email, user.name)
    }

    async createPasswordResetEntry(code: string, user: Prisma.UserGetPayload<any>) {
        return this.prisma.passwordResets.create({data: {user_id: user.id, code}});
    }

    async invalidateUserPasswordResets(userId: string): Promise<void>
    {

        const userPasswordResetsCount = await this.prisma.passwordResets.count({where: {
                user_id: userId,
                active: true
            }
        });

        if(userPasswordResetsCount > 0){
            await this.prisma.passwordResets.updateMany({
                data: {
                    active: false
                },
                where: {
                    user_id: userId,
                    active: true
                }
            })
        }
    }

    async getUserIdByCode(code: string, checkExpiration: boolean = false): Promise<string>
    {
        const passwordResetEntry: {user_id: string, created_at: Date} = await this.findOne({
            code,
            active: true
        }, {
            user_id: true,
            created_at: true
        }, {
            created_at: "desc"
        });

        if(!passwordResetEntry){
            throw new BadRequestException(incorrectKey('code'))
        }

        if(checkExpiration){
            const tokenLifetime: number = PASSWORD_RESET_TOKEN_LIFETIME_H

            const today: Date = new Date();

            const tokenExpirationDate: number = new Date(passwordResetEntry.created_at)
                .setHours(today.getHours() + tokenLifetime)

            if(tokenExpirationDate < today.getTime()){
                throw new BadRequestException(incorrectKey('code'))
            }
        }

        return passwordResetEntry.user_id;
    }

    async resetPassword(dto: ResetPasswordDto): Promise<boolean>
    {
        const userId = await this.getUserIdByCode(dto.code, true);

        const passwordHasBeenReset = await this.usersService.updatePassword(userId, dto.password);

        await this.invalidateUserPasswordResets(userId);

        return Boolean(passwordHasBeenReset);
    }

    async findOne(
        data: Prisma.PasswordResetsWhereInput,
        select?: Prisma.PasswordResetsSelect,
        orderBy?:Prisma.UserCountOrderByAggregateInput
    ): Promise<Prisma.PasswordResetsGetPayload<any>>
    {
        return this.prisma.passwordResets.findFirst({
            where: data,
            select,
            orderBy
        })
    }
}
