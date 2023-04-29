import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { BlackListService } from '../service/black-list.service';
  
@Injectable()
export class BlackListGuard implements CanActivate {
    constructor(private blackListService: BlackListService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (await this.blackListService.isTokenBlackListed(token)) {
            throw new UnauthorizedException();
        }

        return true;
    }
}