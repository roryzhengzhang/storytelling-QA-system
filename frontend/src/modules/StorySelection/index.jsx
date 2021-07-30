import React from 'react';
import DrawerAndNavbar from '../DrawerAndNavbar';
// import SearchBar from "material-ui-search-bar";
import StoryCard from '../StoryCard';
import { styled, makeStyles } from "@material-ui/core/styles";
import { GridList, Box, Typography, Grid, Container } from '@material-ui/core';

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

function StorySelection(props) {

    const classes = useStyles();

    const storySelectionList = (
        <Container maxWidth="lg">
            {/* <SearchBar placeholder="Search story name" className={classes.searchBar} /> */}
            <Box py={4}>
                <Typography variant="subtitle1" color="textSecondary"> Select a story for your kid! </Typography>
                <Typography variant="h4" color="textPrimary"> Featured Stories </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                    <StoryCard className={classes.storyCard} title="The Hare and the Tortoise" imgSrc={process.env.PUBLIC_URL + '/img/the_hare_and_the_tortoise.png'} />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <StoryCard className={classes.storyCard} title="The Sleeping Beauty in the Woods" imgSrc={process.env.PUBLIC_URL + '/img/the_sleeping_beauty_in_the_wood.jpg'} />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <StoryCard className={classes.storyCard} title="The Three Little Pigs" imgSrc={process.env.PUBLIC_URL + '/img/three_little_pigs.jpg'} />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <StoryCard className={classes.storyCard} title="The Ugly Duckling" imgSrc={process.env.PUBLIC_URL + '/img/the_ugly_duckling.jpg'} />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <StoryCard className={classes.storyCard} title="Toads and Diamonds" imgSrc={process.env.PUBLIC_URL + '/img/toads_and_diamonds.jpg'} />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <StoryCard className={classes.storyCard} title="The Story of Pretty Goldilocks" imgSrc={process.env.PUBLIC_URL + '/img/the_story_of_pretty_goldilocks.jpg'} />
                </Grid>
            </Grid>

        </Container>
    );

    return (
        <DrawerAndNavbar content={storySelectionList} />
    );
}

export default {
    routeProps: {
        path: "/storyselection",
        component: StorySelection
    },
    name: 'StorySelection'
};