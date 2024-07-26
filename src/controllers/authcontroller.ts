import { Request, Response } from 'express';
import { registerUser, loginUser, generateResetToken, resetPassword } from '../services/authService';

const handleError = (err: unknown): string =>
{
    if (err instanceof Error)
    {
        return err.message;
    }
    return String(err);
};

export const register = async (req: Request, res: Response) =>
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

export const login = async (req: Request, res: Response)=>
{
    try
    {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (err)
    {
        res.status(401).json({ message: handleError(err) });
    }
};

export const forgotPassword = async (req: Request, res: Response)=>
{
    try
    {
        const { email } = req.body;
        await generateResetToken(email);
        res.status(200).json({ message: 'Reset token sent to email' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const resetPasswordHandler = async (req: Request, res: Response)=>
{
    try
    {
        const { email, token, newPassword } = req.body;
        await resetPassword(email, token, newPassword);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};
