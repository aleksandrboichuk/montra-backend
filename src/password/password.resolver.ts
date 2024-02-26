import {Resolver, Query, Mutation, Args} from "@nestjs/graphql";
import {ForgotPasswordInput, ResetPasswordInput, Success, ValidateCode, ValidateCodeInput} from "./graphql.schema";
import {PasswordService} from "./password.service";

@Resolver('PasswordResolver')
export class PasswordResolver {

    constructor(private readonly passwordService: PasswordService) {}

    @Mutation("forgotPassword")
    async forgotPassword(@Args("input") input: ForgotPasswordInput): Promise<Success> {
        return {
            success: await this.passwordService.sendForgotPasswordLink(input)
        };
    }

    @Query("validateCode")
    async validateCode(@Args("input") input: ValidateCodeInput): Promise<ValidateCode> {
        return {
            userId: await this.passwordService.getUserIdByCode(input.code)
        };
    }

    @Mutation("resetPassword")
    async resetPassword(@Args("input") input: ResetPasswordInput): Promise<Success> {
        return {
            success: await this.passwordService.resetPassword(input)
        };
    }
}
