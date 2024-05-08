import * as dotenv from 'dotenv';
dotenv.config();
import { Client } from 'pg'

export const client = new Client({
    connectionString: process.env.DB_URL
});
