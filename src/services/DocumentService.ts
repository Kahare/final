import sql from 'mssql';
import { Document } from '../models/documentModel';
import { database } from '../utils/db';

export const createDocument = async (document: Document): Promise<Document> =>
{
    const pool = await database.connect();
    const result = await pool.request()
        .input('title', sql.NVarChar, document.title)
        .input('document', sql.NVarChar, document.document)
        .input('createdBy', sql.Int, document.createdBy)
        .query(`
            INSERT INTO Documents (title, document, createdBy)
            VALUES (@title, @document, @createdBy);
            SELECT * FROM Documents WHERE id = SCOPE_IDENTITY();
        `);
    return result.recordset[0];
};

export const getDocuments = async (): Promise<Document[]> =>
{
    const pool = await database.connect();
    const result = await pool.request().query('SELECT * FROM Documents');
    return result.recordset;
};

export const getDocumentById = async (id: number): Promise<Document | null> =>
{
    const pool = await database.connect();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Documents WHERE id = @id');
    return result.recordset[0] || null;
};

export const updateDocument = async (id: number, document: Partial<Document>): Promise<void> =>
{
    const pool = await database.connect();
    await pool.request()
        .input('id', sql.Int, id)
        .input('title', sql.NVarChar, document.title)
        .input('document', sql.NVarChar, document.document)
        .query(`
            UPDATE Documents
            SET title = ISNULL(@title, title),
                document = ISNULL(@document, document)
            WHERE id = @id
        `);
};

export const deleteDocument = async (id: number): Promise<void> =>
{
    const pool = await database.connect();
    await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Documents WHERE id = @id');
};
