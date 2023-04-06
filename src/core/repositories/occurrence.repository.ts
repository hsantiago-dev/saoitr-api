import { Repository } from "../base/repository";
import { OccurrenceEntity } from "../domain/entities/occurrence.entity";

export abstract class OccurrenceRepository extends Repository<OccurrenceEntity> { }