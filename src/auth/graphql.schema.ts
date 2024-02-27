
export class RegisterInput {
    name: string;
    email: string;
    password: string;
}

export class Register {
    id: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class JWTTokens {
    accessToken: string;
    refreshToken: string;
}

export class RefreshTokenPayload {
    id: string;
    email: string;
    refreshToken: string;
}

export class VerifyEmailInput {
    code: string;
}

export class SendEmailVerificationLetterInput {
    userId: string;
}

export class SendEmailVerificationLetter {
    success: boolean;
}

export class Test {
    test: string;
}

export abstract class IQuery {
    abstract test(): String;
}

export abstract class IMutation {
    abstract register(input: RegisterInput): Register | Promise<Register>;
    abstract login(input: LoginInput): JWTTokens | Promise<JWTTokens>;
    abstract refresh: JWTTokens | Promise<JWTTokens>;
    abstract verifyEmail(input: VerifyEmailInput): JWTTokens | Promise<JWTTokens>;
    abstract sendEmailVerificationLetter(
        input: SendEmailVerificationLetterInput
    ): SendEmailVerificationLetter | Promise<SendEmailVerificationLetter>;
}