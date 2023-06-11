import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { ContributorRepository } from "src/core/repositories/contributor.repository";

@Injectable()
export class DeleteContributorUseCase implements UseCase<void>{

    constructor(private readonly repository: ContributorRepository) { }

    public async execute(id: number): Promise<void> {

        await this.repository.delete(id)
        return;
    }
}