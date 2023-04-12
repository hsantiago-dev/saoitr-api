import { Mapper } from "src/core/base/mapper";
import { ContributorEntity } from "../entities/contributor.entity";
import { LoginDto } from "src/shared/login.dto";

export class LoginMapper extends Mapper<LoginDto, ContributorEntity> {

    public mapFrom(param: LoginDto): ContributorEntity {

        const contributor = new ContributorEntity({
            email: param.email
            , password: param.password
        });

        return contributor;
    }

    public mapTo(param: ContributorEntity): LoginDto {
            
        const contributor = new LoginDto({
            email: param.email
            , password: param.password
        });

        return contributor;
    }
}