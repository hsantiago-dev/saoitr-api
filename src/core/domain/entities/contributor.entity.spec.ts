import { ContributorEntity } from "./contributor.entity";

describe('ContributorEntity', () => {

    it('should be fail invalid password', () => {
        const setup = {
            name: 'test'
            , email:  'test@mail.com'
            , password: '1234567890123456789012345789012'
        }

        expect(() => {new ContributorEntity(setup)}).toThrow("Password is invalid");
    });

    it('should be fail invalid name', () => {
        const setup = {
            name: 't'
            , email: 'test@mail.com'
            , password: '12345678901234567890123456789012'
        }

        expect(() => {new ContributorEntity(setup)}).toThrow("Name is invalid");
    })

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
            , email: 'test@mail.com'
            , password: '12345678901234567890123456789012'
        }

        expect(new ContributorEntity(setup)).toBeDefined();
    });
});