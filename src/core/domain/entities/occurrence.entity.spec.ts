import { OccurrenceEntity } from "./occurrence.entity";

describe('OccurrenceEntity', () => {

    it('should be defined', () => {
        const setup = {
            date: "2020-01-01",
            time: "10:00",
            local: "Local",
            occurrenceType: 1,
            km: 100,
            contributorId: 1
        }
        
        const occurrence = new OccurrenceEntity(setup);
        
        expect(occurrence).toBeDefined();
        expect(occurrence.date).toBe("2020-01-01");
        expect(occurrence.occurrenceType).toBe(1);
    });

    it('should throw error when date is not provided', () => {
        const setup = {
            time: "10:00",
            local: "Local",
            occurrenceType: 1,
            km: 100,
            contributorId: 1
        }

        expect(() => new OccurrenceEntity(setup)).toThrowError("Date is required");
    });
});