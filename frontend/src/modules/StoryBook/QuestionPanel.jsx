import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Box,
    Typography,
    IconButton,
    Tooltip,
    List,
    ListItem,
    ListItemSecondaryAction,
    Divider,
    Collapse,
    ListItemIcon,
    ListItemText,
    Grid,
    TextField
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import Checkbox from '@material-ui/core/Checkbox';
import { PlusOne, Check, Clear, Delete, ExpandLess, ExpandMore, MoreVert, Mic, Edit } from '@material-ui/icons';
import { setQuestion, setAnswer, evalQuestion, toggleQuestion, setConfigSelected, selectQuestion, setInput, editQuestion, toggleQuestionSelection, findQuestionIndexByName } from './storybookSlice';
import { useSelector, useDispatch } from 'react-redux';
import Recognition from '../Chatbot/recognition';
import { SpeechButton } from '../Chatbot/components'
import { useEffect } from 'react';
import { useRef } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },
    toggleGroup: {
        border: "0"
    },
    children: {
        paddingLeft: "10px",
    },
    disabled: {
        color: "black",
        borderBottom: 0,
        "&:before": {
            borderBottom: 0
        }
    },
    input: {
        color: "grey"
    },
    question_checked: {
        color: "#2a9d8f"
    },
    question_unchecked: {
        color: "textPrimary"
    }
}));

