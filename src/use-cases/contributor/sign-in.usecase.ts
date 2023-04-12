import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { LoginMapper } from "src/core/domain/mappers/login.mapper";
import { UserLoggedMapper } from "src/core/domain/mappers/user-logged.mapper";
import { ContributorRepository } from "src/core/repositories/contributor.repository";
import { LoginDto } from "src/shared/login.dto";
import { UserLoggedDto } from "src/shared/user-logged.dto";

@Injectable()
export class SignInUseCase implements UseCase<UserLoggedDto> {

    private userLoggedMapper: UserLoggedMapper;

    constructor(private readonly repository: ContributorRepository) {
        this.userLoggedMapper = new UserLoggedMapper();
    }

    public async execute(login: LoginDto): Promise<UserLoggedDto> {
        const user = await this.repository.getOne(login);

        if (!user)
            throw new Error('User not found');

        return this.userLoggedMapper.mapTo(user);
    }
}