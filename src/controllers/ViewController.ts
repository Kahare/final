import { Request, Response } from 'express';
import { createView, getViews, updateView, deleteView } from '../services/ViewService';
import { View } from '../models/viewModel';
import { handleError } from '../utils/handleError';

export const addView = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { title, description, createdBy } = req.body;
        const image = req.file?.filename;
        if (!image)
        {
            throw new Error('Image is required');
        }
        const view: View = { image, title, description, createdBy };
        const newView = await createView(view);
        res.status(201).json(newView);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const listViews = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const views = await getViews();
        res.status(200).json(views);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const updateExistingView = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { id } = req.params;
        const { title, description } = req.body;
        const image = req.file?.filename;
        const view: Partial<View> = { title, description, image };
        await updateView(Number(id), view);
        res.status(200).json({ message: 'View updated successfully' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const removeView = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { id } = req.params;
        await deleteView(Number(id));
        res.status(200).json({ message: 'View deleted successfully' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};
