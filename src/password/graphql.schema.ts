export class ForgotPasswordInput {
    email: string;
}

export class ValidateCodeInput {
    code: string
}

export class ResetPasswordInput {
    userId: string;
    code: string;
    password: string;
}

export class ValidateCode {
    userId: string;
}

export class Success {
    success: boolean;
}

export abstract class IQuery {
    abstract validateCode(input: ValidateCodeInput): ValidateCode;
}

export abstract class IMutation {
    abstract forgotPassword(input: ForgotPasswordInput): Success;
    abstract resetPassword(input: ResetPasswordInput): Success;
}