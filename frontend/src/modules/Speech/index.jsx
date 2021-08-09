import React from 'react';

const useStyles = makeStyles((theme) => ({
    controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}))

const TextToSpeech = (props) => {

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
        <div className={classes.controls}>
            {
                play ? <IconButton aria-label="pause" onClick={handlePause} className={classes.playIcon} style={styles.button} iconStyle={styles.icon}>
                    <PauseIcon fontSize="large" />
                </IconButton> : <IconButton aria-label="play" onClick={handlePlay} className={classes.playIcon} style={styles.button} iconStyle={styles.icon}>
                    <PlayArrowIcon fontSize="large" />
                </IconButton>
            }
        </div>
    )
}

export default { TextToSpeech };