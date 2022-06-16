
import { checkAnswer } from "./Client";
import { findFollowUpQuestions } from "../modules/StoryBook/storybookSlice";
import AnswerStep from "../modules/Chatbot/answerStep";
const { promiseStatus } = require('promise-status-async');

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function waitResponse(promise) {
    console.log("promise status", promiseStatus(promise))
    if (promiseStatus(promise) === 'pending') {//we want it to match
        console.log("promise is pending")
        setTimeout(() => waitResponse(promise), 50);//wait 50 millisecnds then recheck
        return;
    }

    return;
}



export default function prepareSteps(questions, currPage, isFirstPage = false, isLastPage = false, storyName="Three Bears in a Boat") {
    var steps = [];
    var id = 0;
    var val;

    console.log("step: question args", questions)

    // assume the first page is title
    if (currPage == 0) {
        steps.push({
            id: String(0),
            message: "Let's start our journey! You can click Right Arrow to move forward",
            end: true
        })

        return steps
    }

    if (questions.length == 0) {
        steps.push({
            id: "0",
            message: "I have no question for this page, let's move to the next one!",
            end: true
        })

        return steps
    }

    if (isFirstPage) {
        steps.push({
            id: String(id),
            message: "Hi, my name is Kitt. Nice to meet you!",
            trigger: String(++id)
        })

        steps.push({
            id: String(id),
            message: "Let's have a QUESTION time!",
            trigger: String(++id)
        })

        steps.push({
            id: String(id),
            message: "Here is a question:",
            trigger: String(100)
        })
    }


    questions.forEach((q, q_index) => {
        const follow_ups = findFollowUpQuestions(currPage, q['question'], storyName)
        console.log("Current Page", currPage)
        console.log("Question", q['question'])
        console.log("follow-ups", follow_ups)

        if (!isFirstPage || q_index != 0) {
            steps.push({
                id: String((q_index + 1) * 100 - 1),
                message: `Here is a question: ${q['question']}`,
                trigger: String((q_index + 1) * 100 + 1),
                metadata: {
                    question: q['question']
                }
            })
        } else {
            steps.push({
                id: String((q_index + 1) * 100),
                message: q['question'],
                trigger: String((q_index + 1) * 100 + 1),
                metadata: {
                    question: q['question']
                }
            })
        }

        // // Agent: question message
        // steps.push({
        //     id: String((q_index + 1) * 100),
        //     message: q['question'],
        //     trigger: String((q_index + 1) * 100 + 1)
        // })
        // User: answer message
        steps.push({
            id: String((q_index + 1) * 100 + 1),
            user: true,
            trigger: function (value, steps) {
                // const is_correct = checkAnswer(q['question'], value)
                // console.log("correctness in step", is_correct)
                // // sleep(2000)
                // console.log("correctness in step", is_correct)
                // // console.log("correct?", is_correct)
                // // // waitResponse(is_correct)
                // // console.log("correct?", is_correct === true)
                // console.log("input user answer", value)
                // checkAnswer(q['question'], value).then(value => {
                //     val = value
                // })
                
                // console.log("val value", val)
                return String((q_index + 1 )*100 + 41)
                // while(val != true && val != false) {
                //     console.log("val", val)
                // }

                // if (val == true) {
                //     console.log("val is true")
                //     return String((q_index + 1) * 100 + 4)
                // } else {
                //     console.log("val is false")
                //     return String((q_index + 1) * 100 + 2)
                // }
            }
        })

        steps.push({
            id: String((q_index + 1)*100 + 41),
            asMessage: true,
            component: <AnswerStep hasNext={q_index < questions.length - 1 ? true: false} correctAnswer={q['answer']} showAnswer={false} questionStepId={!isFirstPage || q_index != 0 ? String((q_index + 1) * 100 - 1): String((q_index + 1) * 100)} nextQuestionStep={String((q_index + 1) * 100 + 52)} nextPageStep="1000" tryAgainStep={String((q_index + 1) * 100 + 5)}/>,
            waitAction: true,
        })

        // Agent: handle incorrect user answer
        steps.push({
            id: String((q_index + 1) * 100 + 2),
            message: "You're close! Do you want to try again?",
            trigger: String((q_index + 1) * 100 + 3)
        })

        // User: choose whether or not try again
        steps.push({
            id: String((q_index + 1) * 100 + 3),
            options: [
                { value: 1, label: 'Yes', trigger: String((q_index + 1) * 100 + 5) },
                { value: 2, label: 'No', trigger: String((q_index + 1) * 100 + 9) }
            ]
        })

        // Agent: handle correct user answer
        steps.push({
            id: String((q_index + 1) * 100 + 4),
            message: "You are correct!",
            trigger: String((q_index + 1) * 100 + 9)
        })

        // Agent: prompt user to give another try
        steps.push({
            id: String((q_index + 1) * 100 + 5),
            message: "What's your new answer?",
            trigger: String((q_index + 1) * 100 + 6)
        })

        // User: answer message (v2)
        steps.push({
            id: String((q_index + 1) * 100 + 6),
            user: true,
            trigger: ({ value, steps }) => {
                return String((q_index + 1)*100 + 7)
            }
        })

        steps.push({
            id: String((q_index + 1)*100 + 7),
            asMessage: true,
            component: <AnswerStep hasNext={q_index < questions.length - 1 ? true: false} correctAnswer={q['answer']} showAnswer={true} questionStepId={!isFirstPage || q_index != 0 ? String((q_index + 1) * 100 - 1): String((q_index + 1) * 100)} nextQuestionStep={String((q_index + 1) * 100 + 52)} nextPageStep="1000" tryAgainStep={String((q_index + 1) * 100 + 5)}/>,
            waitAction: true,
        })

        // // Agent: handle correct answer (v2)
        // steps.push({
        //     id: String((q_index + 1) * 100 + 7),
        //     message: "You are correct this time! Good job!",
        //     trigger: String((q_index + 1) * 100 + 9)
        // })

        // Agent: handle incorrect answer (v2)
        steps.push({
            id: String((q_index + 1) * 100 + 8),
            message: `Well, the right answer is ${q['answer']}. You are close.`,
            trigger: follow_ups.length > 0 ? String((q_index + 1) * 100 + 9) : q_index < questions.length - 1 ? String((q_index + 1) * 100 + 50) : "1000"
        })

        // Agent: prompt to try follow-up question
        steps.push({
            id: String((q_index + 1) * 100 + 9),
            message: "I also have a follow-up question for this one, do you want to try?",
            trigger: String((q_index + 1) * 100 + 10)
        })

        // User: choose whether or not answer follow-up question
        steps.push({
            id: String((q_index + 1) * 100 + 10),
            options: [
                { value: 1, label: "Yes", trigger: String((q_index + 1) * 100 + 11) },
                { value: 2, label: "No", trigger: q_index < questions.length - 1 ? String((q_index + 1) * 100 + 50) : "1000" }
            ]
        })

        // Agent: ask for trying a new question
        steps.push({
            id: String((q_index + 1) * 100 + 50),
            message: "Do you want to try another new question?",
            trigger: String((q_index + 1) * 100 + 51)
        })

        // User: whether or not try a new parent-level question
        steps.push({
            id: String((q_index + 1) * 100 + 51),
            options: [
                { value: 1, label: 'Yes!', trigger: String((q_index + 1) * 100 + 52) },
                { value: 2, label: 'No and continue reading', trigger: '1000' }
            ],
        })

        // Agent: go to next parent-level question
        steps.push({
            id: String((q_index + 1) * 100 + 52),
            message: "Let's try a new question!",
            trigger: q_index < questions.length - 1 ? String((q_index + 2) * 100 - 1) : "1000"
        })

        // Agent: question message
        steps.push({
            id: String((q_index + 1) * 100 + 11),
            message: follow_ups.length > 0 ? follow_ups[0]['question'] : "no answer",
            trigger: String((q_index + 1) * 100 + 12),
            metadata: {
                question: q['question']
            }
        })


        // User: answer message
        steps.push({
            id: String((q_index + 1) * 100 + 12),
            user: true,
            trigger: function (value, steps) {
                return String((q_index + 1)*100 + 13)
             }
        })

        steps.push({
            id: String((q_index + 1)*100 + 13),
            asMessage: true,
            component: <AnswerStep isFollowUp={true} hasNext={q_index < questions.length - 1 ? true: false} showAnswer={false} questionStepId={String((q_index + 1) * 100 + 11)} nextQuestionStep={String((q_index + 1) * 100 + 52)} nextPageStep="1000" tryAgainStep={String((q_index + 1) * 100 + 16)}/>,
            waitAction: true,
        })

        // // Agent: handle incorrect user answer
        // steps.push({
        //     id: String((q_index + 1) * 100 + 13),
        //     message: "I'm sorry, the answer seems not quite right! Do you want to try again?",
        //     trigger: String((q_index + 1) * 100 + 14)
        // })

        // User: choose whether or not try again
        steps.push({
            id: String((q_index + 1) * 100 + 14),
            options: [
                { value: 1, label: 'Yes', trigger: String((q_index + 1) * 100 + 16) },
                { value: 2, label: 'No', trigger: q_index < questions.length - 1 ? String((q_index + 1) * 100 + 50) : "1000" }
            ]
        })

        // Agent: handle correct user answer
        steps.push({
            id: String((q_index + 1) * 100 + 15),
            message: "You are correct!",
            trigger: String((q_index + 1) * 100 + 50)
        })

        // Agent: prompt user to give another try
        steps.push({
            id: String((q_index + 1) * 100 + 16),
            message: "What's your new answer?",
            trigger: String((q_index + 1) * 100 + 17)
        })

        // User: answer message (v2)
        steps.push({
            id: String((q_index + 1) * 100 + 17),
            user: true,
            trigger: ({ value, steps }) => {
                return String((q_index + 1)*100 + 18)
            }
        })

        steps.push({
            id: String((q_index + 1)*100 + 18),
            asMessage: true,
            component: <AnswerStep hasNext={q_index < questions.length - 1 ? true: false} showAnswer={true} questionStepId={String((q_index + 1) * 100 + 11)} nextQuestionStep={String((q_index + 1) * 100 + 52)} nextPageStep="1000" tryAgainStep={String((q_index + 1) * 100 + 16)}/>,
            waitAction: true,
        })

        // // Agent: handle correct answer (v2)
        // steps.push({
        //     id: String((q_index + 1) * 100 + 18),
        //     message: "You are correct this time! Good job!",
        //     trigger: q_index < questions.length - 1 ? String((q_index + 1) * 100 + 50) : "1000"
        // })

        // Agent: handle incorrect answer (v2)
        steps.push({
            id: String((q_index + 1) * 100 + 19),
            message: follow_ups.length !== 0 ? `Well, the right answer is ${follow_ups[0]['answer']}. You are close.` : "no answer",
            trigger: q_index < questions.length - 1 ? String((q_index + 1) * 100 + 50) : "1000"
        })


        // Agent: end this round of conservation
        if (isLastPage) {
            steps.push({
                id: "1000",
                message: "Alright, we've finsished this story! You did a very good job!",
                end: true
            })
        } else {
            steps.push({
                id: "1000",
                message: "Let's move to next page!",
                end: true
            })
        }
    });

    return steps;
}