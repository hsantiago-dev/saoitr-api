import { Injectable } from '@nestjs/common';

@Injectable()
export class BlackListService {

    private blackList: string[] = [];

    async addToken(token: string) {
        console.log('addToken', token);
        this.blackList.push(token);
    }

    async isTokenBlackListed(token: string): Promise<boolean> {
        return this.blackList.includes(token);
    }
}