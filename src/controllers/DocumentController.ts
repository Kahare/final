import { Request, Response } from 'express';
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../services/DocumentService';
import { Document } from '../models/documentModel';
import path from 'path';
import fs from 'fs';
import { handleError } from '../utils/handleError';

const DOCUMENTS_DIR = 'uploads/documents'; // Directory to store uploaded documents

// Ensure the documents directory exists
if (!fs.existsSync(DOCUMENTS_DIR))
{
    fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

export const addDocument = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { title, createdBy } = req.body;
        const document = req.file?.filename;
        if (!document)
        {
            throw new Error('Document file is required');
        }
        const newDocument: Document = { title, document, createdBy };
        const result = await createDocument(newDocument);
        res.status(201).json(result);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const listDocuments = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const documents = await getDocuments();
        res.status(200).json(documents);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const getDocument = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { id } = req.params;
        const document = await getDocumentById(Number(id));
        if (!document)
        {
            res.status(404).json({ message: 'Document not found' });
            return;
        }
        const filePath = path.join(DOCUMENTS_DIR, document.document);
        res.download(filePath, document.title); // Sends the file to the client
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const updateExistingDocument = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { id } = req.params;
        const { title } = req.body;
        const document = req.file?.filename;
        const updatedDocument: Partial<Document> = { title, document };
        await updateDocument(Number(id), updatedDocument);
        res.status(200).json({ message: 'Document updated successfully' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const removeDocument = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { id } = req.params;
        const document = await getDocumentById(Number(id));
        if (!document)
        {
            res.status(404).json({ message: 'Document not found' });
            return;
        }
        const filePath = path.join(DOCUMENTS_DIR, document.document);
        fs.unlinkSync(filePath); // Remove the file from the server
        await deleteDocument(Number(id));
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};
