import { Mapper } from "src/core/base/mapper";
import { ContributorCreatedDto } from "src/shared/contributor-created.dto";
import { ContributorEntity } from "../entities/contributor.entity";

export class ContributorCreatedMapper extends Mapper<ContributorCreatedDto, ContributorEntity> {

    public mapFrom(param: ContributorCreatedDto): ContributorEntity {

        const contributor = new ContributorEntity({
            id: param.id
            , name: param.name
        });

        return contributor;
    }

    public mapTo(param: ContributorEntity): ContributorCreatedDto {
            
        const contributor = new ContributorCreatedDto({
            id: param.id
            , name: param.name
        });

        return contributor;
    }
}