import React from 'react';
import DrawerAndNavbar from '../../modules/DrawerAndNavbar';
import { Typography, Paper, Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@material-ui/core';
import StoryBook from '../../modules/StoryBook';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        marginRight: "auto",
        marginLeft: "auto"
    },
    content: {
        padding: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        width: "60%",
        maxWidth: 800
    }
}));

function StoryDisplay(props) {

    const classes = useStyles();

    const location = useLocation();

    const MODE = useSelector(state => state.storybook.MODE)

    const storyContent = (
        <div className={classes.paper} >
            {
                MODE === 1 ?
                    <StoryBook className={classes.card} hideQuestion={MODE === 1} question_selected={location.state.questionSelected}>
                        The API documentation of the Paper React component. Learn more about the props and the CSS customization points.
                    </StoryBook> :
                    <StoryBook className={classes.card} hideQuestion={MODE === 1}>
                        The API documentation of the Paper React component. Learn more about the props and the CSS customization points.
                    </StoryBook>
            }

        </div>
    );


    return (
        <DrawerAndNavbar content={storyContent} />
    );
}

export default {
    routeProps: {
        path: "/storydisplay",
        component: StoryDisplay
    },
    name: 'StoryDisplay'
};