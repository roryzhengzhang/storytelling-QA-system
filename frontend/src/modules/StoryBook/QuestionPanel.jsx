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
    Grid
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { PlusOne, Check, Clear, Delete, ExpandLess, ExpandMore, MoreVert, Mic, Edit } from '@material-ui/icons';
import { evalQuestion, toggleQuestion, selectQuestion, setInput } from './storybookSlice';
import { useSelector, useDispatch } from 'react-redux';
import Recognition from '../Chatbot/recognition';
import { SpeechButton } from '../Chatbot/components'
import { MODE } from "../../config"
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
    }
}));

const QAItem = (props) => {
    const classes = useStyles();
    const currPage = useSelector((state) => state.storybook.currPage);
    const originalContent = useSelector((state) => state.storybook.story.content[currPage].content);
    const dispatch = useDispatch();

    const [selectedContent, setSelectedContent] = React.useState(originalContent);
    const [speaking, setSpeaking] = React.useState(false);

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
        dispatch(setInput({ value: value, key: meta_key, type: props.type }));
    };

    const onRecognitionEnd = () => {
        setSpeaking(false);
    };

    const onRecognitionStop = () => {
        setSpeaking(false);
    };

    const recognition = new Recognition(
        onRecognitionChange,
        onRecognitionEnd,
        onRecognitionStop,
        'en'
    )


    const handleSpeak = () => {
        recognition.speak();
        if (!speaking) setSpeaking(true);
    }


    const ListItemWithWiderSecondaryAction = withStyles({
        secondaryAction: {
            paddingRight: 96
        }
    })(ListItem);



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
                            highlightCorrespondingContent(props.qa_pair.start_idx, props.qa_pair.end_idx);
                            console.log({ meta_key, inputValue })
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
                                var hct = highlightCorrespondingContent(props.qa_pair.start_idx, props.qa_pair.end_idx);
                                console.log(hct)
                                setSelectedContent(hct);
                                console.log(selectedContent);
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
                                {props.qa_pair.question}
                            </Typography>
                            {inputValue && inputValue[props.type] !== '' &&
                                <Typography color="primary" variant="subtitle2">
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
                                        {props.qa_pair.answer}
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
                        button
                        selected={props.selected}
                        onMouseEnter={(e) => {
                            highlightCorrespondingContent(props.qa_pair.start_idx, props.qa_pair.end_idx);
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
                                var hct = highlightCorrespondingContent(props.qa_pair.start_idx, props.qa_pair.end_idx);
                                console.log(hct)
                                setSelectedContent(hct);
                                console.log(selectedContent);
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
                            <ListItemText primary={props.qa_pair.question} secondary={props.qa_pair.answer} />
                        </Box>
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <PlusOne fontSize="small" />
                            </IconButton>
                            {/* Generate a follow-up question */}
                            <IconButton edge="end">
                                <Edit fontSize="small" />
                            </IconButton>
                            {/* Rephrase this question */}
                            <IconButton edge="end">
                                <Delete fontSize="small" />
                            </IconButton>
                            {/* Delete this question */}
                        </ListItemSecondaryAction>
                    </ListItemWithWiderSecondaryAction >
                </React.Fragment>
            }
        </div >
    );
}

const QuestionPanel = (props) => {
    const classes = useStyles();

    const currPage = props.pageNo;
    const questions = useSelector((state) => state.storybook.questions);
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
    const eval_status = useSelector((state) => state.storybook.evaluation[currPage]);

    React.useEffect(() => {
        console.log()
    })

    return (

        <List className={classes.root}>
            {
                questions[currPage].qa_pair_list.length === 0 ?
                    <Box px={2} py={2}>
                        <Typography variant="substitle2" color="textSecondary">
                            No questions on this page
                        </Typography>
                    </Box>
                    :
                    questions[currPage].qa_pair_list.filter((i) => filtered_categories.filter(x => i.category.includes(x)).length > 0).map((qa_pair, key) =>
                        <React.Fragment>
                            <QAItem eval_status={eval_status ? eval_status[key] : null} type={0} qa_pair={qa_pair} index={key * 3} toggled={toggledIndex.indexOf(key * 3) !== -1} selected={selectedIndex === key * 3} />
                            {eval_status[key][0] >= 0 &&
                                <QAItem eval_status={eval_status ? eval_status[key] : null} type={1} qa_pair={sim_qa_pairs[currPage].filter((qa) => qa.question === qa_pair.question)[0].follow_ups[0]} index={key * 3 + 1} toggled={toggledIndex.indexOf(key * 3 + 1) !== -1} />
                            }
                            <Divider component="li" />
                        </React.Fragment>
                    )
            }
        </List >
    )
}

export default QuestionPanel;