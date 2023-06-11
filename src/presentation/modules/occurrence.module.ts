import { Module } from '@nestjs/common';
import { OccurrenceController } from '../occurrence.controller';
import { OccurrenceRepository } from 'src/core/repositories/occurrence.repository';
import { CreateOcurrenceUseCase } from 'src/use-cases/occurrence/create-occurrence.usecase';
import { GetAllOccurrencesUseCase } from 'src/use-cases/occurrence/get-all-occurrences.usecase';
import { UpdateOcurrenceUseCase } from 'src/use-cases/occurrence/update-occurrence.usecase';
import { OccurrencePrismaRepository } from 'src/data/remote/occurrence-prisma.repository';
import { PrismaService } from 'src/infra/service/prisma.service';
import { GetOccurrencesByUserUseCase } from 'src/use-cases/occurrence/get-occurrences-by-user.usecase';

@Module({
    imports: [],
    controllers: [OccurrenceController],
    providers: [
        PrismaService,
        {
            provide: OccurrenceRepository,
            useClass: OccurrencePrismaRepository,
        },
        CreateOcurrenceUseCase,
        GetAllOccurrencesUseCase,
        UpdateOcurrenceUseCase,
        GetOccurrencesByUserUseCase,
    ],
})
export class OccurrenceModule {}
