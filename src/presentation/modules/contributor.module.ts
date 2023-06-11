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
import { ContributorPrismaRepository } from 'src/data/remote/contributor-prisma.respository';
import { PrismaService } from 'src/infra/service/prisma.service';
import { SignOutUseCase } from 'src/use-cases/contributor/sign-out.usecase';
import { BlackListService } from 'src/infra/service/black-list.service';
import { DeleteContributorUseCase } from 'src/use-cases/contributor/delete-contributor.usecase';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '5h' },
        }),
    ],
    controllers: [ContributorController, AuthenticationController],
    providers: [
        PrismaService,
        BlackListService,
        {
            provide: ContributorRepository,
            useClass: ContributorPrismaRepository,
        },
        CreateContributorUseCase,
        GetOneContributorUseCase,
        UpdateContributorUseCase,
        DeleteContributorUseCase,
        // authentication
        SignInUseCase,
        SignOutUseCase
    ],
})
export class ContributorModule {}
