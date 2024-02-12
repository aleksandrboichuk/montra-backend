import {BadRequestException, Injectable} from '@nestjs/common';
import {ForgotPasswordDto} from "./dto/forgot-password.dto";
import {Prisma} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {UserService} from "../user/user.service";
import {randomUUID} from "crypto";
import {MailService} from "../mail/mail.service";
import {ResetPasswordDto} from "./dto/reset-password.dto";
import * as process from "process";

@Injectable()
export class PasswordService {

    constructor(
        private prisma: PrismaService,
        private userService: UserService,
        private mailService: MailService
    ) {}

    async sendForgotPasswordLink(dto: ForgotPasswordDto){
        const user = await this.userService.findOne(dto, {id:true, name: true})

        if(!user){
            throw new BadRequestException("User with this email does not exists")
        }

        const code = randomUUID();

        await this.invalidateUserPasswordResets(user.id)

        await this.createPasswordResetEntry(code, user);

        return this.mailService.sendPasswordResetLink(code, dto.email, user.name)
    }

    async createPasswordResetEntry(code: string, user: Prisma.UserGetPayload<any>) {
        return this.prisma.passwordResets.create({data: {user_id: user.id, code}});
    }

    async invalidateUserPasswordResets(userId: string){

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

    async getUserIdByCode(code: string, checkExpiration: boolean = false): Promise<string> {
        const passwordResetEntry = await this.findOne({
            code,
            active: true
        }, {
            user_id: true,
            created_at: true
        }, {
            created_at: "desc"
        });

        if(!passwordResetEntry){
            throw new BadRequestException("codeIsIncorrect")
        }

        if(checkExpiration){
            const tokenLifetime = Number(process.env.PASSWORD_RESET_TOKEN_LIFETIME_H) || 2

            const today = new Date();

            const tokenExpirationDate = new Date(passwordResetEntry.created_at)
                .setHours(today.getHours() + tokenLifetime)

            if(tokenExpirationDate < today.getTime()){
                throw new BadRequestException("codeIsIncorrect")
            }
        }

        return passwordResetEntry.user_id;
    }

    async resetPassword(dto: ResetPasswordDto) {
        const userId = await this.getUserIdByCode(dto.code, true);

        const passwordHasBeenReset = await this.userService.updatePassword(userId, dto.password);

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
