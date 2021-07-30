import React from 'react';
import DrawerAndNavbar from '../DrawerAndNavbar';
import { styled, makeStyles } from "@material-ui/core/styles";
import { GridList, Box, Typography, Grid, Container, Card } from '@material-ui/core';


import { Bar } from 'react-chartjs-2';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
}));

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: "# of questions",
            data: [12, 19, 3, 5, 2, 3, 4],
            backgroundColor: 'rgb(255, 99, 132)',
        }
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                // stacked: true,
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
        xAxes: [
            {
                stacked: true,
            },
        ],
    },
};


function Dashboard(props) {

    const classes = useStyles();

    // const data = require('../../store/data')

    const dashboardView = (
        <Container maxWidth="lg">
            {/* <SearchBar placeholder="Search story name" className={classes.searchBar} /> */}
            <Box py={4}>
                <Typography variant="subtitle1" color="textSecondary"> See how your kid is growing with the stories!  </Typography>
                <Typography variant="h4" color="textPrimary"> Dashboard </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Bar data={data} options={options} />
                </Grid>
            </Grid>

        </Container>
    );

    return (
        <DrawerAndNavbar content={dashboardView} />
    );
}

export default {
    routeProps: {
        path: "/dashboard",
        component: Dashboard
    },
    name: 'Dashboard'
};