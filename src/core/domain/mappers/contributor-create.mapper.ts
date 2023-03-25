import { Mapper } from "src/core/base/mapper";
import { ContributorCreateDto } from "src/shared/contributor-create.dto";
import { ContributorEntity } from "../entities/contributor.entity";


export class ContributorCreateMapper extends Mapper<ContributorCreateDto, ContributorEntity> {

    public mapFrom(param: ContributorCreateDto): ContributorEntity {

        const contributor = new ContributorEntity({
            name: param.name
            , email: param.email
            , password: param.password
        });

        return contributor;
    }

    public mapTo(param: ContributorEntity): ContributorCreateDto {
            
        const contributor = new ContributorCreateDto({
            name: param.name
            , email: param.email
            , password: param.password
        });

        return contributor;
    }
}