import { Entity } from "../../base/entity";

export class OccurrenceEntity extends Entity {
    public date: string;
    public time: string;
    public local: string;
    public occurrenceType: number;
    public km: number;
    public contributorId: number;

    public constructor(data: Partial<OccurrenceEntity>) {
        super();

        this.validateData(data);

        Object.assign(this, data);
    }

    private validateData(data: Partial<OccurrenceEntity>): void {
        this.validateRequiredData(data);
    }

    private validateRequiredData(data: Partial<OccurrenceEntity>): void {
        if (!data.date) {
            throw new Error("Date is required");
        } else if (!data.time) {
            throw new Error("Time is required");
        } else if (!data.local) {
            throw new Error("Local is required");
        } else if (!data.occurrenceType) {
            throw new Error("Occurrence Type is required");
        } else if (!data.km) {
            throw new Error("Km is required");
        } else if (!data.contributorId) {
            throw new Error("ContributorID is required");
        } 
    }
}