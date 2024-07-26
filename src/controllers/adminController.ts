import { Request, Response } from 'express';
import { registerUser } from '../services/authService';
import { database } from '../utils/db';
import sql from 'mssql';

const handleError = (err: unknown): string =>
{
    if (err instanceof Error)
    {
        return err.message;
    }
    return String(err);
};

export const addUser = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { firstName, lastName, username, email, password, role, isApproved } = req.body;
        const user = await registerUser(firstName, lastName, username, email, password, role, isApproved);
        res.status(201).json(user);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const approveUser = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { userId } = req.body;
        await database.request()
            .input('userId', sql.Int, userId)
            .query('UPDATE Users SET isApproved = 1 WHERE id = @userId');
        res.status(200).json({ message: 'User approved' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};
