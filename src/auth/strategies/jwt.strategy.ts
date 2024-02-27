import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as process from "process";
import {JWT_SECRET} from "@environments";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET!
        });
    }

    async validate(payload: any): Promise<{id: string|null, email: string|null}> {
        return { id: payload.id, email: payload.email };
    }
}