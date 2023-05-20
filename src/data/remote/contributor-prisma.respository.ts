import { Injectable } from "@nestjs/common";
import { ContributorEntity } from "../../core/domain/entities/contributor.entity";
import { ContributorRepository } from "../../core/repositories/contributor.repository";
import { PrismaService } from "../../infra/service/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ContributorPrismaRepository implements ContributorRepository {

    constructor(private prismaService: PrismaService) { }

    async create(entity: ContributorEntity): Promise<ContributorEntity> {

        const { name, email, password } = entity;

        try {

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
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new Error("Email already exists");
                }
            }
            
            throw new Error(error);
        }
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

        const contributor = await this.prismaService.contributor.update({
            where: { id },
            data: {
                ...entity
            }
        });

        return new ContributorEntity({
            id: contributor.id
            , name: contributor.name
            , email: contributor.email
            , password: contributor.password 
        });
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