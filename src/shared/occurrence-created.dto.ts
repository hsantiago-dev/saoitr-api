
export class OccurrenceCreatedDto {
    id: number;
    date: string;
    time: string;
    local: string;
    occurrence_type: number;
    km: number;
    user_id: number;

    constructor(data: Partial<OccurrenceCreatedDto>) {
        Object.assign(this, data);
    }
}