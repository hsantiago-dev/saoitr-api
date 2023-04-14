import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UseCase } from "src/core/base/use-case";
import { UserLoggedMapper } from "src/core/domain/mappers/user-logged.mapper";
import { ContributorRepository } from "src/core/repositories/contributor.repository";
import { LoginDto } from "src/shared/login.dto";
import { UserLoggedDto } from "src/shared/user-logged.dto";

@Injectable()
export class SignInUseCase implements UseCase<UserLoggedDto> {

    private userLoggedMapper: UserLoggedMapper;

    constructor(
        private readonly repository: ContributorRepository
        ,   private readonly jwtService: JwtService
    ) {
        this.userLoggedMapper = new UserLoggedMapper();
    }

    public async execute(login: LoginDto): Promise<UserLoggedDto> {
        const user = await this.repository.getOne({ email: login.email });

        if (!user || user.password !== login.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id };

        const userLogged = this.userLoggedMapper.mapTo(user);

        userLogged.token = await this.jwtService.signAsync(payload);

        return userLogged;
    }
}