import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infra/service/prisma.service";
import { Prisma } from "@prisma/client";
import { OccurrenceRepository } from "src/core/repositories/occurrence.repository";
import { OccurrenceEntity } from "src/core/domain/entities/occurrence.entity";

@Injectable()
export class OccurrencePrismaRepository implements OccurrenceRepository {

    constructor(private prismaService: PrismaService) { }

    async create(entity: OccurrenceEntity): Promise<OccurrenceEntity> {

        const { registered_at, local, occurrenceType, km, contributorId } = entity;

        try {

            const occurrence = await this.prismaService.occurrence.create({
                data: {
                    registered_at: registered_at,
                    local: local,
                    type: occurrenceType,
                    km: km, 
                    contributorId: contributorId
                }
            });

            return new OccurrenceEntity({
                id: occurrence.id
                , registered_at: occurrence.registered_at
                , local: occurrence.local
                , occurrenceType: occurrence.type
                , km: occurrence.km
                , contributorId: occurrence.contributorId
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id: number, data: OccurrenceEntity): Promise<OccurrenceEntity> {
        throw new Error("Method not implemented.");
    }

    async patch(id: number, data: Partial<OccurrenceEntity>): Promise<OccurrenceEntity> {
        throw new Error("Method not implemented.");
    }

    async getById(id: number): Promise<OccurrenceEntity> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<OccurrenceEntity[]> {
        
        try {
            const occurrences = await this.prismaService.occurrence.findMany();

            return occurrences.map(occurrence => new OccurrenceEntity({
                id: occurrence.id
                , registered_at: occurrence.registered_at
                , local: occurrence.local
                , occurrenceType: occurrence.type
                , km: occurrence.km
                , contributorId: occurrence.contributorId
            }));
        } catch (error) {
            throw new Error(error);
        }
    }

    async getOne(filter: Partial<OccurrenceEntity>): Promise<OccurrenceEntity> {
        throw new Error("Method not implemented.");
    }

    async getMany(filter: Partial<OccurrenceEntity>): Promise<OccurrenceEntity[]> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}