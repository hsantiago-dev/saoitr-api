import { Body, Controller, Post, HttpException, HttpStatus, HttpCode, Headers, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { BlackListGuard } from "src/infra/auth/black-list.guard";
import { UserId } from "src/infra/decorators/user-id.decorator";
import { LoginDto } from "src/shared/login.dto";
import { UserLoggedDto } from "src/shared/user-logged.dto";
import { SignInUseCase } from "src/use-cases/contributor/sign-in.usecase";
import { SignOutUseCase } from "src/use-cases/contributor/sign-out.usecase";

@Controller('/')
export class AuthenticationController {
    constructor(
        private readonly signInUseCase: SignInUseCase,
        private readonly signOutUseCase: SignOutUseCase
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async signIn(@Body() body: LoginDto): Promise<UserLoggedDto> {

        try {

            return await this.signInUseCase.execute(body);
        } catch (error) {
            if (error.message.includes('Invalid'))
                throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard, BlackListGuard)
    @Post('/logout')
    async signOut(@Body() body: LogoutBody, @UserId() userIdToken: number, @Headers() headers?: string): Promise<void> {

        if (userIdToken !== body.id)
            throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);

        try {

            const authorization = headers['authorization'];

            return await this.signOutUseCase.execute(authorization);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

type LogoutBody = {
    id: number;
}