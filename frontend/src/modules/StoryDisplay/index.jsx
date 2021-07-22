import React from 'react';
import DrawerAndNavbar from '../DrawerAndNavbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import StoryCard from '../StoryCard';
import { styled } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

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

    const storyContent = (
        <div className={classes.paper} >
            <StoryCard className={classes.card} imgSrc={process.env.PUBLIC_URL + '/cartoon1.jpg'}>
                The API documentation of the Paper React component. Learn more about the props and the CSS customization points.
            </StoryCard>
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