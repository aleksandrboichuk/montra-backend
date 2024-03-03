import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UserPayloadDto} from "../auth/dto/user-payload.dto";
import {selectConstant} from "../wallets/constants/select.constant";
import {UpdateWalletTransactionDto} from "./dto/update-wallet-transaction.dto";
import {CreateWalletTransactionDto} from "./dto/create-wallet-transaction.dto";

@Injectable()
export class WalletTransactionsService {
    constructor(private prismaService: PrismaService) {}

    async create(dto: CreateWalletTransactionDto, userPayload: UserPayloadDto){
        return this.prismaService.walletTransaction.create({
            data: {
                ...dto
            },
            select: selectConstant.default
        })
    }

    async findAll(user: UserPayloadDto){
        return this.prismaService.walletTransaction.findMany({
            where: {
                wallet: {
                    user_id: user.id
                }
            },
            select: selectConstant.default
        })
    }

    async update(id: string, dto: UpdateWalletTransactionDto, user: UserPayloadDto){
        return this.prismaService.walletTransaction.update({
            where: {
                id,
                wallet: {
                    user_id: user.id
                }
            },
            data: dto,
            select: selectConstant.default
        });
    }

    async findOne(id: string, user: UserPayloadDto){
        return this.prismaService.walletTransaction.delete({
            where: {
                id,
                wallet: {
                    user_id: user.id
                }
            },
            select: selectConstant.default
        });
    }

    async remove(id: string, user: UserPayloadDto){
        return this.prismaService.walletTransaction.delete({
            where: {
                id,
                wallet: {
                    user_id: user.id
                }
            },
            select: {
                id: true
            }
        });
    }
}
