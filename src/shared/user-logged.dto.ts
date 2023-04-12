
export class UserLoggedDto {
    id: number;
    name: string;
    email: string;
    token: string;

    constructor(data: Partial<UserLoggedDto>) {
        Object.assign(this, data);
    }
}