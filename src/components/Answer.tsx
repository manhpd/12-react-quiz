import { useContext, useRef, useState } from "react";
import { QuizContext } from "../store/quiz-contex";

export default function Answer({ key, correctAnswer,answer } : { key: number, correctAnswer: string, answer: string }) {
    const [ answerStatus, setAnswerStatus] = useState("unselected");
    const {  selectAnswer } = useContext(QuizContext);
    const buttonRef = useRef<HTMLButtonElement>(null);
    



    const handelSelectAnswer = (answer: string, index: number) => {
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
        <li key={key} className="answer" >
            <button onClick={() => handelSelectAnswer(answer, key)} className={buttonClass} ref={buttonRef}>
                {answer}
            </button>
        </li>);
}