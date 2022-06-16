import axios from 'axios'

import { storyLibrary, questionLibrary, simQuestionLibrary } from '../../store/data_new_third_person'

import { setServerReturned } from '../../modules/StoryBook/storybookSlice'

import { useSelector, useDispatch } from 'react-redux';

// function sleep(delay) {
//     var start = new Date().getTime();
//     while (new Date().getTime() < start + delay);
// }

function waitResponse(value) {
    while(value === false);
    
    return;
}

// write a async function to enable await. It will ensure the program will only move on after http request returns
export async function checkAnswer(question, answer) {
        let is_correct = await checkAnswerWithDialogflow(question, answer).then(value => {
        // console.log("value", value)
        return value
    });
    return is_correct;
}

export function checkAnswerWithDialogflow(question, answer) {

    console.log("check answer function called")

    var is_correct;

    // const serverReturned = useSelector(state => state.storybook.serverReturned);

    // const dispatch = useDispatch();

    // dispatch(setServerReturned(false))

    return axios.get('https://ndhci.org:2053/text-input', {
        params: {
            question,
            answer
        }
    }, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then( response => response.data ).then(data => {
        is_correct = data.correctness;
        console.log("response correctness", is_correct)
        // dispatch(setServerReturned(true))
        // finished = true
        return is_correct
    })


    return is_correct;
    // console.log("correctness:", is_correct)

    // // waitResponse(is_correct)

    // console.log("correctness:", is_correct)
}

export async function getTTS(content) {

    const request = axios.post('https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDbAoO-MIi1PFP64Rfxvho7jN4DB2qTb5M',
        {
            "audioConfig": {
                "audioEncoding": "LINEAR16",
                "pitch": 2,
                "speakingRate": 0.9
            },
            "input": {
                "text": `${content}`
            },
            "voice": {
                "languageCode": "en-US",
                "name": "en-US-Wavenet-F"
            }
        });

    var audio;

    request.then((response) => {
        audio = new Audio("data:audio/wav;base64," + response.data.audioContent);
    })

    return audio;
}

export async function getTextResponse(content) {
    const request = axios.post('http://localhost:2053/text-input', {
        message: content
    });

    var text_res;

    request.then((response) => {
        text_res = response.data[0].queryResult.fulfillmentText
    })

    return text_res;
}


export async function fetchStoryFromServer(storyInfo) {

    var url = new URL("http://127.0.0.1:5000/fetchStory");

    url.searchParams.append('title', storyInfo.title);

    const story = await fetch(url).json();
    return story;
}

export async function fetchQuestionFromServer(storyInfo) {
    var url = new URL("http://127.0.0.1:5000/fetchQuestion");

    url.searchParams.append('title', storyInfo.title);

    const questions = await (await fetch(url)).json();
    return questions;
}

const getStoryMetaData = () => {
    return storyLibrary.map((story, key) => ({ "title": story.title, "cover": story.cover }));
}

const getStoryFromLibrary = (title) => {
    return storyLibrary.find((story) => title === story.title);
}

const getQuestionsFromLibrary = (title) => {
    const story = questionLibrary.find((story) => story.title === title);
    if (story) {
        return questionLibrary.find((story) => story.title === title).questions;
    }
}

const getSimilarQuestionsFromLibrary = (title) => {
    const story = simQuestionLibrary.find((story) => story.title === title);
    if (story) {
        return simQuestionLibrary.find((story) => story.title === title).questions;
    }
}

export { getStoryMetaData, getStoryFromLibrary, getQuestionsFromLibrary, getSimilarQuestionsFromLibrary };