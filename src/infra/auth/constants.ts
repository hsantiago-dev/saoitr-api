import { load } from 'ts-dotenv';

const env = load({
    SECRET_KEY: String,
});

export const jwtConstants = {
    secret: env.SECRET_KEY,
};