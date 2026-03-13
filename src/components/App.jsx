// import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuizzes } from "../hooks/useQuizzes";

// const initializeState = {
//     questions: [],
//     // loading, error, ready, active, finished
//     status: "loading",
//     index: 0,
//     answer: null,
//     points: 0,
//     highscore: 0,
//     timeRemaining: null,
// };

// const SEC_PER_QUESTION = 30;

// function reducer(state, action) {
//     const question = state.questions.at(state.index);

//     switch (action.type) {
//         case "dataReceived":
//             return { ...state, questions: action.payload, status: "ready" };
//         case "dataFailed":
//             return { ...state, status: "error" };
//         case "start":
//             return {
//                 ...state,
//                 status: "active",
//                 timeRemaining: state.questions.length * SEC_PER_QUESTION,
//             };
//         case "newAnswer":
//             return {
//                 ...state,
//                 answer: action.payload,
//                 points:
//                     action.payload === question.correctOption
//                         ? state.points + question.points
//                         : state.points,
//             };
//         case "nextQuestion":
//             return { ...state, index: state.index + 1, answer: null };
//         case "finish":
//             return {
//                 ...state,
//                 status: "finished",
//                 highscore:
//                     state.points > state.highscore
//                         ? state.points
//                         : state.highscore,
//             };
//         case "restart":
//             return {
//                 ...initializeState,
//                 questions: state.questions,
//                 status: "ready",
//                 highscore: state.highscore,
//             };
//         // return {
//         //     ...state,
//         //     status: "ready",
//         //     points: 0,
//         //     answer: null,
//         //     index: 0,
//         // };

//         case "time":
//             return {
//                 ...state,
//                 timeRemaining: state.timeRemaining - 1,
//                 status: state.timeRemaining === 0 ? "finished" : state.status,
//                 highscore:
//                     state.points > state.highscore
//                         ? state.points
//                         : state.highscore,
//             };
//         default:
//             throw new Error("The error is unknown.");
//     }
// }

export default function App() {
    const { status, answer } = useQuizzes();
    // const [
    //     { questions, status, index, answer, points, highscore, timeRemaining },
    //     dispatch,
    // ] = useReducer(reducer, initializeState);

    // const numQuestions = questions.length;
    // const maxPoints = (Array.isArray(questions) ? questions : []).reduce(
    //     (prev, cur) => prev + cur.points,
    //     0,
    // );
    // useEffect(() => {
    //     fetch("/questions.json")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             dispatch({ type: "dataReceived", payload: data.questions });
    //         })
    //         .catch(() => dispatch({ type: "dataFailed" }));
    // }, []);
    return (
        <div className="app">
            <Header />

            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && <StartScreen />}
                {status === "active" && (
                    <>
                        <Progress />
                        <Question />
                        <Footer>
                            <Timer />
                            {/* <NextButton /> */}
                            {answer !== null && <NextButton />}
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                    // points={points}
                    // maxPoints={maxPoints}
                    // highscore={highscore}
                    // dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
