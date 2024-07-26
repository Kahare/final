export interface User
{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role: 'Citizen' | 'Government Official' | 'Admin';
    isApproved: boolean;
    resetToken?: string;
    resetTokenExpiration?: Date;
}
