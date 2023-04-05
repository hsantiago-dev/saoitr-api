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

        this.validateEmail(data);
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