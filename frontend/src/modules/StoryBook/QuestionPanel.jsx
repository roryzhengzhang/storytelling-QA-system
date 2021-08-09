import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Card,
    Box,
    Typography,
    IconButton,
    Tooltip,
    List,
    ListItem,
    ListItemSecondaryAction,
    Divider,
    Collapse,
    Menu,
    MenuItem,
    ListItemIcon,
    Grid,
    Slide,
    Paper
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { PlusOne, Check, Clear, Autorenew, Delete, ExpandLess, ExpandMore, MoreVert } from '@material-ui/icons';
import PopupState, {
    anchorRef,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state'
import { evalQuestion, toggleQuestion, selectQuestion } from './storybookSlice';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    toggleGroup: {
        border: "0"
    }

}));

const QAItem = (props) => {
    const classes = useStyles();
    const currPage = useSelector((state) => state.storybook.currPage);
    const originalContent = useSelector((state) => state.storybook.story.content[currPage].content);
    const dispatch = useDispatch();

    const [selectedContent, setSelectedContent] = React.useState(originalContent);

    const meta_key = parseInt(props.index / 3);

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

    const ListItemWithWiderSecondaryAction = withStyles({
        secondaryAction: {
            paddingRight: 96
        }
    })(ListItem);



    return (
        // <PopupState variant="popover" popupId="demoMenu">
        //     {(popupState) => (
        <React.Fragment>
            <ListItemWithWiderSecondaryAction
                key={props.index}
                alignItems="center"
                button
                selected={props.selected}
                onMouseEnter={(e) => {
                    highlightCorrespondingContent(props.qa_pair.start_idx, props.qa_pair.end_idx)
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
            // ContainerProps={{ ref: anchorRef(popupState) }}
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
                </Box>
                <ListItemSecondaryAction
                >
                    <Tooltip title={"View Answer"}>
                        <IconButton edge="end" fontSize="small" onClick={() => dispatch(toggleQuestion(props.index))}>
                            {props.toggled ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Tooltip>
                    {
                        props.type == 0 &&
                        (<Tooltip title={"Additional Options"}>
                            <IconButton
                            // {...bindTrigger(popupState)}
                            >
                                <MoreVert fontSize="small" />
                                <Menu
                                    // {...bindMenu(popupState)}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuItem>
                                        <ListItemIcon>
                                            <PlusOne fontSize="small" />
                                        </ListItemIcon>
                                        <Typography variant="inherit" fontSize="small" >Generate a follow-up question</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Autorenew fontSize="small" />
                                        </ListItemIcon>
                                        <Typography variant="inherit">Rephrase this question</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Delete fontSize="small" />
                                        </ListItemIcon>
                                        <Typography variant="inherit">
                                            Delete this question
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </IconButton>
                        </Tooltip>)
                    }
                </ListItemSecondaryAction>
            </ListItemWithWiderSecondaryAction>
            <Collapse in={props.toggled} timeout="auto" unmountOnExit>
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
                                className="toggleGroup"
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
        </React.Fragment >
        //     )}
        // </PopupState>
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
        console.log(filtered_categories);

    })

    return (

        <List className={classes.root}>
            {
                questions[currPage].qa_pairs.length === 0 ?
                    <Box px={2} py={2}>
                        <Typography variant="substitle2" color="textSecondary">
                            No questions on this page
                        </Typography>
                    </Box>
                    :
                    questions[currPage].qa_pairs.filter((i) => filtered_categories.indexOf(i.type) !== -1).map((qa_pair, key) =>
                        [<QAItem eval_status={eval_status ? eval_status[key] : null} type={0} qa_pair={qa_pair} index={key * 3} toggled={toggledIndex.indexOf(key * 3) !== -1} selected={selectedIndex === key * 3} />,
                        // <Slide direction="down" in={eval_status[key][0] == 1} mountOnEnter unmountOnExit>
                        //     {sim_qa_pairs && sim_qa_pairs.length > currPage && sim_qa_pairs[currPage].length > key &&
                        //         (<QAItem eval_status={eval_status[key]} type={1} qa_pair={sim_qa_pairs[currPage][key]} key={key * 3 + 1} toggled={toggledIndex.indexOf(key * 3 + 1) !== -1} />)}
                        // </Slide>,
                        // <Slide direction="down" in={eval_status[key][0] == 0} mountOnEnter unmountOnExit>
                        //     {rephrased_qa_pairs && rephrased_qa_pairs.length > currPage && rephrased_qa_pairs[currPage].length > key &&
                        //         (<QAItem eval_status={eval_status[key]} type={2} qa_pair={rephrased_qa_pairs[currPage][key]} key={key * 3 + 2} toggled={toggledIndex.indexOf(key * 3 + 2) !== -1} />)}
                        // </Slide>,
                        <Divider component="li" />
                        ]
                    )
            }
        </List >
    )
}

export default QuestionPanel;