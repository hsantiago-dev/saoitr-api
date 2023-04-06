import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { ContributorCreateMapper } from "src/core/domain/mappers/contributor-create.mapper";
import { ContributorCreatedMapper } from "src/core/domain/mappers/contributor-created.mapper";
import { ContributorRepository } from "src/core/repositories/contributor.repository";
import { ContributorCreateDto } from "src/shared/contributor-create.dto";
import { ContributorCreatedDto } from "src/shared/contributor-created.dto";

@Injectable()
export class UpdateContributorUseCase implements UseCase<ContributorCreatedDto>{

    private contributorCreateMapper: ContributorCreateMapper;
    private contributorCreatedMapper: ContributorCreatedMapper;

    constructor(private readonly repository: ContributorRepository) {
        this.contributorCreateMapper = new ContributorCreateMapper();
        this.contributorCreatedMapper = new ContributorCreatedMapper();
    }

    public async execute(id: string, contributor: ContributorCreateDto): Promise<ContributorCreatedDto> {
        let entity = this.contributorCreateMapper.mapFrom(contributor);

        const updated = await this.repository.update(parseInt(id), entity);

        return this.contributorCreatedMapper.mapTo(updated);
    }
}