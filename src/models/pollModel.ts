export interface Poll
{
    id?: number;
    question: string;
    option1: string;
    option2: string;
    createdBy: number;
}

export interface PollResult
{
    id?: number;
    pollId: number;
    selectedOption: string;
    createdBy: number;
}
