import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import { Options } from 'nodemailer/lib/smtp-transport';
import * as process from "process";

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {
        
    }

    async sendPasswordResetLink(code: string, email: string, name: String){

        const link = `${process.env.APP_NAME}://${code}`

        return this.sendMail(
            email,
            "[Montra] Reset Password",
            'reset-password',
            {name, email, link}
        )
    }

    async sendVerificationCode(verificationCode: string, email: string, firstName: String){
        return this.sendMail(
            email,
            "[Montra] Email Verification",
            'verification',
            {email, verificationCode}
        )
    }

    async sendMail(email: string, subject: string, template: string, context = {} ) {

        await this.setTransport();

        this.mailerService
            .sendMail({
                transporterName: 'gmail',
                to: email,
                from: process.env.MAIL_USERNAME,
                subject: subject,
                template,
                context
            })
            .catch((err) => {
                console.log(err);
            });

        return true
    }

    private async setTransport() {
        const config: Options = {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                accessToken: process.env.ACCESS_TOKEN,
                refreshToken: process.env.REFRESH_TOKEN,
            },
        };

        this.mailerService.addTransporter('gmail', config);
    }
    
}
