import {prismaExclude} from "../../prisma/helpers/exclude.helper";

export const selectConstant = {
    profile: {
        ...prismaExclude('User', [
            'password',
            'refresh_token',
            'last_login',
            'created_at',
            'updated_at',
            'email_verified_at',
            'phone_verified_at',
            'phone_verification_code',
            'email_verification_code',
            'social_network_id'
        ]),
        wallets: {
            select: {
                id: true,
                name:true,
                balance: true,
                currency_id: true,
                currency: {
                    select: {
                        id: true,
                        symbol: true
                    }
                },
                transactions: {
                    select: prismaExclude("WalletTransaction", [
                        "created_at",
                        "updated_at"
                    ])
                },
            }
        }
    },
}