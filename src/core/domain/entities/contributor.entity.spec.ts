import { ContributorEntity } from "./contributor.entity";

describe('ContributorEntity', () => {

    it('should be fail required password', () => {
        const setup = {
            name: 'test'
            , email: 'test@mail.com'
        }

        expect(() => {new ContributorEntity(setup)}).toThrow("Password is required");
    });
    
    it('should be fail validation email', () => {
        const setup = {
            name: 'test'
            , password: '123456'
            , email: 'test@.com'
        }

        expect(() => {new ContributorEntity(setup)}).toThrow("Email is invalid");
    });
    
    it('should be defined', () => {
        const setup = {
            name: 'test'
            , password: '123456'
            , email: 'test@mail.com'
        }

        expect(new ContributorEntity(setup)).toBeDefined();
    });
});