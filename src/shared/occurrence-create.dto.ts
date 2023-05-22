
export class OccurrenceCreateDto {
    date: string;
    time: string;
    local: string;
    occurrence_type: number;
    km: number;
    user_id: number;

    constructor(data: Partial<OccurrenceCreateDto>) {
        Object.assign(this, data);
    }
}