import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { OccurrenceCreateMapper } from "src/core/domain/mappers/occurrence-create.mapper";
import { OccurrenceCreatedMapper } from "src/core/domain/mappers/occurrence-created.mapper";
import { OccurrenceRepository } from "src/core/repositories/occurrence.repository";
import { OccurrenceCreateDto } from "src/shared/occurrence-create.dto";
import { OccurrenceCreatedDto } from "src/shared/occurrence-created.dto";

@Injectable()
export class UpdateOcurrenceUseCase implements UseCase<OccurrenceCreatedDto> {

    private occurrenceCreateMapper: OccurrenceCreateMapper;
    private occurrenceCreatedMapper: OccurrenceCreatedMapper;

    constructor(private readonly repository: OccurrenceRepository) {
        this.occurrenceCreateMapper = new OccurrenceCreateMapper();
        this.occurrenceCreatedMapper = new OccurrenceCreatedMapper();
    }
    
    public async execute(id: number, occurrence: OccurrenceCreateDto): Promise<OccurrenceCreatedDto> {
        let entity = this.occurrenceCreateMapper.mapFrom(occurrence);

        const updated = await this.repository.update(id, entity)

        return this.occurrenceCreatedMapper.mapTo(updated);
    }
}