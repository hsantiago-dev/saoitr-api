
export class ContributorCreateDto {
    name: string;
    email: string;
    password: string | null;

    constructor(data: Required<ContributorCreateDto>) {
        Object.assign(this, data);
    }
}