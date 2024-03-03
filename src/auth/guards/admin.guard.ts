import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {UserDto} from "../../users/dto/user.dto";

@Injectable()
export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const user: UserDto = context.switchToHttp().getRequest().user;

        if(!user || !user.admin){
            throw new ForbiddenException();
        }

        return true;
    }
}
