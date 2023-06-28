import { Entity } from "../../base/entity";

export class OccurrenceEntity extends Entity {
    public registered_at: string;
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

        this.validateRegisteredAt(data);
    }

    private validateRegisteredAt(data: Partial<OccurrenceEntity>): void {
        try {

            const now = new Date(); 
            const [date, time] = data.registered_at.split('T');
            const [year, month, day] = date.split('-');
            const [hour, minute] = time.split(':');
            const registered_at = new Date(+year, (+month - 1), +day, +hour, +minute, 0);

            console.log(registered_at);
            console.log(now);

            if (registered_at > now) {
                throw new Error("Registered at is invalid");
            }
        } catch (error) {
            throw new Error("Registered at is invalid");
        }
    }

    private validateRequiredData(data: Partial<OccurrenceEntity>): void {
        if (!data.registered_at) {
            throw new Error("Registered at is required");
        } else if (!data.local) {
            throw new Error("Local is required");
        } else if (!data.occurrenceType) {
            throw new Error("Occurrence Type is required");
        } else if (!data.km) {
            throw new Error("Km is required");
        }
    }
}