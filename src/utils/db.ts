import dotenv from 'dotenv';
dotenv.config();

import * as db from 'mssql';



const connectionString = `Server=tcp:myclouddbserver.database.windows.net,1433;Initial Catalog=citizenconnectdb;Persist Security Info=False;User ID=JesseJason;Password=Alpha@1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`;

export const database = new db.ConnectionPool(connectionString);

export async function connectDB(): Promise<void>
{
    try
    {
        await database.connect();
        console.log('Database connected');
    } catch (err)
    {
        console.error('Database connection failed', err);
    }
}

export default db;