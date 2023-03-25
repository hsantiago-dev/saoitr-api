
export class ContributorCreatedDto {
    id: number;
    name: string;

    constructor(data: Partial<ContributorCreatedDto>) {
        Object.assign(this, data);
    }
}