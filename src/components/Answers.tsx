import { useContext, useRef } from "react";
import { QuizContext } from "../store/quiz-contex";
import QUESTIONS from "../questions";

export default function Answers() {
    const answersRef = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
    const { userAnswers, selectAnswer } = useContext(QuizContext);
    const activeQuestionIndex = userAnswers.length;
    const shuffleAnswers = QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5);


    const handelSelectAnswer = (answer: string, index: number) => {
        answersRef[index].current!.classList.add("selected");
        const correctAnswer = QUESTIONS[activeQuestionIndex].answers[0];

        setTimeout(() => {
            if (answer !== QUESTIONS[activeQuestionIndex].answers[0]) {
                answersRef[index].current!.classList.add("wrong");
            }
            
            const correctIndex = shuffleAnswers.indexOf(correctAnswer);


            answersRef[correctIndex].current!.classList.add("correct");

            setTimeout(() => {
                selectAnswer(answer);
                answersRef[index].current!.classList.remove("selected", "correct", "wrong");
                answersRef[correctIndex].current!.classList.remove("selected", "correct", "wrong");
                // remove focus 
                answersRef[index].current!.blur();
            }, 2000);
        }, 1000);

    }

    return (
        <ul id="answers">
            {shuffleAnswers.map((answer, index) => {
                return (
                    <li key={index} className="answer" >
                        <button onClick={() => handelSelectAnswer(answer, index)} ref={answersRef[index]} className="button">
                            {answer}
                        </button>
                    </li>
                );
            })
            }
        </ul>
    );
}