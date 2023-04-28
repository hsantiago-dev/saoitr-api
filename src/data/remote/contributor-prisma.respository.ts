import { Injectable } from "@nestjs/common";
import { ContributorEntity } from "../../core/domain/entities/contributor.entity";
import { ContributorRepository } from "../../core/repositories/contributor.repository";
import { PrismaService } from "../../infra/service/prisma.service";

@Injectable()
export class ContributorPrismaRepository implements ContributorRepository {

    constructor(private prismaService: PrismaService) { }

    async create(entity: ContributorEntity): Promise<ContributorEntity> {

        const { name, email, password } = entity;

        const contributor = await this.prismaService.contributor.create({
            data: {
                name,
                email,
                password
            }
        });

        return new ContributorEntity({
            id: contributor.id
            , name: contributor.name
            , email: contributor.email
            , password: contributor.password 
        });
    }

    async update(id: number, entity: ContributorEntity): Promise<ContributorEntity> {

        const { name, email, password } = entity;

        const contributor = await this.prismaService.contributor.update({
            where: { id },
            data: {
                name,
                email,
                password
            }
        });

        return new ContributorEntity({
            id: contributor.id
            , name: contributor.name
            , email: contributor.email
            , password: contributor.password 
        });
    }

    async patch(id: number, entity: Partial<ContributorEntity>): Promise<ContributorEntity> {

        throw new Error("Method not implemented.");
    }

    async getById(id: number): Promise<ContributorEntity> {
        
        const contributor = await this.prismaService.contributor.findUnique({
            where: { id }
        });

        return new ContributorEntity({
            id: contributor.id
            , name: contributor.name
            , email: contributor.email
            , password: contributor.password 
        });
    }

    async getAll(): Promise<ContributorEntity[]> {

        const contributors = await this.prismaService.contributor.findMany();

        return contributors.map(contributor => new ContributorEntity({
            id: contributor.id
            , name: contributor.name
            , email: contributor.email
            , password: contributor.password 
        }));
    }

    async getOne(filter: Partial<ContributorEntity>): Promise<ContributorEntity> {
            
        const contributor = await this.prismaService.contributor.findFirst(
            { where: filter }
        );

        return new ContributorEntity({
            id: contributor.id
            , name: contributor.name
            , email: contributor.email
            , password: contributor.password
        });
    }

    async getMany(filter: Partial<ContributorEntity>): Promise<ContributorEntity[]> {

        const contributors = await this.prismaService.contributor.findMany(
            { where: filter }
        );

        return contributors.map(contributor => new ContributorEntity({
            id: contributor.id
            , name: contributor.name
            , email: contributor.email
            , password: contributor.password
        }));
    }

    async delete(id: number): Promise<void> {
            
        await this.prismaService.contributor.delete({
            where: { id }
        });
    }
}