

export class OccurrenceCreateDto {
    date: string;
    time: string;
    local: string;
    occurrence_type: string;
    km: number;
    user_id: number;

    constructor(data: Partial<OccurrenceCreateDto>) {
        Object.assign(this, data);
    }
}