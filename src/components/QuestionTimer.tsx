import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../store/quiz-contex";

export default function QuestionTimer({timeOut}: {  timeOut: number}) {

    const [timeLeft, setTimeLeft] = useState(timeOut);
    const { skipQuestion } = useContext(QuizContext);
  
    
    useEffect(() => {
        const timer  = setTimeout(skipQuestion, timeOut);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => { 
            setTimeLeft((prev) => prev - 10);
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }, []);
    
    return (
        <progress id="question-time" max={timeOut} value={timeLeft} />
    );
}