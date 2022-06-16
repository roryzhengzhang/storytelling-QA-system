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
import { prevPage, resetPage, nextPage, nextPageWhenConfig, setConfig, getSectionQuestionSetSize } from "./storybookSlice";
import StoryPage from "./StoryPage";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Help, QuestionAnswer } from '@material-ui/icons';

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

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            style={{ height: "62vh", overflow: props.type == 1 ? "overlay" : "hidden" }}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

export default function Workplace(props) {

    const MODE = useSelector(state => state.storybook.MODE);

    const { config_selected, currPage, handleChangeConfigSelected, handleNextPageConfig } = props;

    const [ dummyState, setdummyState ] = useState();
    const [ chatbotKey, setChatbotKey ] = useState(1);

    const classes = useStyles();
    const history = useHistory();
    const story = useSelector((state) => state.storybook.story);
    const isConfig = useSelector(state => state.storybook.isConfig);
    const everPlayed = useSelector(state => state.storybook.everPlayed);
    const dispatch = useDispatch();

    useEffect(() => {
        setdummyState([])
    }, [currPage])

    let tabStyle = {
        minWidth: 50,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: "white"
    };

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    const handleNext = () => {
        if (isConfig) {
            handleNextPageConfig();
        }
        else {
            dispatch(nextPage());
        }

        if (MODE == 0) {
            setTabIndex(0);
        }

        setChatbotKey(chatbotKey+1);
    }

    return (
        <Grid container>
            <Grid item className={classes.grid} xs={12} sm={9}>
                <Carousel
                    index={currPage}
                    autoPlay={false}
                    indicators={false}
                    navButtonsAlwaysVisible
                    cycleNavigation={false}
                    swipe={true}
                    next={() => handleNext()}
                    prev={() => { dispatch(prevPage()); }}
                >
                    {
                        story.content.map((section, i) => <StoryPage index={i} pic={section.pic} content={section.content} hidePlay={props.hidePlay} />)
                    }
                </Carousel>
            </Grid>

            <Grid item className={classes.grid} xs={12} sm={3}>
                <Card className={classes.card} variant="outlined" style={MODE == 1 ? { overflow: 'overlay' } : {}}>
                    {props.hideQuestion && everPlayed ?  <ChatbotPanel key={chatbotKey} config_selected={config_selected} /> :
                        props.hideQuestion && !everPlayed ? <React.Fragment> </React.Fragment> :
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
        </Grid >
    )
}