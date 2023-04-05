import { Body, Controller, Get, Post } from "@nestjs/common";
import { OccurrenceCreateDto } from "src/shared/occurrence-create.dto";
import { OccurrenceCreatedDto } from "src/shared/occurrence-created.dto";
import { CreateOcurrenceUseCase } from "src/use-cases/create-occurrence.usecase";
import { GetAllOccurrencesUseCase } from "src/use-cases/get-all-occurrences.usecase";

@Controller('/occurrences')
export class OccurrenceController {
    constructor(
        private readonly createOccurrenceUseCase: CreateOcurrenceUseCase,
        private readonly getAllOccurrencesUseCase: GetAllOccurrencesUseCase,
    ) {}

    @Post()
    async create(@Body() body: OccurrenceCreateDto): Promise<OccurrenceCreatedDto> {
        return await this.createOccurrenceUseCase.execute(body);
    }

    @Get()
    async getAll(): Promise<any[]> {
        return await this.getAllOccurrencesUseCase.execute();
    }
}