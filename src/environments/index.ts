import * as process from "process";

const NODE_ENV: string =  process.env.APP_NAME || "dev"

const APP_PORT: number = +process.env.APP_PORT || 3000

const APP_NAME: string = process.env.APP_NAME || "montra"

// JWT config
const JWT_SECRET: string = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "24h";
const JWT_REFRESH_EXPIRES_IN: string = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

const PASSWORD_RESET_TOKEN_LIFETIME_H: number = +process.env.PASSWORD_RESET_TOKEN_LIFETIME_H || 2

// DB config

const DATABASE_URL: string = process.env.DATABASE_URL;

// Google mail config
const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;
const GMAIL_ACCESS_TOKEN: string = process.env.GMAIL_ACCESS_TOKEN;
const GMAIL_REFRESH_TOKEN: string = process.env.GMAIL_REFRESH_TOKEN;
const GMAIL_MAIL_USERNAME: string = process.env.GMAIL_MAIL_USERNAME;
const GMAIL_MAIL_PASSWORD: string = process.env.GMAIL_MAIL_PASSWORD;

const GQL_ENDPOINT: string = process.env.GQL_ENDPOINT || "graphql"

export {
    APP_PORT,
    NODE_ENV,
    APP_NAME,
    JWT_SECRET,
    JWT_REFRESH_EXPIRES_IN,
    JWT_EXPIRES_IN,
    JWT_REFRESH_SECRET,
    PASSWORD_RESET_TOKEN_LIFETIME_H,
    DATABASE_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GMAIL_ACCESS_TOKEN,
    GMAIL_MAIL_PASSWORD,
    GMAIL_MAIL_USERNAME,
    GMAIL_REFRESH_TOKEN,
    GQL_ENDPOINT
}