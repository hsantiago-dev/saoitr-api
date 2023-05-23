import { OccurrenceTypeEntity } from '../domain/entities/occurrence-type.entity';

export abstract class OccurrenceTypeRepository<OccurrenceTypeEntity> {

    abstract getAll(): Promise<OccurrenceTypeEntity[]>;
    abstract getById(id: number): Promise<OccurrenceTypeEntity>;
}