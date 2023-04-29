import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { BlackListService } from "src/infra/service/black-list.service";

@Injectable()
export class SignOutUseCase implements UseCase<void> {


    constructor(
        private readonly blackListService: BlackListService
    ) { }

    public async execute(token: string): Promise<void> {
        
        this.blackListService.addToken(token);
    }
}