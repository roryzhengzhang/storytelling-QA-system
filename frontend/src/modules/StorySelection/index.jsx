import React from 'react';
import DrawerAndNavbar from '../DrawerAndNavbar';
// import SearchBar from "material-ui-search-bar";
import StoryCard from '../StoryCard';
import { styled, makeStyles } from "@material-ui/core/styles";
import { GridList, Box, Typography, Grid, Container } from '@material-ui/core';
import { getStoryMetaData } from '../../services/Client';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        // width: "50%",
        // height: "40%",
    },
    gridDiv: {
        display: 'flex',
        justifyContent: 'center'
    },
    searchBar: {
        width: "50%",
        marginTop: "5px",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "5vh"
    },
    storyCard: {
        // margin: "0 auto"
    }
}));

const StorySelection = (props) => {

    const classes = useStyles();
    const stories = getStoryMetaData();

    React.useEffect(() => {
        console.log(stories)
    })

    const StorySelectionList = () => {
        if (stories)
            return (
                <Container maxWidth="lg">
                    <Box py={4}>
                        <Typography variant="subtitle1" color="textSecondary"> Select a story for your kid! </Typography>
                        <Typography variant="h4" color="textPrimary"> Featured Stories </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {
                            stories.map((story, key) => (
                                <Grid item xs={12} sm={4}>
                                    <StoryCard className={classes.storyCard} title={story.title} imgSrc={story.cover} />
                                </Grid>
                            ))
                        }
                    </Grid>

                </Container>
            )
    };

    return (
        <DrawerAndNavbar content={StorySelectionList()} />
    );
}

export default {
    routeProps: {
        path: "/storyselection",
        component: StorySelection
    },
    name: 'StorySelection'
};
