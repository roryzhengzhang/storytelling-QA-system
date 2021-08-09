import { isString } from './utils';
import axios from 'axios';

export const getSpeakText = step => {
  const { message, metadata = {} } = step;
  if (isString(metadata.speak)) {
    return metadata.speak;
  }
  if (isString(message)) {
    return message;
  }
  return '';
};

export const speakFn = speechSynthesisOptions => (step, previousValue) => {
  const { lang, voice, enable } = speechSynthesisOptions;
  const { user } = step;


  if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
    return;
  }
  if (user) {
    return;
  }
  if (!enable) {
    return;
  }
  const text = getSpeakText(step);
  const msg = new window.SpeechSynthesisUtterance();

  const ttsRequest = {
    "audioConfig": {
      "audioEncoding": "LINEAR16",
      "pitch": 2,
      "speakingRate": 0.9
    },
    "input": {
      "text": `${text.replace(/{previousValue}/g, previousValue)}`
    },
    "voice": {
      "languageCode": "en-US",
      "name": "en-US-Wavenet-F"
    }
  }

  console.log(ttsRequest)

  axios
    .post('https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDbAoO-MIi1PFP64Rfxvho7jN4DB2qTb5M', ttsRequest)
    .then(response => {
      var audio = new Audio("data:audio/wav;base64," + response.data.audioContent);
      audio.play();
    })


  // msg.text = text.replace(/{previousValue}/g, previousValue);
  // msg.lang = lang;
  // msg.voice = voice;
  // window.speechSynthesis.speak(msg);
};
