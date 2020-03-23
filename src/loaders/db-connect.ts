import { Connection, createConnection } from 'typeorm';
import { dbconfig } from '../config/ormconfig';

export class DBConnection {
    static connection: Connection;

    static async getConnection() {
        try {
            if (!this.connection) {
                this.connection = await createConnection(dbconfig);
                console.log('🗄️ database connected 🗄️');
            }

            return this.connection;
        } catch (error) {
            console.log('- database error -' + error);
            return null;
        }
    }
}
