import { createContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initializeState = {
    questions: [],
    // loading, error, ready, active, finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    timeRemaining: null,
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
    const question = state.questions.at(state.index);

    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return {
                ...state,
                status: "active",
                timeRemaining: state.questions.length * SEC_PER_QUESTION,
            };
        case "newAnswer":
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        case "restart":
            return {
                ...initializeState,
                questions: state.questions,
                status: "ready",
                highscore: state.highscore,
            };
        // return {
        //     ...state,
        //     status: "ready",
        //     points: 0,
        //     answer: null,
        //     index: 0,
        // };

        case "time":
            return {
                ...state,
                timeRemaining: state.timeRemaining - 1,
                status: state.timeRemaining === 0 ? "finished" : state.status,
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        default:
            throw new Error("The error is unknown.");
    }
}

function QuizProvider({ children }) {
    const [
        { questions, status, index, answer, points, highscore, timeRemaining },
        dispatch,
    ] = useReducer(reducer, initializeState);
    const numQuestions = questions.length;
    const maxPoints = (Array.isArray(questions) ? questions : []).reduce(
        (prev, cur) => prev + cur.points,
        0,
    );
    useEffect(() => {
        fetch("/questions.json")
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "dataReceived", payload: data.questions });
            })
            .catch(() => dispatch({ type: "dataFailed" }));
    }, []);

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                points,
                highscore,
                timeRemaining,
                numQuestions,
                maxPoints,
                dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

export { QuizProvider, QuizContext };
