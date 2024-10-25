import { useContext, useRef, useState } from "react";
import { QuizContext } from "../store/quiz-contex";

export default function Answer({correctAnswer,answer } : { correctAnswer: string, answer: string }) {
    const {  answerStatus, selectAnswer, setAnswerStatus } = useContext(QuizContext);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    const handelSelectAnswer = (answer: string) => {
        setAnswerStatus("selected");

        setTimeout(() => {
            if (answer === correctAnswer) {
                setAnswerStatus("correct");
            } else {
                setAnswerStatus("incorrect");
            }

            setTimeout(() => {
                setAnswerStatus("unselected");
                selectAnswer(answer);
                buttonRef.current?.blur();
            }, 2000);
        }, 1000);
    }

    let buttonClass = "button";
    if (answerStatus === "correct") {
        buttonClass = "button selected correct";
    } else if (answerStatus === "incorrect") {
        buttonClass = "button selected wrong";
    }

    return (
        <li className="answer" >
            <button onClick={() => handelSelectAnswer(answer)} className={buttonClass} ref={buttonRef}>
                {answer}
            </button>
        </li>);
}