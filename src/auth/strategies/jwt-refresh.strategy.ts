import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from "express";
import {JWT_REFRESH_SECRET} from "../../environments/environments";
import {errorKeysConstant} from "../constants/error-keys.constant";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_REFRESH_SECRET,
            passReqToCallback: true
        });
    }

    async validate(request: Request, payload: any): Promise<any>
    {
        const refreshToken: string = request.get('authorization').replace('Bearer', '').trim();

        if(!refreshToken){
            throw new UnauthorizedException(errorKeysConstant.refresh.incorrectToken);
        }

        return { ...payload , refreshToken};
    }
}