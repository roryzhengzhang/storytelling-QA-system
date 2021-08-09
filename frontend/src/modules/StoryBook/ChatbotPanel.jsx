import React from 'react'
import { ThemeProvider } from 'styled-components';
// import ChatBot from "react-simple-chatbot";
import ChatBot from '../Chatbot'


const steps = [
    {
        id: "0",
        message: "Thank you for using the Story Buddy voice assistant!",
        trigger: "1"
    },
    {
        id: "1",
        message: "As you are reading the story 'The Hare and the Tortoise', I will ask you some questions regarding the story content.",
        trigger: "2"
    },
    {
        id: "2",
        message: "Q1: What did the hare think of himself?",
        trigger: "3"
    },
    {
        id: "3",
        user: true,
        trigger: ({ value }) => { return value.includes("fast") ? "20" : "21" }
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
        message: "What did the hare think of his running skill?",
        trigger: "2100"
    },
    {
        id: "2100",
        user: true,
        trigger: ({ value, steps }) => { return value.includes("fast") ? "20" : "21" }
    },
    {
        id: "202",
        message: "Do you think the tortoise can run faster than the rabbit?",
        trigger: "2020"
    }, {
        id: "2020",
        user: true,
        trigger: ({ value, steps }) => { return value.includes("fast") ? "20" : "21" }
    },

];


const bot_theme = {
    background: '#fff',
    headerBgColor: '#EF6C00',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#189483',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};



const ChatbotPanel = () => {

    return (
        <ThemeProvider theme={bot_theme}>
            <ChatBot
                // speechSynthesis={{ enable: true, lang: "en" }}
                recognitionEnable={true}
                steps={steps}
                hideHeader={true}
                hideBotAvatar={true}
                width="100%"
                height="68vh"
                enableSmoothScroll={true}
                hideUserAvatar={true}
                placeholder="Enter your answer..."
            />
        </ThemeProvider>
    );
}

export default ChatbotPanel;