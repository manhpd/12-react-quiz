import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../store/quiz-contex";

export default function QuestionTimer({timeOut, key}: { key: number, timeOut: number}) {

    const [timeLeft, setTimeLeft] = useState(timeOut);
    const { skipQuestion } = useContext(QuizContext);
  
    
    useEffect(() => {
        const timer  = setTimeout(skipQuestion, timeOut);
        return () => {
            clearTimeout(timer);
        };
    }, [key]);
    
    useEffect(() => {
        const interval = setInterval(() => { 
            setTimeLeft((prev) => prev - 10);
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }, [key]);
    
    return (
        <progress id="question-time" max={timeOut} value={timeLeft} />
    );
}