import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {SignupUserDto} from "../user/dto/signup-user.dto";
import * as bcrypt from 'bcrypt';
import {User} from "@prisma/client";
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

        if (user && bcrypt.compare(user.password, password)) {

            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async register(dto: SignupUserDto): Promise<{access_token: string, user: User}>
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

        delete user.password;

        return {
            access_token: await this.generateToken(user),
            user
        };
    }

    async login(dto: LoginUserDto)
    {
        const user = await this.userService.findOne({
            email: dto.email
        });

        delete user.password;

        return {
            access_token: await this.generateToken(user),
            user
        }
    }

    async generateToken(user: User)
    {
        return this.jwtService.signAsync({
            id: user.id,
            email: user.email
        })
    }
}
