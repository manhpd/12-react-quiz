import { createContext, useState, useCallback } from "react";
import QUESTIONS from "../questions";
import { skip } from "node:test";

export const QuizContext = createContext({
    userAnswers : [] as string[],
    selectAnswer: (answer: string) => { },
    skipQuestion: () => { },
})

export default function QuizContextProvider ({children}: {children: React.ReactNode}) {

    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const activeQuestionIndex = userAnswers.length;

    const handelSelectAnswer = useCallback((answer: string) => {
        setUserAnswers((prev) => [...prev, answer]);
    }, [activeQuestionIndex]);

    const handelSkipQuestion = useCallback(() => {
        setUserAnswers((prev) => [...prev, '']);
    }, []);

    const contextValue = {
        userAnswers: userAnswers,
        selectAnswer: (answer: string) => { 
            handelSelectAnswer(answer);
        },
        skipQuestion: () => { 
            handelSkipQuestion();
        },
    } 
    return (
        <QuizContext.Provider value={contextValue} >
            {children}
        </QuizContext.Provider>
    );
}