import { Request } from 'express';
import { UserPayload } from '../../middleware/authMiddleware';

interface UserPayload
{
    userId: number;
    role: string;
}

declare module 'express-serve-static-core' {
    interface Request
    {
        user?: UserPayload;
    }
}
