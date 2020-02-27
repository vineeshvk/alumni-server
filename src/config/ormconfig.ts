import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { Alumni } from '../models/alumni';
import { Feed } from '../models/feed';

dotenv.config();

const {
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_TYPE,
    DB_HOST,
} = process.env;

const dev = {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
};

const deploy = {
    url: process.env.DATABASE_URL,
    extra: { ssl: true },
};

const config = process.env.DATABASE_URL ? deploy : dev;

export const dbconfig: ConnectionOptions = {
    ...config,
    //@ts-ignore
    type: DB_TYPE,
    synchronize: true,
    entities: [Alumni,Feed],
    cli: {
        entitiesDir: '../models',
    },
};
