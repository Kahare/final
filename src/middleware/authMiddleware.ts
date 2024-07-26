import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface UserPayload
{
    userId: number;
    role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void | Response =>
{
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token)
    {
        return res.status(401).json({ message: 'Access denied' });
    }

    try
    {
        const verified = jwt.verify(token, config.jwtSecret) as UserPayload;
        (req as any).user = verified; // Type assertion
        next();
    } catch (err)
    {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const authorizeRole = (roles: string[]) =>
{
    return (req: Request, res: Response, next: NextFunction): void | Response =>
    {
        const user = (req as any).user as UserPayload; // Type assertion
        if (!user || !roles.includes(user.role))
        {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
