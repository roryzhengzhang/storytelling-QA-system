import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Card,
    Box,
    CardHeader,
    CardContent,
    Typography,
    withStyles,
    IconButton,
    Icon,
    Link,
    CardMedia,
    Button,
    Zoom,
    Tooltip,
    SvgIcon,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider,
    ListItemSecondaryAction,
    ListSubheader,
    Collapse
} from '@material-ui/core';
import { PlayArrow, PlusOne, Check, Clear, Autorenew, Delete, ExpandLess, ExpandMore } from '@material-ui/icons';
import Carousel from 'react-material-ui-carousel'
import Speech from 'react-speech';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        display: "flex",
        // width: "80vw",
        height: "70vh"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: "1 0 50%"
    },
    content: {
        flexGrow: "1",
        // flexBasis: "50%",
        margin: "1em 1em 1em 0em",
        display: "flex"
    },
    cover: {
        flexGrow: "1",
        flexBasis: "50%",
        display: "flex"
    },
    text: {
        fontSize: "2em",
        alignSelf: "center",
        whiteSpace: 'pre-line'
    },
    pic: {
        objectFit: "contain"
    },
    grid: {
        padding: "1em"
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 64,
        width: 64,
    },
    desktopButtons: {
        color: "white",
        backgroundColor: "#00529b",
        margin: "auto",
        width: "50%",
        padding: "20px !important",
    }
}));

const sampleStory = {
    title: "The Hare and the Tortoise", cover: "/img/the_hare_and_the_tortoise.png", content: [
        {
            pic: process.env.PUBLIC_URL + "/img/the_hare_and_the_tortoise.png",
            content: "The Hare and the Tortoise"
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht1.png",
            content: "Once there was a hare who was always boasting. He said to the other animals, 'Look how fast I can run! No one can run faster than me!'"
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht2.png",
            content: "The tortoise got tired of the hare's boasting. He said, 'I will race you.' \n The hare laughed and laughed. The tortoise moved very slowly. How could he beat the hare?"
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht2.png",
            content: "The hare said, 'OK, slowpoke. Let's race. I will dance around you all the way'. \n The tortoise just said, 'Don't boast until the race is over.'"
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht3.png",
            content: "Once the race began, the hare ran very fast. Soon he was so far ahead that he stopped to take a nap."
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht3.png",
            content: "The tortoise kept going. Slow and steady, slow and steady. \n He went past the sleeping hare. Slow and steady, slow and steady."
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht3.png",
            content: "When the hare woke up, the tortoise was almost at the finish line. \n The hare ran as fast as he could.\n But it was too late. The tortoise won the race."
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht4.png",
            content: "Once the race began, the hare ran very fast. Soon he was so far ahead that he stopped to take a nap."
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht5.png",
            content: "The hare was sad. He was ashamed of himself for losing the race. \n The tortoise said to the hare. 'Slow and steady wins the race. \n But cheer up! You are a very fast runner. \n I am sure you will win next time ifyou run instead of showing off.'"
        },
        {
            pic: process.env.PUBLIC_URL + "/img/ht5.png",
            content: "The hare learnt his lesson. From that day on, he stopped boasting. \n And he and the tortoise became the best of friends."
        },
    ]
}

const sampleQuestions = [
    [{ question: "What do you think might happen in this story?", answer: "", start_index: 6, end_index: 12 }],
    [{ question: "What did the hare think of himself?", answer: "He runs very fast." }],
    [{ question: "What did the tortoise say to the hare?", answer: "He will race the hare." }, { question: "Why did the hare laugh?", answer: "The tortoise moved very slowly." }],
    [{ question: "Who was called 'Slowpoke?'", answer: "The tortoise" }],
    [],
    [],
    [],
    [],
    [],
    []
]



const StoryPage = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={2} variant="outlined">
            <div className={classes.cover}>
                <img src={props.pic} className={classes.pic}></img>
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography className={classes.text} component="div" variant="subtitle1">
                        {props.content}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="play/pause">
                        <Speech
                            textAsButton={true}
                            displayText={
                                <PlayArrow className={classes.playIcon} />
                            }
                            text={props.content}
                            lang="en-US"
                            voice="Google UK English Female" />
                    </IconButton>
                    <IconButton aria-label="show/hide questions">

                    </IconButton>
                </div>
            </div>
        </Card>

    )
}

const QuestionCard = (props) => {
    const classes = useStyles();

    const [toggledIndex, setToggledIndex] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState('');

    const handleToggle = (value) => () => {
        setToggledIndex(toggledIndex === value ? '' : value);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(selectedIndex === index ? '' : index);
    }

    return (
        <Card className={classes.card} variant="outlined">
            <List className={classes.root} subheader={
                <ListSubheader component="div">
                    Question Panel
                </ListSubheader>
            }>
                {
                    sampleQuestions[props.pageNo].map((qa, key) =>
                        [<ListItem
                            alignItems="flex-start"
                            button
                            // selected={selectedIndex === key}
                            onClick={(event) => { handleListItemClick(event, key) }}
                        >
                            <ListItemText
                                primary={qa.question}
                                secondary={
                                    qa.answer
                                }
                            />
                            <Tooltip title={"Correct"}>
                                <IconButton edge="end">
                                    <Check />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Wrong"}>
                                <IconButton edge="end">
                                    <Clear />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Additional Options"}>
                                <IconButton edge="end" onClick={handleToggle(key)}>
                                    {toggledIndex === key ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </Tooltip>
                        </ListItem>,
                        <Collapse in={toggledIndex === key} timeout="auto" unmountOnExit>
                            <Tooltip title={"Generate a similar question"}>
                                <IconButton>
                                    <PlusOne />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Rephrase this question"}>
                                <IconButton>
                                    <Autorenew />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={"Delete this question"}>
                                <IconButton>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Collapse>,
                        <Divider component="li" />]
                    )
                }

            </List >

        </Card >
    )
}

export default function StoryBook(props) {
    const classes = useStyles();


    const [currentPageNo, setCurrentPageNo] = React.useState(0);


    const generateHighlight = (content, start_index, end_index) => (
        <Box>
            {content.substring(0, start_index)}
            <Box fontWeight="fontWeightBold">
                {content.substring(start_index, end_index - start_index)}
            </Box>
            {content.substring(end_index)}
        </Box>
    )


    return (
        <Grid container>
            <Grid container item className={classes.grid}>
                <Typography variant="h4"> {sampleStory.title} </Typography>
            </Grid>
            <Grid container>
                <Grid item className={classes.grid} xs={12} sm={9}>
                    <Carousel
                        autoPlay={false}
                        indicators={false}
                        navButtonsAlwaysVisible={true}
                        cycleNavigation={false}
                        swipe={true}
                        next={() => { setCurrentPageNo(currentPageNo + 1) }}
                        prev={() => { setCurrentPageNo(currentPageNo - 1) }}
                    >
                        {
                            sampleStory.content.map((section, i) => <StoryPage key={i} pic={section.pic} content={section.content} />)
                        }
                    </Carousel>
                </Grid>

                <Grid item className={classes.grid} xs={12} sm={3}>
                    <QuestionCard pageNo={currentPageNo} />
                </Grid>
            </Grid >
        </Grid>

    );
}