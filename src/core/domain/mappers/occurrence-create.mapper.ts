import { Mapper } from "src/core/base/mapper";
import { OccurrenceEntity } from "../entities/occurrence.entity";
import { OccurrenceCreateDto } from "src/shared/occurrence-create.dto";

export class OccurrenceCreateMapper extends Mapper<OccurrenceCreateDto, OccurrenceEntity> {
    
    public mapFrom(param: OccurrenceCreateDto): OccurrenceEntity {
        
        const occurrence = new OccurrenceEntity({
            registered_at: param.registered_at,
            local: param.local,
            km: param.km,
            occurrenceType: param.occurrence_type,
            contributorId: param.user_id
        });

        return occurrence;
    }

    public mapTo(param: OccurrenceEntity): OccurrenceCreateDto {
            
        const occurrence = new OccurrenceCreateDto({
            registered_at: param.registered_at,
            local: param.local,
            km: param.km,
            occurrence_type: param.occurrenceType,
            user_id: param.contributorId
        });

        return occurrence;
    }
}