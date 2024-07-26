import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import { User } from '../models/userModel';
import config from '../config/config';
import { database } from '../utils/db';

export const registerUser = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    role: 'Citizen' | 'Government Official' | 'Admin' = 'Citizen',
    isApproved: boolean = false
): Promise<User> =>
{
    console.log('Registering user:', { firstName, lastName, username, email, password, role, isApproved });
    const hashedPassword = await bcrypt.hash(password, 10);
    await database.connect();

    const result = await database.request()
        .input('firstName', sql.NVarChar, firstName)
        .input('lastName', sql.NVarChar, lastName)
        .input('username', sql.NVarChar, username)
        .input('email', sql.NVarChar, email)
        .input('password', sql.NVarChar, hashedPassword)
        .input('role', sql.NVarChar, role)
        .input('isApproved', sql.Bit, isApproved)
        .query(`
          INSERT INTO Users (firstName, lastName, username, email, password, role, isApproved)
          VALUES (@firstName, @lastName, @username, @email, @password, @role, @isApproved);
          SELECT * FROM Users WHERE email = @email;
        `);
    console.log('User registered:', result.recordset[0]);
    return result.recordset[0];
};

export const loginUser = async (email: string, password: string): Promise<string> =>
{
    console.log('Logging in user with email:', email);
    await database.connect();

    const result = await database.request()
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');
    const user = result.recordset[0] as User;

    if (!user || !(await bcrypt.compare(password, user.password)))
    {
        throw new Error('Invalid credentials');
    }

    if (!user.isApproved)
    {
        throw new Error('User not approved');
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });
    return token;
};

export const resetPassword = async (email: string, token: string, newPassword: string): Promise<void> =>
{
    await database.connect();
    const result = await database.request()
        .input('email', sql.NVarChar, email)
        .input('token', sql.NVarChar, token)
        .query('SELECT * FROM Users WHERE email = @email AND resetToken = @token AND resetTokenExpiration > GETDATE()');

    const user = result.recordset[0] as User;
    if (!user)
    {
        throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await database.request()
        .input('email', sql.NVarChar, email)
        .input('password', sql.NVarChar, hashedPassword)
        .query('UPDATE Users SET password = @password, resetToken = NULL, resetTokenExpiration = NULL WHERE email = @email');
};

export const generateResetToken = async (email: string): Promise<void> =>
{
    await database.connect();
    const result = await database.request()
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');

    const user = result.recordset[0] as User;
    if (!user)
    {
        throw new Error('User not found');
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });
    const expirationDate = new Date(Date.now() + 3600000); // 1 hour from now

    await database.request()
        .input('email', sql.NVarChar, email)
        .input('resetToken', sql.NVarChar, token)
        .input('resetTokenExpiration', sql.DateTime, expirationDate)
        .query('UPDATE Users SET resetToken = @resetToken, resetTokenExpiration = @resetTokenExpiration WHERE email = @email');

    // Here you should send the reset token to the user's email

    // return token;
};
