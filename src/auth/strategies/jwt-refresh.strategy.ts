import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as process from "process";
import {Request} from "express";
import {JWT_REFRESH_SECRET} from "../../environments/environments";

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

        const refreshToken: string = request.get('Authorization').replace('Bearer', '').trim();

        return { ...payload , refreshToken};
    }
}