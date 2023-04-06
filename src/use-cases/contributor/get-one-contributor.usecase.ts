import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { ContributorCreatedMapper } from "src/core/domain/mappers/contributor-created.mapper";
import { ContributorRepository } from "src/core/repositories/contributor.repository";
import { ContributorCreatedDto } from "src/shared/contributor-created.dto";

@Injectable()
export class GetOneContributorUseCase implements UseCase<ContributorCreatedDto> {

    private contributorCreatedMapper: ContributorCreatedMapper;

    constructor(private readonly repository: ContributorRepository) {
        this.contributorCreatedMapper = new ContributorCreatedMapper();
    }

    public async execute(id: string): Promise<ContributorCreatedDto> {
        const contributor = await this.repository.getById(parseInt(id));

        if (!contributor)
            throw new Error('User not found');

        return this.contributorCreatedMapper.mapTo(contributor);
    }
}