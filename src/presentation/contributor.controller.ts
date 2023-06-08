import { Body, Controller, Get, Post, Param, HttpException, HttpStatus, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { BlackListGuard } from "src/infra/auth/black-list.guard";
import { ContributorCreateDto } from "src/shared/contributor-create.dto";
import { ContributorCreatedDto } from "src/shared/contributor-created.dto";
import { CreateContributorUseCase } from "src/use-cases/contributor/create-contributor.usecase";
import { GetOneContributorUseCase } from "src/use-cases/contributor/get-one-contributor.usecase";
import { UpdateContributorUseCase } from "src/use-cases/contributor/update-contributor.usecase";

@Controller('/users')
export class ContributorController {
    constructor(
        private readonly createContributorUseCase: CreateContributorUseCase,
        private readonly getOneContributorUseCase: GetOneContributorUseCase,
        private readonly updateContributorUseCase: UpdateContributorUseCase
    ) {}

    @Post()
    async create(@Body() body: ContributorCreateDto): Promise<ContributorCreatedDto> {

        console.log('\n\n----------------------------------------------------------');
        try {

            console.log('Criando usuário...');
            console.log('Recebido:');
            console.log(body);

            const contributor = await this.createContributorUseCase.execute(body);

            console.log('Retorno 200:');
            console.log(contributor);
            return contributor;
        } catch (error) {
            if (
                error.message.includes('is required') 
                || error.message.includes('is invalid')
            ) {

                console.log(HttpStatus.BAD_REQUEST + ' - ' + error.message); 
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
            else if (error.message.includes('already exists')) {
                console.log(HttpStatus.UNPROCESSABLE_ENTITY + ' - ' + error.message); 
                throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
            }

            console.log(HttpStatus.INTERNAL_SERVER_ERROR + ' - ' + error.message); 
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard, BlackListGuard)
    @Get('/:userId')
    async getOneUser(@Param('userId') id: string): Promise<ContributorCreatedDto> {

        try {

            return await this.getOneContributorUseCase.execute(id);
        } catch (error) {
            if (error.message.includes('not found'))
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard)
    @Put('/:userId')
    async update(@Param('userId') id: string, @Body() body: ContributorCreateDto): Promise<ContributorCreatedDto> {

        console.log('\n\n----------------------------------------------------------');
        console.log('Atualizar usuário...');
        console.log('Recebido:');
        console.log('ID ' + id);
        console.log(body);

        try {

            const contributor =  await this.updateContributorUseCase.execute(id, body);

            console.log('Retorno 200:');
            console.log(contributor);

            return contributor;
        } catch (error) {
            if (error.message.includes('is required') || error.message.includes('is invalid')) {

                console.log(HttpStatus.BAD_REQUEST + ' - ' + error.message);
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }

            console.log(HttpStatus.INTERNAL_SERVER_ERROR + ' - ' + error.message);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //TODO implement delete
}