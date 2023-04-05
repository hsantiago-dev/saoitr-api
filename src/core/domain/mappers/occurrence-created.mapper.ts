import { Mapper } from "src/core/base/mapper";
import { OccurrenceEntity } from "../entities/occurrence.entity";
import { OccurrenceCreatedDto } from "src/shared/occurrence-created.dto";

export class OccurrenceCreatedMapper extends Mapper<OccurrenceCreatedDto, OccurrenceEntity> {
    
    public mapFrom(param: OccurrenceCreatedDto): OccurrenceEntity {
        
        const occurrence = new OccurrenceEntity({
            id: param.id,
            date: param.date,
            time: param.time,
            local: param.local,
            km: param.km,
            occurrenceType: param.occurrence_type,
            contributorId: param.user_id
        });

        return occurrence;
    }

    public mapTo(param: OccurrenceEntity): OccurrenceCreatedDto {
            
        const occurrence = new OccurrenceCreatedDto({
            id: param.id,
            date: param.date,
            time: param.time,
            local: param.local,
            km: param.km,
            occurrence_type: param.occurrenceType,
            user_id: param.contributorId
        });

        return occurrence;
    }
}