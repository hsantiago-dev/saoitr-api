import { Body, Controller, Get, Post, Param, HttpException, HttpStatus, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/infra/auth/auth.guard";
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

        try {

            return await this.createContributorUseCase.execute(body);
        } catch (error) {
            if (error.message.includes('is required') || error.message.includes('is invalid'))
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(AuthGuard)
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

        try {

            return await this.updateContributorUseCase.execute(id, body);
        } catch (error) {
            if (error.message.includes('is required') || error.message.includes('is invalid'))
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //TODO implement delete
}