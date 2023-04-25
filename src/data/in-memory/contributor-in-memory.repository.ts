import { Injectable } from "@nestjs/common";
import { ContributorEntity } from "../../core/domain/entities/contributor.entity";
import { ContributorRepository } from "../../core/repositories/contributor.repository";
import { RepositoryInMemory } from "./repository-in-memory";

@Injectable()
export class ContributorInMemoryRepository extends RepositoryInMemory<ContributorEntity> implements ContributorRepository { }