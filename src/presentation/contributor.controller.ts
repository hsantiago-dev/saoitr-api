import { Body, Controller, Get, Post } from "@nestjs/common";
import { ContributorCreateDto } from "src/shared/contributor-create.dto";
import { ContributorCreatedDto } from "src/shared/contributor-created.dto";
import { CreateContributorUseCase } from "src/use-cases/create-contributor.usecase";
import { GetAllContributorsUseCase } from "src/use-cases/get-all-contributors.usecase";

@Controller('/contributors')
export class ContributorController {
    constructor(
        private readonly createContributorUseCase: CreateContributorUseCase,
        private readonly getAllContributorsUseCase: GetAllContributorsUseCase,
    ) {}

    @Post()
    async create(@Body() body: ContributorCreateDto): Promise<ContributorCreatedDto> {
        return await this.createContributorUseCase.execute(body);
    }

    @Get()
    async getAll(): Promise<ContributorCreatedDto[]> {
        return await this.getAllContributorsUseCase.execute();
    }
}