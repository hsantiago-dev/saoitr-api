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

        console.log('\n\n----------------------------------------------------------');
        
        try {

            console.log('Login...');
            console.log('Recebido:');
            console.log(body);

            const userLogged = await this.signInUseCase.execute(body);

            console.log('Retorno 200:');
            console.log(userLogged);

            return userLogged;
        } catch (error) {
            if (error.message.includes('Invalid')) {
                console.log(HttpStatus.UNAUTHORIZED + ' - ' + error.message); 
                throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
            }

            console.log(HttpStatus.INTERNAL_SERVER_ERROR + ' - ' + error.message); 
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard, BlackListGuard)
    @Post('/logout')
    async signOut(@Body() body: LogoutBody, @UserId() userIdToken: number, @Headers() headers?: string): Promise<void> {

        console.log('\n\n----------------------------------------------------------');

        if (userIdToken !== body.id) {
            console.log(HttpStatus.BAD_REQUEST + ' - Invalid user id'); 
            throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
        }

        console.log('Logout...');
        console.log('Recebido:');
        console.log(body);

        try {

            const authorization = headers['authorization'];

            return await this.signOutUseCase.execute(authorization);
        } catch (error) {

            console.log(HttpStatus.INTERNAL_SERVER_ERROR + ' - ' + error.message); 
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

type LogoutBody = {
    id: number;
}