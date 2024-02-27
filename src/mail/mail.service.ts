import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import { Options } from 'nodemailer/lib/smtp-transport';
import {
    APP_NAME,
    GMAIL_ACCESS_TOKEN,
    GMAIL_MAIL_USERNAME,
    GMAIL_REFRESH_TOKEN,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} from "@environments";

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

    async sendPasswordResetLink(code: string, email: string, name: string): Promise<boolean>
    {

        const link: string = `${APP_NAME}://${code}`

        return this.sendMail(
            email,
            "[Montra] Reset Password",
            'reset-password',
            {name, email, link}
        )
    }

    async sendVerificationCode(verificationCode: string, email: string, name: string): Promise<boolean>
    {
        return this.sendMail(
            email,
            "[Montra] Email Verification",
            'verification',
            {email, verificationCode, name}
        )
    }

    async sendMail(email: string, subject: string, template: string, context: object = {} ): Promise<boolean>
    {

        await this.setTransport();

        this.mailerService
            .sendMail({
                transporterName: 'gmail',
                to: email,
                from: GMAIL_MAIL_USERNAME!,
                subject: subject,
                template,
                context
            })
            .catch((err) => {
                console.log(err);
            });

        return true
    }

    private async setTransport(): Promise<void>
    {
        const config: Options = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: GMAIL_MAIL_USERNAME!,
                clientId: GOOGLE_CLIENT_ID!,
                clientSecret: GOOGLE_CLIENT_SECRET!,
                accessToken: GMAIL_ACCESS_TOKEN!,
                refreshToken: GMAIL_REFRESH_TOKEN!
            },
        };

        this.mailerService.addTransporter('gmail', config);
    }

}
