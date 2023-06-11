import { Injectable } from "@nestjs/common";
import { UseCase } from "src/core/base/use-case";
import { OccurrenceRepository } from "src/core/repositories/occurrence.repository";

@Injectable()
export class DeleteOccurrenceUseCase implements UseCase<void> {

    constructor(private readonly repository: OccurrenceRepository) { }
    
    public async execute(id: number): Promise<void> {

        await this.repository.delete(id)
        return;
    }
}