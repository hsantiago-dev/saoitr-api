import { Body, Controller, Post, HttpException, HttpStatus, HttpCode } from "@nestjs/common";
import { LoginDto } from "src/shared/login.dto";
import { UserLoggedDto } from "src/shared/user-logged.dto";
import { SignInUseCase } from "src/use-cases/contributor/sign-in.usecase";

@Controller('/')
export class AuthenticationController {
    constructor(
        private readonly signInUseCase: SignInUseCase
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async signIn(@Body() body: LoginDto): Promise<UserLoggedDto> {

        try {

            return await this.signInUseCase.execute(body);
        } catch (error) {
            if (error.message.includes('is required') || error.message.includes('is invalid'))
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}