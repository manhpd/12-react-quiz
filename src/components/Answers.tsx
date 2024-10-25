import { useContext, useRef } from "react";
import { QuizContext } from "../store/quiz-contex";
import QUESTIONS from "../questions";
import Answer from "./Answer";

export default function Answers() {
    const { userAnswers, selectAnswer } = useContext(QuizContext);
    const activeQuestionIndex = userAnswers.length;

    // deep copy of answers
    const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);

    const correctAnswer = QUESTIONS[activeQuestionIndex].answers[0];

    return (
        <ul id="answers">
            {shuffleAnswers.map((answer, index) => {
                return (
                    <Answer key={index} answer={answer} correctAnswer={correctAnswer} />
                );
            })
            }
        </ul>
    );
}