import { Entity } from "../../base/entity";

export class ContributorEntity extends Entity {
    public name: string;
    public password: string;
    public email: string;

    public constructor(data: Partial<ContributorEntity>) {
        super();

        this.validateFields(data);

        Object.assign(this, data);
    }

    private validateFields(data: Partial<ContributorEntity>): void {

        this.validateRequiredFields(data);
        this.validateLengthFields(data);
        this.validateEmail(data);
    }

    private validateLengthFields(data: Partial<ContributorEntity>): void {
        if (data.name.length < 2 || data.name.length > 125) {
            throw new Error("Name is invalid");
        } else if (data.email.length < 10 || data.email.length > 125) {
            throw new Error("Email is invalid");
        } else if (data.password.length != 32) { // MD5
            throw new Error("Password is invalid");
        }
    }

    private validateRequiredFields(data: Partial<ContributorEntity>): void {
        if (!data.name) {
            throw new Error("Name is required");
        } else if (!data.password) {
            throw new Error("Password is required");
        } else if (!data.email) {
            throw new Error("Email is required");
        }
    }

    private validateEmail(data: Partial<ContributorEntity>): void {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(data.email)) {
            throw new Error("Email is invalid");
        }
    }
}