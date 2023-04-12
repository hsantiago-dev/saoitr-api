import { Mapper } from "src/core/base/mapper";
import { ContributorCreatedDto } from "src/shared/contributor-created.dto";
import { ContributorEntity } from "../entities/contributor.entity";
import { UserLoggedDto } from "src/shared/user-logged.dto";

export class UserLoggedMapper extends Mapper<UserLoggedDto, ContributorEntity> {

    public mapFrom(param: UserLoggedDto): ContributorEntity {

        const contributor = new ContributorEntity({
            id: param.id
            , name: param.name
            , email: param.email
        });

        return contributor;
    }

    public mapTo(param: ContributorEntity): UserLoggedDto {
            
        const contributor = new UserLoggedDto({
            id: param.id
            , name: param.name
            , email: param.email
        });

        return contributor;
    }
}