import { Module } from '@nestjs/common';
import { OccurrenceController } from '../occurrence.controller';
import { OccurrenceRepository } from 'src/core/repositories/occurrence.repository';
import { OccurrenceInMemoryRepository } from 'src/data/in-memory/occurrence-in-memory.repository';
import { CreateOcurrenceUseCase } from 'src/use-cases/occurrence/create-occurrence.usecase';
import { GetAllOccurrencesUseCase } from 'src/use-cases/occurrence/get-all-occurrences.usecase';
import { UpdateOcurrenceUseCase } from 'src/use-cases/occurrence/update-occurrence.usecase';

@Module({
    imports: [],
    controllers: [OccurrenceController],
    providers: [
        {
            provide: OccurrenceRepository,
            useClass: OccurrenceInMemoryRepository,
        },
        CreateOcurrenceUseCase,
        GetAllOccurrencesUseCase,
        UpdateOcurrenceUseCase
    ],
})
export class OccurrenceModule {}
