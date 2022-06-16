import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { findFollowUpQuestions } from '../StoryBook/storybookSlice';

export default function AnswerStep(props) {

    const currPage = useSelector(state => state.storybook.currPage)
    const storyName = useSelector(state => state.storybook.storyName)

    const [isCorrect, setCorrect] = useState();
    const [loading, setLoading] = useState(false);



    console.log("questionStepId", props.questionStepId)

    var question;

    if (props.isFollowUp == true) {
        const follow_ups = findFollowUpQuestions(currPage, props.steps[props.questionStepId].metadata.question, storyName = "Three Bears in a Boat")
        if (follow_ups.length > 0) {
            question = follow_ups[0]['question']
        }
        else {
            question = "No follow up question"
        }

    } else {
        question = props.steps[props.questionStepId].metadata.question
    }

    const answer = props.previousStep.value;

    // const question = props.steps.find(s => s.id === props.questionStepId).metadata
    console.log("steps: ", props.steps)
    console.log("next question step: ", props.nextQuestionStep)
    console.log("next page step: ", props.nextPageStep)
    console.log("try again step: ", props.tryAgainStep)

    useEffect(() => {
        console.log("check answer function called")

        var is_correct;

        // const serverReturned = useSelector(state => state.storybook.serverReturned);

        // const dispatch = useDispatch();

        // dispatch(setServerReturned(false))

        return axios.get('https://ndhci.org:2053/text-input', {
            params: {
                question: question,
                answer: answer
            }
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => response.data).then(data => {
            setCorrect(data.correctness);
            setLoading(true);
        })
    }, [])



    return (
        <div>
            {!loading ? <CircularProgress /> :
                isCorrect ?
                    <div>
                        <Typography>You are correct!</Typography>
                        <div>
                            <Button style={{ marginBottom: "5px", fontSize: "10px" }} variant="contained" color="secondary" onClick={() => props.triggerNextStep({ trigger: props.nextQuestionStep })}>Try another question</Button>
                            <Button style={{ marginBottom: "5px", fontSize: "10px" }} variant="contained" color="secondary" onClick={() => props.triggerNextStep({ trigger: props.nextPageStep })}>Move to next page</Button>
                        </div>

                    </div>
                    :
                    <div>
                        <Typography>You are close! {props.showAnswer && `The right answer is ${props.correctAnswer}`}</Typography>
                        <div>
                            {!props.showAnswer && <Button variant="contained" color="button-color" style={{ marginBottom: "5px", fontSize: "10px" }} onClick={() => props.triggerNextStep({ trigger: props.tryAgainStep })}>Try again</Button>}
                            {props.hasNext && <Button variant="contained" color="button-color" style={{ marginBottom: "5px", fontSize: "10px" }} onClick={() => props.triggerNextStep({ trigger: props.nextQuestionStep })}>Try another question</Button>}
                            <Button variant="contained" color="button-color" style={{ marginBottom: "5px", fontSize: "10px" }} onClick={() => props.triggerNextStep({ trigger: props.nextPageStep })}>Move to next page</Button>
                        </div>
                    </div>
            }
        </div>
    );

}