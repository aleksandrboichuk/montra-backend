import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UserPayloadDto} from "../auth/dto/user-payload.dto";
import {selectConstant} from "./constants/select.constant";
import {CreateTransactionCategoryDto} from "./dto/create-transaction-category.dto";
import {UpdateTransactionCategoryDto} from "./dto/update-transaction-category.dto";

@Injectable()
export class TransactionCategoriesService {

    constructor(private prismaService: PrismaService) {}

    async create(dto: CreateTransactionCategoryDto, userPayload: UserPayloadDto){
        return this.prismaService.transactionCategory.create({
            data: {
                ...dto,
                main: userPayload.admin && dto.main,
                created_by: userPayload.id
            },
            select: selectConstant.default
        })
    }

    async findAll(user: UserPayloadDto){
        return this.prismaService.transactionCategory.findMany({
            where: {
                OR: [
                    {main: true},
                    {created_by: user.id}
                ]
            },
            select: selectConstant.default
        })
    }

    async update(id: string, dto: UpdateTransactionCategoryDto, user: UserPayloadDto){

        const where = { id };

        const data = {...dto};

        if(!user.admin){
            // prevent changing 'main' field and changing categories which is global (with 'main' true)
            where['main'] = false;
            delete(data['main']);
        }

        return this.prismaService.transactionCategory.update({
            where,
            data,
            select: selectConstant.default
        });
    }

    async findOne(id: string, user: UserPayloadDto){
        return this.prismaService.transactionCategory.findUnique({
            where: {
                id,
                OR: [
                    {created_by: user.id},
                    {main: true},
                ]
            },
            select: selectConstant.default
        });
    }

    async remove(id: string, user: UserPayloadDto){
        const where = { id };

        if(!user.admin){
            // prevent deleting categories which is global (with 'main' true)
            where['main'] = false;
        }

        return this.prismaService.transactionCategory.delete({
            where: {
                id,
            },
            select: {
                id: true
            }
        });
    }

    async exists(id: string, throwException: boolean = false){

        const item: boolean = !! await this.prismaService.transactionCategory.findUnique({
            where: {id},
            select: {id: true}
        });

        if(!item){
            if(throwException){
                throw new UnprocessableEntityException('Transaction category not found')
            }
            return false
        }

        return true;
    }
}
