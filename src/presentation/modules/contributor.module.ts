import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ContributorRepository } from 'src/core/repositories/contributor.repository';
import { ContributorInMemoryRepository } from 'src/data/in-memory/contributor-in-memory.repository';
import { CreateContributorUseCase } from 'src/use-cases/contributor/create-contributor.usecase';
import { GetOneContributorUseCase } from 'src/use-cases/contributor/get-one-contributor.usecase';
import { ContributorController } from '../contributor.controller';
import { UpdateContributorUseCase } from 'src/use-cases/contributor/update-contributor.usecase';
import { SignInUseCase } from 'src/use-cases/contributor/sign-in.usecase';
import { AuthenticationController } from '../authentication.controller';
import { jwtConstants } from 'src/infra/auth/constants';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [ContributorController, AuthenticationController],
    providers: [
        {
            provide: ContributorRepository,
            useClass: ContributorInMemoryRepository,
        },
        CreateContributorUseCase,
        GetOneContributorUseCase,
        UpdateContributorUseCase,
        // authentication
        SignInUseCase
    ],
})
export class ContributorModule {}