const QAItem = React.memo((props) => {
    const classes = useStyles();
    const originalContent = useSelector((state) => state.storybook.story.content[props.currPage].content);
    const MODE = useSelector(state => state.storybook.MODE)
    const dispatch = useDispatch();

    const questionRef = useRef('question')
    const answerRef = useRef('answer')

    const { config_selected, handleChangeConfigSelected, currPage, q_index } = props;

    const [selectedContent, setSelectedContent] = React.useState(originalContent);
    const [speaking, setSpeaking] = React.useState(false);
    const [editable, setEditable] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    var question, answer, start_idx, end_idx;
    if (props.qa_pair !== undefined) {
        question = props.qa_pair.question;
        answer = props.qa_pair.answer;
        start_idx = props.qa_pair.start_idx;
        end_idx = props.qa_pair.end_idx;
    } else {
        question = "No question";
        answer = "";
        start_idx = 0;
        end_idx = 0;
    }

    const [questionText, setQuestionText] = React.useState(question);
    // const [questionText, setQuestionText] = React.useState(props.qa_pair.question);
    const [answerText, setAnswerText] = React.useState(answer);

    const meta_key = parseInt(props.index / 3);
    const inputValue = useSelector((state) => state.storybook.userInput[currPage][meta_key]);

    const handleQuestionEval = (event, status) => {
        dispatch(evalQuestion({
            key: meta_key,
            status: status == "left" ? 1 : status == "right" ? 0 : -1,
            type: props.type
        }));
    };

    const highlightCorrespondingContent = (start_index, end_index) => {
        var content = originalContent;
        var highlighted_content = `${content.substring(0, start_index)}<span class='highlighted'>${content.substring(start_index, end_index)}</span>${content.substring(end_index)}`
        document.getElementById(`content${currPage}`).innerHTML = highlighted_content;
        return highlighted_content;
    }

    const restoreContent = () => {
        console.log({ originalContent, selectedContent })
        document.getElementById(`content${currPage}`).innerHTML = originalContent;
    }

    const onRecognitionChange = value => {
        console.log(meta_key, props.type)
        console.log("questionPanel: onRecognitionChange is called, q_index: "+String(q_index))
        dispatch(setInput({ value: value, key: meta_key, type: props.type }));
    };

    const onRecognitionEnd = () => {
        console.log("questionPanel: onRecognitionEnd is called")
        setSpeaking(false);
    };

    const onRecognitionStop = () => {
        console.log("questionPanel: onRecognitionStop is called")
        setSpeaking(false);
    };

    const recognition = new Recognition(
        onRecognitionChange,
        onRecognitionEnd,
        onRecognitionStop,
        'en'
    )


    const handleSpeak = () => {
        console.log("handleSpeak is called")
        recognition.speak();
        if (!speaking) setSpeaking(true);
    }

    const onQuestionChange = (event) => {
        setQuestionText(event.target.value)
    }

    const onAnswerChange = (event) => {
        setAnswerText(event.target.value)
    }

    const handleEdit = () => {
        // React.setState({ [event.target.name]: event.target.value });
        console.log("handleQuestionChange, q_index", q_index)
        dispatch(setQuestion({ currPage, q_index, question_name: questionRef.current.value }))
        dispatch(setAnswer({ currPage, q_index, answer: answerRef.current.value }))
    };


    // const handleAnswerChange = (event) => {
    //     // React.setState({ [event.target.name]: event.target.value });
    //     dispatch(setQuestion({ currPage, q_index, answer: event.target.value }))
    // };

    const handleQuestionSelected = (event) => {
        if (MODE == 1) {
            handleChangeConfigSelected(currPage, q_index);
            setChecked(!checked)
            console.log("handleQuestionSelected called")
        }
    }

    const ListItemWithWiderSecondaryAction = withStyles({
        secondaryAction: {
            paddingRight: 96
        }
    })(ListItem);

    useEffect(() => {
        if (config_selected[currPage][q_index] == true) {
            setChecked(true)
        }
    }, [])

    console.log("config_selected", config_selected)

    return (
        <div className={props.type != 0 ? classes.children : null}>
            {MODE === 0 ?
                <React.Fragment>
                    <ListItemWithWiderSecondaryAction
                        key={props.index}
                        alignItems="center"
                        button
                        selected={props.selected}
                        onMouseEnter={(e) => {
                            highlightCorrespondingContent(start_idx, end_idx);
                        }}
                        onClick={(e) => {
                            console.log(props.selected)
                            if (props.selected) {
                                dispatch(selectQuestion(''));
                                setSelectedContent(originalContent);
                                restoreContent();
                            }
                            else {
                                dispatch(selectQuestion(props.index));
                                setSelectedContent(highlightCorrespondingContent(start_idx, end_idx));
                            }
                        }}
                        onMouseLeave={() => { if (!props.selected) restoreContent(); }}
                    >

                        <Box pt={1}>
                            <Typography color="textSecondary" variant="subtitle2" >
                                {
                                    props.type == 0 ? `Q${meta_key + 1}` :
                                        props.type == 1 ? `Follow-up question to Q${meta_key + 1}` : `Rephrased Q${meta_key + 1}`
                                }
                            </Typography>
                            <Typography color="textPrimary" variant="subtitle1" >
                                {question}
                            </Typography>
                            {inputValue && inputValue[props.type] !== '' &&
                                <Typography color="textPrimary" variant="subtitle2">
                                    {inputValue[props.type]}
                                </Typography>
                            }
                        </Box>
                        <ListItemSecondaryAction
                        >
                            <Tooltip title={"View Answer"}>
                                <IconButton edge="end" onClick={() => dispatch(toggleQuestion(props.index))}>
                                    {props.toggled ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                                </IconButton>
                            </Tooltip>
                            <SpeechButton
                                onClick={handleSpeak}
                                speaking={speaking}
                            >
                                <Mic fontSize="small" />
                            </SpeechButton>
                        </ListItemSecondaryAction>
                    </ListItemWithWiderSecondaryAction >
                    <Collapse in={props.toggled} timeout="auto" unmountOnExit {...props}>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <Box px={2} pb={1}>
                                    <Typography color="textSecondary">
                                        {answer}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box px={2} pb={1}>
                                    <ToggleButtonGroup
                                        value={props.eval_status ? (props.eval_status[props.type] == 1 ? "left" : props.eval_status[props.type] == 0 ? "right" : "") : ""}
                                        onChange={handleQuestionEval}
                                        size="small"
                                        className={classes.toggleGroup}
                                        exclusive
                                    >
                                        <ToggleButton value="left" fontSize="small" style={{ outlineColor: 'red', outlineWidth: '0px' }}>
                                            <Check />
                                        </ToggleButton>
                                        <ToggleButton value="right" fontSize="small" style={{ outlineColor: 'red', outlineWidth: '0px' }}>
                                            <Clear />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Grid>
                        </Grid>
                    </Collapse>
                </React.Fragment>
                :
                <React.Fragment>
                    <ListItemWithWiderSecondaryAction
                        key={props.index}
                        alignItems="center"
                        onMouseEnter={(e) => {
                            highlightCorrespondingContent(start_idx, end_idx);
                        }}
                        onMouseLeave={() => { if (!props.selected) restoreContent(); }}
                    >

                        <Box pt={1}>
                            <Typography color="textSecondary" variant="subtitle2" >
                                {
                                    props.type == 0 ? `Q${meta_key + 1}` :
                                        props.type == 1 ? `Follow-up question to Q${meta_key + 1}` : `Rephrased Q${meta_key + 1}`
                                }
                            </Typography>
                            <TextField multiline
                                // value={questionText}
                                defaultValue={question}
                                disabled={!editable}
                                inputRef= {questionRef}
                                // onChange={onQuestionChange}
                                InputProps={{
                                    classes: {
                                        disabled: classes.disabled,
                                        // input: classes.question_unchecked
                                        // color: "#2a9d8f",
                                        input: config_selected[currPage][q_index] ? classes.question_checked : classes.question_unchecked
                                    },
                                }}
                            />

                            <TextField multiline defaultValue={answer} disabled={!editable}
                                // onChange={handleAnswerChange}
                                inputRef= {answerRef}
                                InputProps={{
                                    classes: {
                                        disabled: classes.disabled,
                                        input: config_selected[currPage][q_index] ? classes.question_checked : classes.question_unchecked
                                        //input: classes.input
                                    },
                                }} />
                        </Box>
                        <ListItemSecondaryAction>
                            {/* <IconButton edge="end" onClick={handleQuestionSelected}>
                                {!config_selected[currPage][q_index] ? <PlusOne fontSize="small" /> : <Check fontSize="small" />}

                            </IconButton> */}
                            <Checkbox
                                // defaultChecked
                                onChange={handleQuestionSelected}
                                color="primary"
                                checked={config_selected[currPage][q_index]}
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            {/* Generate a follow-up question */}
                            <IconButton
                                edge="end"
                                onClick={() => { setEditable(!editable); }}>
                                {editable ? <Check fontSize="small" onClick={() => handleEdit()} /> : <Edit fontSize="small" />}
                            </IconButton>
                            {/* Rephrase this question */}
                            {/* <IconButton edge="end">
                                <Delete fontSize="small" />
                            </IconButton> */}
                            {/* Delete this question */}
                        </ListItemSecondaryAction>
                    </ListItemWithWiderSecondaryAction >
                </React.Fragment>
            }
        </div >
    );
})

const QuestionPanel = (props) => {
    const classes = useStyles();

    const currPage = useSelector((state) => state.storybook.currPage);
    const questions = useSelector((state) => state.storybook.questions);
    const selected_questions = useSelector((state) => state.storybook.selected_questions);
    const MODE = useSelector((state) => state.storybook.MODE);
    const sim_qa_pairs = useSelector((state) => state.storybook.sim_questions);
    const rephrased_qa_pairs = useSelector((state) => state.storybook.rephrased_questions);
    const categories = useSelector((state) => state.config.categories);
    const filtered_categories = Object.keys(categories).filter((i) => categories[i])
        .map((s) => {
            switch (s) {
                case "place":
                    return "setting"
                case "causal":
                    return "causal relationship"
                case "outcome":
                    return "outcome resolution"
                default:
                    return s
            }
        });

    const selectedIndex = useSelector((state) => state.storybook.selected);
    const toggledIndex = useSelector((state) => state.storybook.toggled);
    // const configSelected = useSelector( (state) => state.storybook.configSelected);
    const eval_status = useSelector((state) => state.storybook.evaluation[currPage]);

    // console.log("configSelected: ", configSelected)
    console.log("MODE: ", MODE)

    console.log("props", props)
    // console.log("QuestionPanel config_selected", props.config_selected)

    React.useEffect(() => {
        console.log()
    })

    return (

        <List className={classes.root}>
            {
                questions[currPage].qa_pair_list.length === 0 || currPage == 0 ?
                    <Box px={2} py={2}>
                        <Typography variant="substitle2" color="textSecondary">
                            No questions on this page
                        </Typography>
                    </Box>
                    :
                    questions[currPage].qa_pair_list.filter((i) => filtered_categories.filter(x => i.category.includes(x)).length > 0).map((qa_pair, key) => {

                        if (key > 2) {
                            return
                        }

                        // const q_index = findQuestionIndexByName(currPage, qa_pair['question'])

                        return (
                            <React.Fragment>
                                {
                                    props.config_selected[currPage] &&
                                    <QAItem eval_status={eval_status ? eval_status[key] : null} type={0} qa_pair={qa_pair} index={key * 3} toggled={toggledIndex.indexOf(key * 3) !== -1} currPage={currPage} q_index={key} config_selected={props.config_selected} handleChangeConfigSelected={props.handleChangeConfigSelected} selected={selectedIndex === key * 3} />
                                }
                                {(eval_status[key][0] >= 0 && props.config_selected[currPage]) &&
                                    <QAItem eval_status={eval_status ? eval_status[key] : null} type={1} qa_pair={sim_qa_pairs[currPage].filter((qa) => { console.log("sim qa", qa.question) ; console.log("qa-pair", qa_pair.question) ; return qa.question === qa_pair.question})[0].follow_ups[0]} config_selected={props.config_selected} handleChangeConfigSelected={props.handleChangeConfigSelected} currPage={currPage} q_index={key} index={key * 3 + 1} toggled={toggledIndex.indexOf(key * 3 + 1) !== -1} />
                                }
                                <Divider component="li" />
                            </React.Fragment>
                        )
                    })
            }
        </List >
    )
}

export default QuestionPanel;