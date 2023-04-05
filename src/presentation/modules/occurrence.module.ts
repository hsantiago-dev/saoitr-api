import { Module } from '@nestjs/common';
import { OccurrenceController } from '../occurrence.controller';
import { OccurrenceRepository } from 'src/core/repositories/occurrence.repository';
import { OccurrenceInMemoryRepository } from 'src/data/in-memory/occurrence-in-memory.repository';
import { CreateOcurrenceUseCase } from 'src/use-cases/create-occurrence.usecase';
import { GetAllOccurrencesUseCase } from 'src/use-cases/get-all-occurrences.usecase';

@Module({
    imports: [],
    controllers: [OccurrenceController],
    providers: [
        {
            provide: OccurrenceRepository,
            useClass: OccurrenceInMemoryRepository,
        },
        CreateOcurrenceUseCase,
        GetAllOccurrencesUseCase
    ],
})
export class OccurrenceModule {}
