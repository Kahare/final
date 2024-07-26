export interface Document
{
    id?: number;
    title: string;
    document: string; // Filename or path of the uploaded document
    createdBy: number;
}
