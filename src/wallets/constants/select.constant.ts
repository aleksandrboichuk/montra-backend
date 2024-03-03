import {prismaExclude} from "../../prisma/helpers/exclude.helper";

export const selectConstant = {
    default: {
        id: true,
        name: true,
        currency_id: true,
        balance: true,

        // relations
        currency: {
            select: {
                id: true,
                symbol: true
            }
        },
        transactions: {
            select: prismaExclude('WalletTransaction', [
                'created_at',
                'updated_at'
            ])
        }
    }
}