import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UserPayloadDto} from "../auth/dto/user-payload.dto";
import {selectConstant} from "./constants/select.constant";
import {UpdateWalletTransactionDto} from "./dto/update-wallet-transaction.dto";
import {CreateWalletTransactionDto} from "./dto/create-wallet-transaction.dto";
import {WalletsService} from "../wallets/wallets.service";
import {TransactionCategoriesService} from "../transaction-categories/transaction-categories.service";

@Injectable()
export class WalletTransactionsService {
    constructor(
        private prismaService: PrismaService,
        private walletService: WalletsService,
        private transactionCategoriesService: TransactionCategoriesService,
    ) {}

    async create(dto: CreateWalletTransactionDto, userPayload: UserPayloadDto){
        await this.transactionCategoriesService.exists(dto.category_id, true);
        await this.walletService.exists(dto.wallet_id, true);
        return this.prismaService.walletTransaction.create({
            data: dto,
            select: selectConstant.withoutRelations
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

        await this.transactionCategoriesService.exists(dto.category_id, true);

        return this.prismaService.walletTransaction.update({
            where: {
                id,
                wallet: {
                    user_id: user.id
                }
            },
            data: dto,
            select: selectConstant.withoutRelations
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

    async exists(id: string, throwException: boolean = false){

        const item: boolean = !! await this.prismaService.walletTransaction.findUnique({
            where: {id},
            select: {id: true}
        });

        if(!item){
            if(throwException){
                throw new UnprocessableEntityException('Wallet transaction not found')
            }
            return false
        }

        return true;
    }
}
