import {$Enums} from ".prisma/client";

export class UserPayload {
    id: string;
    email: string;
}

export class User {
    id: string | null
    email: string | null
    phone: string | null
    name: string | null
    avatar: string | null
    age: number | null
    country: string | null
    locale: string | null
    email_verification_code: string | null
    phone_verification_code: string | null
    phone_verified: boolean | null
    email_verified: boolean | null
    social_network: $Enums.SocialNetwork | null
    social_network_id: string | null
    admin: boolean | null
}


export abstract class IQuery {
    abstract user(): User;
}

export abstract class IMutation {

}