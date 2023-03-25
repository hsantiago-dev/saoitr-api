
export class ContributorCreateDto {
    name: string;
    email: string;
    password: string;

    constructor(data: Partial<ContributorCreateDto>) {
        Object.assign(this, data);
    }
}