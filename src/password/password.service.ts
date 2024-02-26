import {BadRequestException, Injectable} from '@nestjs/common';
import {Prisma} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {UserService} from "../user/user.service";
import {randomUUID} from "crypto";
import {MailService} from "../mail/mail.service";
import {errorMessagesConstant} from "../auth/constants/error-messages.constant";
import {PASSWORD_RESET_TOKEN_LIFETIME_H} from "@environments";
import {ForgotPasswordInput, ResetPasswordInput} from "./graphql.schema";

@Injectable()
export class PasswordService {

    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private mailService: MailService
    ) {}

    async sendForgotPasswordLink(input: ForgotPasswordInput): Promise<boolean>
    {
        const user: Prisma.UserGetPayload<any> = await this.userService.findOne(input, {id:true, name: true})

        if(!user){
            throw new BadRequestException("User with this email does not exists")
        }

        const code: string = randomUUID();

        await this.invalidateUserPasswordResets(user.id)

        await this.createPasswordResetEntry(code, user);

        return this.mailService.sendPasswordResetLink(code, input.email, user.name)
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
            throw new BadRequestException(errorMessagesConstant.code.incorrect)
        }

        if(checkExpiration){
            const tokenLifetime: number = +PASSWORD_RESET_TOKEN_LIFETIME_H!

            const today: Date = new Date();

            const tokenExpirationDate: number = new Date(passwordResetEntry.created_at)
                .setHours(today.getHours() + tokenLifetime)

            if(tokenExpirationDate < today.getTime()){
                throw new BadRequestException(errorMessagesConstant.code.incorrect)
            }
        }

        return passwordResetEntry.user_id;
    }

    async resetPassword(input: ResetPasswordInput): Promise<boolean>
    {
        const userId = await this.getUserIdByCode(input.code, true);

        const passwordHasBeenReset = await this.userService.updatePassword(userId, input.password);

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
