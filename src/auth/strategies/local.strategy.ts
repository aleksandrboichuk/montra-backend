import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import {errorMessagesConstant} from "../constants/error-messages.constant";
import {Request} from "express";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "email"
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnauthorizedException(errorMessagesConstant.login.incorrectCredentials);
        }

        if(!user.email_verified){
            throw new UnauthorizedException(errorMessagesConstant.login.emailIsNotVerified);
        }

        return user;
    }
}