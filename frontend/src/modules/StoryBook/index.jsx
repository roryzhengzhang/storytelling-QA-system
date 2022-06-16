import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Box,
    Typography,
    Grid,
    Tabs,
    Tab,
    Card,
    Button
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import QuestionPanel from "./QuestionPanel";
import ChatbotPanel from "./ChatbotPanel";
import { useState } from 'react';
import StoryPage from "./StoryPage";
import Workplace from './Workplace';
import { prevPage, resetPage, nextPage, nextPageWhenConfig, setConfig, getSectionQuestionSetSize } from "./storybookSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Help, QuestionAnswer } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grid: {
        padding: "1em"
    },
    tab: {
        textTransform: "none",
        height: "5vh"
    },
    card: {
        width: "100%",
        height: "70vh"
    }
}));



export default function StoryBook(props) {
    const classes = useStyles();
    const history = useHistory();
    const story = useSelector((state) => state.storybook.story);
    const MODE = useSelector(state => state.storybook.MODE)
    const currPage = useSelector((state) => state.storybook.currPage);
    const storyName = useSelector((state) => state.storybook.storyName);
    const isConfig = useSelector(state => state.storybook.isConfig);
    const dispatch = useDispatch();

    const init_selected_array = new Array(getSectionQuestionSetSize(0, storyName)).fill(false);
    // console.log("init selected array", init_selected_array)
    var config_init = []
    config_init.push(init_selected_array)
    // console.log("config_init.push(init_selected_array)", config_init)

    const [config_selected, setConfigSelection] = useState([]);

    console.log("config selected beginning", config_selected)

    const [tabIndex, setTabIndex] = React.useState(0);

    const [curr_fartherest_index, setFarthestIndex] = React.useState(0);

    console.log("isConfig", isConfig)

    useEffect(() => {

        if (props.question_selected) {
            setConfigSelection([...props.question_selected])
        } else {
            const init_selected_array = new Array(getSectionQuestionSetSize(0, storyName)).fill(false);
            // console.log("init selected array", init_selected_array)
            var config_init = []
            config_init.push(init_selected_array)
            setConfigSelection([...config_init])

            // var init_selected = [];
            // for (let i = 0; i < story.content.length; i++) {
            //     const question_size = getSectionQuestionSetSize(i, storyName)
            //     if (question_size > -1) {
            //         init_selected.push(new Array(question_size).fill(false));
            //     } else {
            //         init_selected.push(new Array(1).fill(false));
            //     }

            //     console.log("init_selected", init_selected)
            // }



            // setConfigSelection([...init_selected])
        }


    }, [])

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const handleProceeding = (event) => {
        dispatch(setConfig())
        dispatch(resetPage())

        var tmp = [...config_selected]

        if (config_selected.length < story.content.length) {
            for (let i = config_selected.length; i < story.content.length; i++) {
                var new_selected = [...config_selected]
                const question_size = getSectionQuestionSetSize(i, storyName)
                if (question_size > -1) {
                    var array = new Array(question_size).fill(false).fill(true, 0, 1)
                    console.log("array", array)
                    tmp.push( [...array] )
                    // new_selected[i][0] = true
                } else {
                    tmp.push( new Array(0).fill(false) )
                }
            }
        }

        history.push({
            pathname: '/storydisplay',
            state: { questionSelected: tmp }
        })
    }

    const handleChangeConfigSelected = (page, index) => {
        // console.log("config_selected next", config_selected)
        var new_selected = [...config_selected]
        const selected_status = new_selected[page][index]
        new_selected[page][index] = !selected_status

        setConfigSelection([...new_selected])
    }

    const handleNextPageConfig = () => {
        console.log("config_selected next", config_selected)
        var new_selected = [...config_selected]
        // const curr_fartherest_index = new_selected.length - 1
        console.log("curr_fartherest_page", curr_fartherest_index)
        console.log("curr page", currPage)
        if (currPage + 1 > curr_fartherest_index) {
            const question_size = getSectionQuestionSetSize(currPage + 1, storyName)
            if (question_size > -1) {
                new_selected[currPage + 1] = new Array(question_size).fill(false)
                new_selected[currPage + 1][0] = true
            }
            setConfigSelection([...new_selected])
            // console.log("Config Selection", config_selected)
        }

        setFarthestIndex(curr_fartherest_index < currPage + 1 ? currPage + 1 : curr_fartherest_index)

        dispatch(nextPage())
    }

    let tabStyle = {
        minWidth: 50,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: "white"
    };

    return (
        config_selected && (
            <Grid container>
                <Grid container item className={classes.grid}>
                    <Grid item className={classes.grid} xs={9}>
                        <Typography variant="h4"> {story.title} (<span style={{ fontStyle: 'italic' }}>{currPage + 1}/{story.content.length} pages)</span></Typography>
                    </Grid>
                    {
                        // (props.hideChatbot && currPage == story.content.length - 1) &&
                        props.hideChatbot &&
                        <Grid container item className={classes.grid} xs={3} justifyContent="flex-end">
                            <Button onClick={handleProceeding} variant="outlined" color="secondary">
                                Proceed to Read the Story
                            </Button>
                        </Grid>
                    }
                </Grid>
                <Workplace config_selected={config_selected} currPage={currPage} handleChangeConfigSelected={handleChangeConfigSelected} handleNextPageConfig={handleNextPageConfig} hideChatbot={props.hideChatbot} hideQuestion={props.hideQuestion} />
                {/* <Grid container>
                    <Grid item className={classes.grid} xs={12} sm={9}>
                        <Carousel
                            index={currPage}
                            autoPlay={false}
                            indicators={false}
                            navButtonsAlwaysVisible
                            cycleNavigation={false}
                            swipe={true}
                            next={() => { isConfig ? handleNextPageConfig() : dispatch(nextPage()); }}
                            prev={() => { dispatch(prevPage()); }}
                        >
                            {
                                story.content.map((section, i) => <StoryPage index={i} pic={section.pic} content={section.content} hidePlay={props.hidePlay} />)
                            }
                        </Carousel>
                    </Grid>

                    <Grid item className={classes.grid} xs={12} sm={3}>
                        <Card className={classes.card} variant="outlined" style={MODE == 1 ? { overflow: 'overlay' } : {}}>
                            {props.hideQuestion ? <ChatbotPanel config_selected={config_selected} /> :
                                props.hideChatbot ? <QuestionPanel pageNo={currPage} config_selected={config_selected} handleChangeConfigSelected={handleChangeConfigSelected} /> :
                                    <React.Fragment>
                                        <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" variant="fullWidth"
                                            textColor="primary">
                                            <Tab style={tabStyle} className={classes.tab} fontSize="small" label="Question Panel" wrapped icon={<Help />} />
                                            <Tab style={tabStyle} className={classes.tab} fontSize="small" label="Chatbot Panel" wrapped icon={<QuestionAnswer />} />
                                        </Tabs>
                                        <TabPanel value={tabIndex} index={0} type={1}>
                                            <QuestionPanel hidePlay={true} pageNo={currPage} config_selected={config_selected} handleChangeConfigSelected={handleChangeConfigSelected} />
                                        </TabPanel>
                                        <TabPanel value={tabIndex} index={1} type={2}>
                                            <ChatbotPanel config_selected={config_selected} />
                                        </TabPanel>
                                    </React.Fragment>
                            }
                        </Card>
                    </Grid>
                </Grid > */}
            </Grid >
        )
    );
}