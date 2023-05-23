import { Entity } from "../../base/entity";

export class OccurrenceTypeEntity extends Entity {
    public name: string;

    public constructor(data: Required<OccurrenceTypeEntity>) {
        super();

        Object.assign(this, data);
    }
}