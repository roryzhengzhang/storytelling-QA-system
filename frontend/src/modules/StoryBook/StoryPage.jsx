import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Grid
} from '@material-ui/core';
import axios from 'axios';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        // width: "80vw",
        height: "70vh",
    },
    content: {
        flexGrow: "1",
        // flexBasis: "50%",
        margin: "1em 1em 1em 0em",
        display: "flex"
    },
    cover: {
        flex: "1 0 50%"
    },
    text: {
        fontSize: "1.5em",
        alignSelf: "center",
        whiteSpace: 'pre-line'
    },
    pic: {
        objectFit: "contain",
        maxWidth: "100%",
        maxHeight: "70vh",
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        position: "absolute",
        bottom: "0",
        right: '15%'
    },
    playIcon: {
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: "1 0 50%"
    },
    textPanel: {
        maxHeight: '70vh',
        overflowY: 'auto',
        overflowX: 'clip'
    }
}));

const styles = {
    button: {
        width: 64, height: 64,
        padding: 0
    },
    icon: {
        fontSize: 40,
    }
};



const StoryPage = (props) => {
    const classes = useStyles();
    const [tts, setTts] = React.useState('');
    const [play, setPlay] = React.useState(false);

    const ttsRequest = {
        "audioConfig": {
            "audioEncoding": "LINEAR16",
            "pitch": 2,
            "speakingRate": 0.9
        },
        "input": {
            "text": `${props.content}`
        },
        "voice": {
            "languageCode": "en-US",
            "name": "en-US-Wavenet-F"
        }
    }

    const handlePlay = () => {
        if (!tts) return;
        tts.play();
        setPlay(true);
    }

    const handlePause = () => {
        if (!tts) return;
        tts.pause();
        setPlay(false);
    }

    React.useEffect(() => {
        axios
            .post('https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDbAoO-MIi1PFP64Rfxvho7jN4DB2qTb5M', ttsRequest)
            .then(response => {
                var audio = new Audio("data:audio/wav;base64," + response.data.audioContent);
                audio.onended = () => { setPlay(false) };
                setTts(audio);
            })
    }, [])

    return (
        <Card className={classes.card} elevation={2} variant="outlined">
            <Grid container alignItems="top" justifyContent="top">
                <Grid container item justify="center" alignItems="center" xs={8}>
                    <img src={props.pic} className={classes.pic}></img>
                </Grid>
                <Grid container alignContent="baseline" item xs={4} className={classes.textPanel}>
                    <CardContent className={classes.content}>
                        <Typography className={classes.text} component="div" variant="subtitle1" id={`content${props.index}`}>
                            {props.content}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        {
                            play ? <IconButton aria-label="pause" onClick={handlePause} className={classes.playIcon} style={styles.button} iconStyle={styles.icon}>
                                <PauseIcon fontSize="large" />
                            </IconButton> : <IconButton aria-label="play" onClick={handlePlay} className={classes.playIcon} style={styles.button} iconStyle={styles.icon}>
                                <PlayArrowIcon fontSize="large" />
                            </IconButton>
                        }
                    </div>
                </Grid>

            </Grid>

            {/* <div className={classes.cover}>
                <img src={props.pic} className={classes.pic}></img>
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography className={classes.text} component="div" variant="subtitle1">
                        {props.content}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    {
                        play ? <IconButton aria-label="pause" onClick={handlePause} className={classes.playIcon} style={styles.button} iconStyle={styles.icon}>
                            <PauseIcon fontSize="large" />
                        </IconButton> : <IconButton aria-label="play" onClick={handlePlay} className={classes.playIcon} style={styles.button} iconStyle={styles.icon}>
                            <PlayArrowIcon fontSize="large" />
                        </IconButton>
                    }
                </div>
            </div> */}
        </Card>

    )
}

export default StoryPage;