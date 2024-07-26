import sql from 'mssql';
import { Poll, PollResult } from '../models/pollModel';
import { database } from '../utils/db';

export const createPoll = async (poll: Poll): Promise<Poll> =>
{
    const pool = await database.connect();
    const result = await pool.request()
        .input('question', sql.NVarChar, poll.question)
        .input('option1', sql.NVarChar, poll.option1)
        .input('option2', sql.NVarChar, poll.option2)
        .input('createdBy', sql.Int, poll.createdBy)
        .query(`
            INSERT INTO Polls (question, option1, option2, createdBy)
            VALUES (@question, @option1, @option2, @createdBy);
            SELECT * FROM Polls WHERE id = SCOPE_IDENTITY();
        `);
    return result.recordset[0];
};

export const getPolls = async (): Promise<Poll[]> =>
{
    const pool = await database.connect();
    const result = await pool.request().query('SELECT * FROM Polls');
    return result.recordset;
};

export const votePoll = async (pollResult: PollResult): Promise<PollResult> =>
{
    const pool = await database.connect();
    const result = await pool.request()
        .input('pollId', sql.Int, pollResult.pollId)
        .input('selectedOption', sql.NVarChar, pollResult.selectedOption)
        .input('createdBy', sql.Int, pollResult.createdBy)
        .query(`
            INSERT INTO PollResults (pollId, selectedOption, createdBy)
            VALUES (@pollId, @selectedOption, @createdBy);
            SELECT * FROM PollResults WHERE id = SCOPE_IDENTITY();
        `);
    return result.recordset[0];
};
