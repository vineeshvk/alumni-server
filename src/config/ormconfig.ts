import { ConnectionOptions } from 'typeorm';
import { Alumni } from '../models/alumni';


const dev = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'alumni',
};

const deploy = {
  url: process.env.DATABASE_URL,
  extra: { ssl: true },
};

const config = process.env.DATABASE_URL ? deploy : dev;

export const dbconfig: ConnectionOptions = {
  ...config,
  type: 'mysql',
  synchronize: true,
  entities: [Alumni],
  cli: {
    entitiesDir: '../models',
  },
};