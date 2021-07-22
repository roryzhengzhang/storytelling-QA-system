import React from 'react';
import DrawerAndNavbar from '../DrawerAndNavbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from "material-ui-search-bar";
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
        <div>
            <SearchBar placeholder="Search story name" className={classes.searchBar} />
            <div className={classes.gridDiv}>
                <GridList cellHeight={160} className={classes.gridList} cols={2} spacing={2}>
                    <StoryCard className={classes.storyCard} imgSrc={process.env.PUBLIC_URL + '/cartoon1.jpg'}/>
                    <StoryCard className={classes.storyCard} imgSrc={process.env.PUBLIC_URL + '/cartoon2.jpg'}/>
                    <StoryCard className={classes.storyCard} imgSrc={process.env.PUBLIC_URL + '/cartoon3.jpg'}/>
                    <StoryCard className={classes.storyCard} imgSrc={process.env.PUBLIC_URL + '/cartoon4.jpg'}/>
                    <StoryCard className={classes.storyCard} imgSrc={process.env.PUBLIC_URL + '/cartoon5.jpg'}/>
                    <StoryCard className={classes.storyCard} imgSrc={process.env.PUBLIC_URL + '/cartoon6.jpg'}/>
                </GridList>
            </div>

        </div>
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