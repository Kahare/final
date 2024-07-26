import { Request, Response } from 'express';
import { createPoll, getPolls, votePoll } from '../services/PollService';
import { Poll, PollResult } from '../models/pollModel';
import { handleError } from '../utils/handleError';

export const addPoll = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { question, option1, option2, createdBy } = req.body;
        const poll: Poll = { question, option1, option2, createdBy };
        const newPoll = await createPoll(poll);
        res.status(201).json(newPoll);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const listPolls = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const polls = await getPolls();
        res.status(200).json(polls);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};

export const voteInPoll = async (req: Request, res: Response): Promise<void> =>
{
    try
    {
        const { pollId, selectedOption, createdBy } = req.body;
        const pollResult: PollResult = { pollId, selectedOption, createdBy };
        const newVote = await votePoll(pollResult);
        res.status(201).json(newVote);
    } catch (err)
    {
        res.status(400).json({ message: handleError(err) });
    }
};
