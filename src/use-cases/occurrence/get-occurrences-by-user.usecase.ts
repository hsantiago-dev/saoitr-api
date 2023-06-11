import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { OccurrenceCreatedMapper } from "src/core/domain/mappers/occurrence-created.mapper";
import { OccurrenceRepository } from "src/core/repositories/occurrence.repository";
import { OccurrenceCreatedDto } from "src/shared/occurrence-created.dto";

@Injectable()
export class GetOccurrencesByUserUseCase implements UseCase<OccurrenceCreatedDto[]> {

    private occurrenceCreatedMapper: OccurrenceCreatedMapper;

    constructor(private readonly repository: OccurrenceRepository) {
        this.occurrenceCreatedMapper = new OccurrenceCreatedMapper();
    }

    public async execute(userId: number): Promise<OccurrenceCreatedDto[]> {
        const occurrences = await this.repository.getMany({ contributorId: userId });

        return occurrences.map(this.occurrenceCreatedMapper.mapTo);
    }
}