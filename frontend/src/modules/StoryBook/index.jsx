import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Box,
    Typography,
    Grid,
    Tabs,
    Tab,
    Card
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import QuestionPanel from "./QuestionPanel";
import ChatbotPanel from "./ChatbotPanel"
import StoryPage from "./StoryPage";
import { prevPage, nextPage } from "./storybookSlice";
import { useSelector, useDispatch } from 'react-redux';
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
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    // console.log(document.querySelectorAll('[role="tablist"]')[0].style.height)

    // var tab = document.querySelectorAll('[role="tablist"]')[0];
    // var tab_height = parseFloat(document.defaultView.getComputedStyle(tab).height);
    // var height = document.documentElement.clientHeight * 0.7 - tab_height;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            style={{ height: "62vh", overflow: props.type == 1 ? "auto" : "hidden" }}
        >
            {value === index && (
                children
            )}
        </div>
    );
}


export default function StoryBook(props) {
    const classes = useStyles();

    const story = useSelector((state) => state.storybook.story);
    const currPage = useSelector((state) => state.storybook.currPage);
    const dispatch = useDispatch();


    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    let tabStyle = {
        minWidth: 50,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: "white"
    };

    return (
        <Grid container>
            <Grid container item className={classes.grid}>
                <Typography variant="h4"> {story.title} </Typography>
            </Grid>
            <Grid container>
                <Grid item className={classes.grid} xs={12} sm={9}>
                    <Carousel
                        index={currPage}
                        autoPlay={false}
                        indicators={false}
                        navButtonsAlwaysVisible={true}
                        cycleNavigation={false}
                        swipe={true}
                        next={() => { dispatch(nextPage()); }}
                        prev={() => { dispatch(prevPage()); }}
                    >
                        {
                            story.content.map((section, i) => <StoryPage index={i} pic={section.pic} content={section.content} />)
                        }
                    </Carousel>
                </Grid>

                <Grid item className={classes.grid} xs={12} sm={3}>
                    <Card className={classes.card} variant="outlined">
                        <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" variant="fullWidth"
                            textColor="primary">
                            <Tab style={tabStyle} className={classes.tab} fontSize="small" label="Question Panel" wrapped icon={<Help />} />
                            <Tab style={tabStyle} className={classes.tab} fontSize="small" label="Chatbot Panel" wrapped icon={<QuestionAnswer />} />
                        </Tabs>
                        <TabPanel value={tabIndex} index={0} type={1}>
                            <QuestionPanel pageNo={currPage} />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1} type={2}>
                            <ChatbotPanel />
                        </TabPanel>

                    </Card>
                </Grid>
            </Grid >
        </Grid>

    );
}