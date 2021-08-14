import React from 'react'
// import ChatBot from "react-simple-chatbot";
import ChatBot from '../Chatbot'
import { MODE } from '../../config'

const steps = [
    {
        id: "0",
        message: "Thank you for using the Story Buddy voice assistant!",
        trigger: "1"
    },
    {
        id: "1",
        message: "As you are reading the story 'Three Bears in a Boat', I will ask you some questions regarding the story content.",
        trigger: "2"
    },
    {
        id: "2",
        message: "Q1: How many bears live by the sea?",
        trigger: "3"
    },
    {
        id: "3",
        user: true,
        trigger: ({ value, steps }) => { console.log(steps); return value.includes("three") ? "20" : "21" }
    },
    {
        id: "20",
        message: "That's correct! Good Job!",
        trigger: "200"
    },
    {
        id: "21",
        message: "Not quite right! Maybe I should ask in another way.",
        trigger: "210"
    },
    {
        id: "200",
        message: "I have some questions like this! Do you want to try one more?",
        trigger: "201"
    },
    {
        id: "201",
        options: [
            { value: 1, label: 'Yes!', trigger: '202' },
            { value: 2, label: 'No and continue reading', end: true }
        ],
    },
    {
        id: "210",
        message: "Where do the bears live?",
        trigger: "2100"
    },
    {
        id: "2100",
        user: true,
        trigger: ({ value, steps }) => { return value.includes("sea") ? "20" : "21" }
    },
    {
        id: "202",
        message: "What does Charlie wear?",
        trigger: "2020"
    }, {
        id: "2020",
        user: true,
        trigger: ({ value, steps }) => { return value.includes("scarf") ? "20" : "21" }
    },

];

const ChatbotPanel = () => {

    return (
        <ChatBot
            // speechSynthesis={{ enable: true, lang: "en" }}
            recognitionEnable={true}
            steps={steps}
            hideHeader={true}
            hideBotAvatar={true}
            width="100%"
            height={MODE === 0 ? "68vh" : "70vh"}
            enableSmoothScroll={true}
            hideUserAvatar={true}
            placeholder="Enter your answer..."
        />
    );
}

export default ChatbotPanel;