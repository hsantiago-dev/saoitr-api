import { Module } from '@nestjs/common';
import { ContributorRepository } from 'src/core/repositories/contributor.repository';
import { ContributorInMemoryRepository } from 'src/data/in-memory/contributor-in-memory.repository';
import { CreateContributorUseCase } from 'src/use-cases/create-contributor.usecase';
import { GetAllContributorsUseCase } from 'src/use-cases/get-all-contributors.usecase';
import { ContributorController } from '../contributor.controller';

@Module({
    imports: [],
    controllers: [ContributorController],
    providers: [
        {
            provide: ContributorRepository,
            useClass: ContributorInMemoryRepository,
        },
        CreateContributorUseCase,
        GetAllContributorsUseCase
    ],
})
export class ContributorModule {}
