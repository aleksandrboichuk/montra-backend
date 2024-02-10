import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {SignupUserDto} from "../user/dto/signup-user.dto";
import * as argon2 from 'argon2';
import {JwtService} from "@nestjs/jwt";
import {LoginUserDto} from "../user/dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any>
    {
        const user = await this.userService.findOne(
            {email},
            {
                id: true,
                password: true
            }
        );

        if (user && await argon2.verify(user.password, password)) {

            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async register(dto: SignupUserDto): Promise<{accessToken: string, refreshToken: string}>
    {
        const userExists = await this.userService.findOne({
                email: dto.email
            }, {
                id: true
            }
        );

        if(userExists){
            throw new BadRequestException("User with this email already exists.")
        }

        const user = await this.userService.create(dto);

        const {accessToken, refreshToken} = await this.getTokens({
            id: user.id,
            email: user.email
        });

        await this.userService.updateRefreshToken(user.id, refreshToken);

        return {
            accessToken,
            refreshToken,
        };
    }

    async login(dto: LoginUserDto)
    {
        const user = await this.userService.findOne({
            email: dto.email
        });

        const { accessToken, refreshToken } = await this.getTokens({
            id: user.id,
            email: user.email
        });

        await this.userService.updateRefreshToken(user.id, refreshToken);

        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(userId: string, token: string)
    {
        const user = await this.userService.findOne({
            id:userId
        }, {
            id: true,
            email: true,
            refresh_token:true
        });

        if(!user || !await argon2.verify( user.refresh_token, token)){
            throw new UnauthorizedException();
        }

        const {accessToken, refreshToken} = await this.getTokens({
            id: user.id,
            email: user.email
        });

        await this.userService.updateRefreshToken(userId, refreshToken);

        return {
            accessToken,
            refreshToken
        };
    }

    async getTokens(payload: object)
    {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateToken(payload),
            this.generateToken(payload, true),
        ]);

        return {
            accessToken,
            refreshToken
        }
    }

    async generateToken(payload: object, refresh: boolean = false)
    {
        return this.jwtService.signAsync(payload, {
            expiresIn: refresh
                ? process.env.JWT_REFRESH_EXPIRES_IN
                : process.env.JWT_EXPIRES_IN,
            secret: refresh
                ? process.env.JWT_REFRESH_SECRET
                : process.env.JWT_SECRET
        })
    }
}
