import { Request, Response } from 'express';
import { createIncidence, getIncidences, updateIncidence, deleteIncidence } from '../services/IncidenceService';
import { Incidence } from '../models/incidenceModel';
import { handleError } from '../utils/handleError';


export const addIncidence = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { title, description, createdBy } = req.body;
        const image = req.file?.filename;
        if (!image)
        {
            throw new Error('Image is required');
        }
        const incidence: Incidence = { image, title, description, createdBy };
        const newIncidence = await createIncidence(incidence);
        res.status(201).json(newIncidence);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const listIncidences = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const incidences = await getIncidences();
        res.status(200).json(incidences);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const updateExistingIncidence = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { id } = req.params;
        const { title, description } = req.body;
        const image = req.file?.filename;
        const incidence: Partial<Incidence> = { title, description, image };
        await updateIncidence(Number(id), incidence);
        res.status(200).json({ message: 'Incidence updated successfully' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const removeIncidence = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { id } = req.params;
        await deleteIncidence(Number(id));
        res.status(200).json({ message: 'Incidence deleted successfully' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};
