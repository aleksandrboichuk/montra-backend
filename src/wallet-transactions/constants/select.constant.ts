import {prismaExclude} from "../../prisma/utils/exclude.util";

export const selectConstant = {
    default: {
        id: true,
        wallet_id: true,
        amount: true,
        description: true,
        type: true,
        category_id: true,
        transfer_to: true,
        receipt: true,

        // relations
        wallet: {
            select: prismaExclude('Wallet', [
                'created_at',
                'updated_at'
            ])
        },
        category: {
            select: prismaExclude('TransactionCategory', [
                'created_at',
                'updated_at'
            ])
        }
    },
    withoutRelations: {
        id: true,
        wallet_id: true,
        amount: true,
        description: true,
        type: true,
        category_id: true,
        transfer_to: true,
        receipt: true,
    }
}