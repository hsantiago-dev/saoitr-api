import { OccurrenceEntity } from "src/core/domain/entities/occurrence.entity";
import { RepositoryInMemory } from "./repository-in-memory";
import { OccurrenceRepository } from "src/core/repositories/occurrence.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OccurrenceInMemoryRepository extends RepositoryInMemory<OccurrenceEntity> implements OccurrenceRepository { } 