import sql from 'mssql';
import { View } from '../models/viewModel';
import { database } from '../utils/db';

export const createView = async (view: View): Promise<View> =>
{
    const pool = await database.connect();
    const result = await pool.request()
        .input('image', sql.NVarChar, view.image)
        .input('title', sql.NVarChar, view.title)
        .input('description', sql.NVarChar, view.description)
        .input('createdBy', sql.Int, view.createdBy)
        .query(`
            INSERT INTO Views (image, title, description, createdBy)
            VALUES (@image, @title, @description, @createdBy);
            SELECT * FROM Views WHERE id = SCOPE_IDENTITY();
        `);
    return result.recordset[0];
};

export const getViews = async (): Promise<View[]> =>
{
    const pool = await database.connect();
    const result = await pool.request().query('SELECT * FROM Views');
    return result.recordset;
};

export const updateView = async (id: number, view: Partial<View>): Promise<void> =>
{
    const pool = await database.connect();
    await pool.request()
        .input('id', sql.Int, id)
        .input('image', sql.NVarChar, view.image)
        .input('title', sql.NVarChar, view.title)
        .input('description', sql.NVarChar, view.description)
        .query(`
            UPDATE Views
            SET image = ISNULL(@image, image),
                title = ISNULL(@title, title),
                description = ISNULL(@description, description)
            WHERE id = @id
        `);
};

export const deleteView = async (id: number): Promise<void> =>
{
    const pool = await database.connect();
    await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Views WHERE id = @id');
};
