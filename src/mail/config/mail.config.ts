import {MailerOptions, MailerOptionsFactory} from "@nestjs-modules/mailer";
import {GMAIL_MAIL_PASSWORD, GMAIL_MAIL_USERNAME} from "@environments";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MailConfig implements MailerOptionsFactory
{
    createMailerOptions(): Promise<MailerOptions> | MailerOptions {
        return {
            transport: `smtps://${GMAIL_MAIL_USERNAME}:${GMAIL_MAIL_PASSWORD}@smtp.gmail.com`,
            template: {
                dir: process.cwd() + '/src/static/templates/',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }
    }
}