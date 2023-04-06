
export class ContributorCreatedDto {
    id: number;
    name: string;
    email: string;

    constructor(data: Partial<ContributorCreatedDto>) {
        Object.assign(this, data);
    }
}