import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions";
import { useContext, useRef, useState } from "react";
import Answers from "./Answers";
import { QuizContext } from "../store/quiz-contex";

export default function Question() {
    // array of 4 answers ref
    const { userAnswers, answerStatus } = useContext(QuizContext);
    
    const activeQuestionIndex = userAnswers.length;
    const title = QUESTIONS[activeQuestionIndex].text;
    const key = userAnswers.length;

   
    return (
        <div id="question">
                <h2>Question {activeQuestionIndex + 1}</h2>
                <QuestionTimer key={key} timeOut={10000}/>
                <h2>{title}</h2>
                <Answers ></Answers>
            </div>
    );
}