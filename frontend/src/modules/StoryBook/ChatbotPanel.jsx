import React, { useEffect, useState } from 'react'
// import ChatBot from "react-simple-chatbot";
import ChatBot from '../Chatbot'
// import { MODE } from '../../config'
import { useSelector } from 'react-redux'
import prepareSteps from '../../services/stepHelper'
import { configureStore } from '@reduxjs/toolkit'
import { Typography } from '@material-ui/core'
import { getSectionQuestionSetSize } from './storybookSlice'

// const steps = [
//     {
//         id: "0",
//         message: "Thank you for using the Story Buddy voice assistant!",
//         trigger: "1"
//     },
//     {
//         id: "1",
//         message: "As you are reading the story 'Three Bears in a Boat', I will ask you some questions regarding the story content.",
//         trigger: "2"
//     },
//     {
//         id: "2",
//         message: "Q1: How many bears live by the sea?",
//         trigger: "3"
//     },
//     {
//         id: "3",
//         user: true,
//         trigger: ({ value, steps }) => { console.log(steps); return value.includes("three") ? "20" : "21" }
//     },
//     {
//         id: "20",
//         message: "That's correct! Good Job!",
//         trigger: "200"
//     },
//     {
//         id: "21",
//         message: "Not quite right! Maybe I should ask in another way.",
//         trigger: "210"
//     },
//     {
//         id: "200",
//         message: "I have some questions like this! Do you want to try one more?",
//         trigger: "201"
//     },
//     {
//         id: "201",
//         options: [
//             { value: 1, label: 'Yes!', trigger: '202' },
//             { value: 2, label: 'No and continue reading', end: true }
//         ],
//     },
//     {
//         id: "210",
//         message: "Where do the bears live?",
//         trigger: "2100"
//     },
//     {
//         id: "2100",
//         user: true,
//         trigger: ({ value, steps }) => { return value.includes("sea") ? "20" : "21" }
//     },
//     {
//         id: "202",
//         message: "What does Charlie wear?",
//         trigger: "2020"
//     }, {
//         id: "2020",
//         user: true,
//         trigger: ({ value, steps }) => { return value.includes("scarf") ? "20" : "21" }
//     },

// ];

const ChatbotPanel = (props) => {

    const currPage = useSelector(state => state.storybook.currPage)

    const MODE = useSelector(state => state.storybook.MODE)

    var { config_selected } = props;

    const all_questions = useSelector(state => state.storybook.questions[currPage].qa_pair_list)

    var selected_questions;

    const story = useSelector(state => state.storybook.story)

    const storyName = useSelector(state => state.storybook.storyName)

    const isFirstPage = currPage === 1 ? true : false;

    const isLastPage = currPage === story.length - 1 ? true : false;

    const [steps, setSteps] = useState()

    useEffect(() => {

        // var tmp = [...config_selected]

        // if (config_selected.length < story.content.length) {
        //     for (let i = config_selected.length; i < story.content.length; i++) {
        //         var new_selected = [...config_selected]
        //         const question_size = getSectionQuestionSetSize(i, storyName)
        //         if (question_size > -1) {
        //             var array = new Array(question_size).fill(false).fill(true, 0, 1)
        //             console.log("array", array)
        //             tmp.push( [...array] )
        //             // new_selected[i][0] = true
        //         } else {
        //             tmp.push( new Array(0).fill(false) )
        //         }
        //     }
        // }

        // config_selected = [...tmp]
    }, [])

    useEffect(() => {
        // console.log("init chatbot config_selected", config_selected)


        console.log("currPage", currPage)
        if (config_selected[currPage]) {
            console.log("chatbot config_selected", config_selected)
            selected_questions = all_questions.filter((q, id) => config_selected[currPage][id])
            const new_steps = prepareSteps(MODE == 1 ? selected_questions : all_questions.slice(0, 3), currPage, isFirstPage, isLastPage, storyName)
            setSteps(new_steps)
        }

    }, [config_selected])

    useEffect(() => {
        console.log("new steps", steps)
    }, [steps])

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update the state to force render
    }

    useEffect(() => {
        if (config_selected[currPage]) {
            console.log("chatbot config_selected", config_selected)
            selected_questions = all_questions.filter((q, id) => config_selected[currPage][id] == true)
            const new_steps = prepareSteps(MODE == 1 ? selected_questions : all_questions.slice(0, 3), currPage, isFirstPage, isLastPage, storyName)
            setSteps(new_steps)
        } else {
            const new_steps = prepareSteps(MODE == 1 ? [] : all_questions.slice(0, 3), currPage, isFirstPage, isLastPage, storyName)
            setSteps(new_steps)
        }
    }, [currPage])

    return (
        steps ? <ChatBot
            speechSynthesis={{ enable: true, lang: "en" }}
            recognitionEnable={true}
            recognitionPlaceholder="I'm listening"
            steps={steps}
            botDelay={3500}
            hideHeader={true}
            hideBotAvatar={true}
            width="100%"
            height={MODE === 0 ? "68vh" : "70vh"}
            enableSmoothScroll={true}
            hideUserAvatar={true}
            placeholder="Enter your answer..."
        /> :
            <Typography>Loading</Typography>
    );
}

export default ChatbotPanel;