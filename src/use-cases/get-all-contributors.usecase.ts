import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { ContributorCreatedMapper } from "src/core/domain/mappers/contributor-created.mapper";
import { ContributorRepository } from "src/core/repositories/contributor.repository";
import { ContributorCreatedDto } from "src/shared/contributor-created.dto";

@Injectable()
export class GetAllContributorsUseCase implements UseCase<ContributorCreatedDto[]> {

    private contributorCreatedMapper: ContributorCreatedMapper;

    constructor(private readonly repository: ContributorRepository) {
        this.contributorCreatedMapper = new ContributorCreatedMapper();
    }

    public async execute(): Promise<ContributorCreatedDto[]> {
        const contributors = await this.repository.getAll();

        return contributors.map(this.contributorCreatedMapper.mapTo);
    }
}