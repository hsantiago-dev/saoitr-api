import { Body, Controller, Get, Post, HttpException, HttpStatus } from "@nestjs/common";
import { OccurrenceCreateDto } from "src/shared/occurrence-create.dto";
import { OccurrenceCreatedDto } from "src/shared/occurrence-created.dto";
import { CreateOcurrenceUseCase } from "src/use-cases/occurrence/create-occurrence.usecase";
import { GetAllOccurrencesUseCase } from "src/use-cases/occurrence/get-all-occurrences.usecase";

@Controller('/occurrences')
export class OccurrenceController {
    constructor(
        private readonly createOccurrenceUseCase: CreateOcurrenceUseCase,
        private readonly getAllOccurrencesUseCase: GetAllOccurrencesUseCase,
    ) {}

    @Post()
    async create(@Body() body: Required<OccurrenceCreateDto>): Promise<OccurrenceCreatedDto> {

        try {

            return await this.createOccurrenceUseCase.execute(body);
        } catch (error) {
            
            if (error.message.includes('is required') || error.message.includes('is invalid'))
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getAll(): Promise<any[]> {
        return await this.getAllOccurrencesUseCase.execute();
    }
}