import React from 'react';
import DrawerAndNavbar from '../../modules/DrawerAndNavbar';
import { styled, makeStyles } from "@material-ui/core/styles";
import { GridList, Box, Typography, Grid, Container, Card } from '@material-ui/core';


import { Bar, Doughnut } from 'react-chartjs-2';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
}));

const palette = (alpha) => ({
    "red": `rgba(255, 99, 132, ${alpha}`,
    "blue": `rgba(54, 162, 235, ${alpha})`,
    "yellow": `rgba(255, 206, 86, ${alpha})`,
    "green": `rgba(75, 192, 192, ${alpha})`,
    "purple": `rgba(153, 102, 255, ${alpha})`,
    "orange": `rgba(255, 159, 64, ${alpha})`,
    "cyan": `rgba(24, 148, 131, ${alpha})`
})

const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: "# of questions",
            data: [12, 19, 3, 5, 2, 3, 4],
            backgroundColor: palette(0.2).cyan,
            borderColor: palette(1).cyan,
            borderWidth: 1
        }
    ],
};

const category_distribution = {
    labels: ['Character', 'Place', 'Feeling', 'Action', 'Causal relationship', 'Outcome', 'Prediction'],
    datasets: [
        {
            label: '# of Questions from this category',
            data: [12, 19, 3, 5, 2, 3, 1],
            backgroundColor: [
                palette(0.2).red,
                palette(0.2).blue,
                palette(0.2).yellow,
                palette(0.2).green,
                palette(0.2).purple,
                palette(0.2).orange,
                palette(0.2).cyan
            ],
            borderColor: [
                palette(1).red,
                palette(1).blue,
                palette(1).yellow,
                palette(1).green,
                palette(1).purple,
                palette(1).orange,
                palette(1).cyan
            ],
            borderWidth: 1,
        },
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
                    <Bar data={data} height={200} options={{ maintainAspectRatio: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Doughnut data={category_distribution} height="20vh" options={{ maintainAspectRatio: true }} />
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