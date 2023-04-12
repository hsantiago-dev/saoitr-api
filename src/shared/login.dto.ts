
export class LoginDto {
    email: string;
    password: string;

    constructor(data: Required<LoginDto>) {
        Object.assign(this, data);
    }
}