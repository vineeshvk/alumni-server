import { createConnection } from 'typeorm';
import { dbconfig } from '../config/ormconfig';

export async function connectDB() {
    let retry = 10;
    while (retry !== 0) {
        try {
            await createConnection(dbconfig);
            console.log('🗄️ database connected 🗄️');
            break;
        } catch (e) {
            retry--;
            console.log(e);
            console.log(`${retry} retries remaining`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
}
