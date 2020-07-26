import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { Alumni, College, Event } from '../models';
import { Message } from '../models/message';

dotenv.config();

const {
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_TYPE,
    DB_HOST,
} = process.env;

let docker = {
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
};

const deploy = {
    url: process.env.DATABASE_URL,
    extra: { ssl: { rejectUnauthorized: false } },
};

const config = process.env.DATABASE_URL ? deploy : docker;

export const dbconfig: ConnectionOptions = {
    ...config,
    type: 'postgres',
    dropSchema: false,
    synchronize: true,
    entities: [Alumni, Event, College, Message],
    cli: {
        entitiesDir: '../models',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};
