
export class OccurrenceCreatedDto {
    id: number;
    registered_at: string;
    local: string;
    occurrence_type: number;
    km: number;
    user_id: number;

    constructor(data: Partial<OccurrenceCreatedDto>) {
        Object.assign(this, data);
    }
}