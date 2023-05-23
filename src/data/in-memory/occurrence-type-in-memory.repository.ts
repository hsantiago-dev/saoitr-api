import { OccurrenceTypeEntity } from "../../core/domain/entities/occurrence-type.entity";
import { RepositoryInMemory } from "./repository-in-memory";
import { Injectable } from "@nestjs/common";
import { OccurrenceTypeRepository } from "src/core/repositories/occurrence-type.repository";

@Injectable()
export class OccurrenceTypeInMemoryRepository extends RepositoryInMemory<OccurrenceTypeEntity> implements OccurrenceTypeRepository<OccurrenceTypeEntity> { 
    
    constructor() {
        super();
        this.create(new OccurrenceTypeEntity({ id: 1, name: 'Acidente de trânsito' }));
    }
} 