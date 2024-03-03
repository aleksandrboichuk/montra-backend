import {ForbiddenException, Injectable, NestMiddleware} from "@nestjs/common";
import {API_KEY, API_KEY_HEADER_NAME} from "../environments/environments";

@Injectable()
export class ProtectionMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void): any {

        const apiKey = req.headers[API_KEY_HEADER_NAME];

        if(!apiKey || apiKey !== API_KEY){
            throw new ForbiddenException();
        }

        return next();
    }
}