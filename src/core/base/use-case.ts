// src/core/base/use-case.ts

export interface UseCase<TModel> {
    execute(...args: any[]): Promise<TModel>;
}