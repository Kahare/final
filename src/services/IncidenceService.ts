import sql from 'mssql';
import { Incidence } from '../models/incidenceModel';
import { database } from '../utils/db';

export const createIncidence = async (incidence: Incidence): Promise<Incidence> =>
{
    const pool = await database.connect();
    const result = await pool.request()
        .input('image', sql.NVarChar, incidence.image)
        .input('title', sql.NVarChar, incidence.title)
        .input('description', sql.NVarChar, incidence.description)
        .input('createdBy', sql.Int, incidence.createdBy)
        .query(`
            INSERT INTO Incidences (image, title, description, createdBy)
            VALUES (@image, @title, @description, @createdBy);
            SELECT * FROM Incidences WHERE id = SCOPE_IDENTITY();
        `);
    return result.recordset[0];
};

export const getIncidences = async (): Promise<Incidence[]> =>
{
    const pool = await database.connect();
    const result = await pool.request().query('SELECT * FROM Incidences');
    return result.recordset;
};

export const updateIncidence = async (id: number, incidence: Partial<Incidence>): Promise<void> =>
{
    const pool = await database.connect();
    await pool.request()
        .input('id', sql.Int, id)
        .input('image', sql.NVarChar, incidence.image)
        .input('title', sql.NVarChar, incidence.title)
        .input('description', sql.NVarChar, incidence.description)
        .query(`
            UPDATE Incidences
            SET image = ISNULL(@image, image),
                title = ISNULL(@title, title),
                description = ISNULL(@description, description)
            WHERE id = @id
        `);
};

export const deleteIncidence = async (id: number): Promise<void> =>
{
    const pool = await database.connect();
    await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Incidences WHERE id = @id');
};
