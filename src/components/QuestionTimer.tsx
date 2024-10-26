import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../store/quiz-contex";

export default function QuestionTimer({timeOut}: {  timeOut: number}) {

    const [timeLeft, setTimeLeft] = useState(timeOut);
    const { skipQuestion } = useContext(QuizContext);
  
    const {answerStatus} = useContext(QuizContext);
    
    useEffect(() => {
        const timer  = setTimeout(skipQuestion, timeOut);
        // if the user has selected an answer, change the timer to 2 seconds
        if (answerStatus === "selected") {
            clearTimeout(timer);
            setTimeout(skipQuestion, 2000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => { 
            setTimeLeft((prev) => prev - 10);
        }, 10);

        // if the user has selected an answer, change the timer left to 2 seconds
        if (answerStatus === "selected") {
            clearInterval(interval);
            setTimeLeft(2000);
            
        }

        return () => {
            clearInterval(interval);
        };
    }, []);
    
    return (
        <progress id="question-time" max={timeOut} value={timeLeft} />
    );
}