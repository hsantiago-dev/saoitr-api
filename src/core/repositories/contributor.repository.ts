import { Repository } from "../base/repository";
import { ContributorEntity } from "../domain/entities/contributor.entity";

export abstract class ContributorRepository extends Repository<ContributorEntity> { }