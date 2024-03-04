import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {CreateWalletDto} from "./dto/create-wallet.dto";
import {PrismaService} from "../prisma/prisma.service";
import {UserPayloadDto} from "../auth/dto/user-payload.dto";
import {UpdateWalletDto} from "./dto/update-wallet.dto";
import {selectConstant} from "./constants/select.constant";
import {CurrenciesService} from "../currencies/currencies.service";

@Injectable()
export class WalletsService {

    constructor(
        private prismaService: PrismaService,
        private currenciesService: CurrenciesService
    ) {
    }

    async create(dto: CreateWalletDto, userPayload: UserPayloadDto){

        await this.currenciesService.exists(dto.currency_id, true);

        return this.prismaService.wallet.create({
            data: {
                ...dto,
                user_id: userPayload.id
            },
            select: selectConstant.default
        })
    }

    async findAll(user: UserPayloadDto){
        return this.prismaService.wallet.findMany({
            where: {
                user_id: user.id
            },
            select: selectConstant.default
        })
    }

    async update(id: string, dto: UpdateWalletDto, user: UserPayloadDto){

        await this.currenciesService.exists(dto.currency_id, true);

        return this.prismaService.wallet.update({
            where: {
                id,
                user_id: user.id
            },
            data: dto,
            select: selectConstant.default
        });
    }

    async findOne(id: string, user: UserPayloadDto){
        return this.prismaService.wallet.findFirst({
            where: {
                id,
                user_id: user.id
            },
            select: selectConstant.default
        });
    }

    async remove(id: string, user: UserPayloadDto){
        return this.prismaService.wallet.delete({
            where: {
                id,
                user_id: user.id
            },
            select: {
                id: true
            }
        });
    }

    async exists(id: string, throwException: boolean = false){

        const item: boolean = !! await this.prismaService.wallet.findUnique({
            where: {id},
            select: {id: true}
        });

        if(!item){
            if(throwException){
                throw new UnprocessableEntityException('Wallet not found')
            }
            return false
        }

        return true;
    }
}
