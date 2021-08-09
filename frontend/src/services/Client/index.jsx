import axios from 'axios'

import { storyLibrary, questionLibrary } from '../../store/data'

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

export { getStoryMetaData, getStoryFromLibrary, getQuestionsFromLibrary };