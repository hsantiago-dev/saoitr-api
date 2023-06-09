import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { ContributorCreateMapper } from "src/core/domain/mappers/contributor-create.mapper";
import { ContributorCreatedMapper } from "src/core/domain/mappers/contributor-created.mapper";
import { ContributorRepository } from "src/core/repositories/contributor.repository";
import { ContributorCreateDto } from "src/shared/contributor-create.dto";
import { ContributorCreatedDto } from "src/shared/contributor-created.dto";

@Injectable()
export class CreateContributorUseCase implements UseCase<ContributorCreatedDto>{

    private contributorCreateMapper: ContributorCreateMapper;
    private contributorCreatedMapper: ContributorCreatedMapper;

    constructor(private readonly repository: ContributorRepository) {
        this.contributorCreateMapper = new ContributorCreateMapper();
        this.contributorCreatedMapper = new ContributorCreatedMapper();
    }

    public async execute(contributor: ContributorCreateDto): Promise<ContributorCreatedDto> {
        let entity = this.contributorCreateMapper.mapFrom(contributor);

        const created = await this.repository.create(entity)

        return this.contributorCreatedMapper.mapTo(created);
    }
}