import { useCallback, useContext, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";
import { QuizContext } from "../store/quiz-contex";

export default function Quiz() {

    const { userAnswers } = useContext(QuizContext);
    const activeQuestionIndex = userAnswers.length;

    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

    if (isQuizCompleted) {
        const point = userAnswers.reduce((acc, userAnswer, index) => {
            return userAnswer === QUESTIONS[index].answers[0] ? acc + 1 : acc;
        }, 0);

        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy Icon" />
                <h2>Result {point}/{activeQuestionIndex}</h2>
                <ul>
                    {QUESTIONS.map((question, index) => {
                        const userAnswer = userAnswers[index];
                        const isCorrect = userAnswer === question.answers[0];
                        return (
                            <li key={index}>
                                <p><strong>{question.text}</strong> - <span style={{color: isCorrect ? 'green' : 'red'}} >{isCorrect ? 'Correct' : 'Wrong'}</span></p>
                                <p>Correct Answer: {question.answers[0]}</p>
                                <p>Your Answer: {userAnswers[index]}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div id="quiz">
            <Question  />
        </div>
    );
}