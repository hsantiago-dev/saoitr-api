import { Injectable } from "@nestjs/common";
import { Entity } from "src/core/base/entity";
import { Repository } from "src/core/base/repository";

@Injectable()
export class RepositoryInMemory<TEntity extends Entity> extends Repository<TEntity> {

    protected readonly items: TEntity[];

    constructor() {
        super();
        this.items = [];
    }

    public create(data: TEntity): Promise<TEntity> {
        data.id = this.getNewId();

        const lenght = this.items.push(data);

        return Promise.resolve(this.items[lenght - 1]);
    }

    public update(id: number, data: TEntity): Promise<TEntity> {
        const index = this.getIndexById(id);

        if (index === -1) {
            return Promise.reject(new Error(`Entity  with id ${id} not found`));
        }

        this.items[index] = data;

        return Promise.resolve(this.items[index]);
    }

    public patch(id: number, data: Partial<TEntity>): Promise<TEntity> {
        const index = this.getIndexById(id);

        if (index === -1) {
            return Promise.reject(new Error(`Entity with id ${id} not found`));
        }

        this.items[index] = { ...this.items[index], ...data };

        return Promise.resolve(this.items[index]);
    }

    public getById(id: number): Promise<TEntity> {
        const item = this.items.find(item => item.id === id);

        return Promise.resolve(item);
    }

    public getAll(): Promise<TEntity[]> {
        return Promise.resolve(this.items);
    }

    public getMany(filter: Partial<TEntity>): Promise<TEntity[]> {
        let filtered = this.items;

        for (const key in filter) {
            filtered = filtered.filter(item => item[key] === filter[key]);
        }

        return Promise.resolve(filtered);
    }

    public delete(id: number): Promise<void> {
        const index = this.getIndexById(id);

        if (index === -1) {
            return Promise.reject(new Error(`Entity with id ${id} not found`));
        }

        this.items.splice(index, 1);

        return Promise.resolve();
    }

    private getIndexById(id: number): number {
        return this.items.findIndex(item => item.id === id);
    }

    private getNewId(): number {
        return this.items.length > 0 ? this.getLastId() + 1 : 1;
    }

    private getLastId(): number {
        return this.items.slice(-1)[0].id;
    }
}