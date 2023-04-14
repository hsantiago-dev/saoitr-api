import { Body, Controller, Get, Post, HttpException, HttpStatus, Put, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/infra/auth/auth.guard";
import { OccurrenceCreateDto } from "src/shared/occurrence-create.dto";
import { OccurrenceCreatedDto } from "src/shared/occurrence-created.dto";
import { CreateOcurrenceUseCase } from "src/use-cases/occurrence/create-occurrence.usecase";
import { GetAllOccurrencesUseCase } from "src/use-cases/occurrence/get-all-occurrences.usecase";
import { UpdateOcurrenceUseCase } from "src/use-cases/occurrence/update-occurrence.usecase";

@Controller('/occurrences')
export class OccurrenceController {
    constructor(
        private readonly createOccurrenceUseCase: CreateOcurrenceUseCase,
        private readonly getAllOccurrencesUseCase: GetAllOccurrencesUseCase,
        private readonly updateOccurrenceUseCase: UpdateOcurrenceUseCase
    ) {}
    
    @UseGuards(AuthGuard)
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
    async getAll(): Promise<OccurrenceCreatedDto[]> {
        return await this.getAllOccurrencesUseCase.execute();
    }

    @UseGuards(AuthGuard)
    @Put('/:occurrenceId')
    async update(@Param('occurrenceId') id: string, @Body() body: OccurrenceCreateDto): Promise<OccurrenceCreatedDto> {
            
        try {

            return await this.updateOccurrenceUseCase.execute(id, body);
        } catch (error) {
            if (error.message.includes('is required') || error.message.includes('is invalid'))
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}