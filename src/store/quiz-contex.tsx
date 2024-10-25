import { createContext, useState, useCallback } from "react";
import QUESTIONS from "../questions";
import { skip } from "node:test";

export const QuizContext = createContext({
    userAnswers : [] as string[],
    answerStatus: "unselected",
    selectAnswer: (answer: string) => { },
    skipQuestion: () => { },
    setAnswerStatus: (status: string) => { },
})

export default function QuizContextProvider ({children}: {children: React.ReactNode}) {

    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [answerStatus, setAnswerStatus] = useState<string>('unselected');

    const activeQuestionIndex = userAnswers.length;

    const handelSelectAnswer = useCallback((answer: string) => {
        setUserAnswers((prev) => [...prev, answer]);
    }, [activeQuestionIndex]);

    const handelSkipQuestion = useCallback(() => {
        setUserAnswers((prev) => [...prev, '']);
    }, []);

    const handelSetAnswerStatus = useCallback((status: string) => {
        setAnswerStatus(() => status);
    }, []);

    const contextValue = {
        userAnswers: userAnswers,
        answerStatus: answerStatus,
        selectAnswer: (answer: string) => { 
            handelSelectAnswer(answer);
        },
        skipQuestion: () => { 
            handelSkipQuestion();
        },
        setAnswerStatus: (status: string) => { 
            handelSetAnswerStatus(status);
        }
    } 
    return (
        <QuizContext.Provider value={contextValue} >
            {children}
        </QuizContext.Provider>
    );
}