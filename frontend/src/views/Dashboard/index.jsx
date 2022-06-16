import React from 'react';
import DrawerAndNavbar from '../../modules/DrawerAndNavbar';
import { styled, makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button, Box, Typography, Grid, Container, Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import DatePicker from "./DateStrip";
import SessionPie from './SessionPie';
import SessionRadar from './SessionRadar';
import WeeklyBar from './WeeklyBar';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getOverlappingDaysInIntervals } from 'date-fns/esm';
import SessionTable from './SessionTable';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    fullCard: {
        padding: '18px',
        height: '70vh'
    },
    halfCard: {
        height: '30vh',
        padding: '12px'
    },
    twoThirdsCard: {
        padding: '32px',
        height: '48vh'
    },
    thirdsCard: {
        height: '24vh'
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 96,
        // background: "#FFFFFF33",
        textAlign: "center",
        // This is important to preserve the chart interactivity
        pointerEvents: "none"
    },
    card: {
        marginBottom: '16px',
        marginRight: '16px'
    },
    grid: {
        padding: "4px"
    },
}));



function Dashboard(props) {

    const classes = useStyles();

    const dashboardView = (
        <Container>
            <Box py={4}>
                <Typography variant="subtitle1" color="textSecondary"> See how your kid is growing with the stories!  </Typography>
                <Typography variant="h4" color="textPrimary"> Dashboard </Typography>
            </Box>
            <Grid container direction={'row'}>
                <Grid item container direction={"column"} xs={12} sm={6}>
                    <Grid item>
                        <Card className={classes.card} variant="outlined">
                            <Box mx={2} my={1}>
                                <Typography variant="subtitle2" color="textSecondary"> Weekly Statistics</Typography>
                            </Box>
                            <Divider />
                            <div className={classes.halfCard}>
                                <WeeklyBar />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item container direction='row'>
                        <Grid item sm={6}>
                            <Card className={classes.card} variant="outlined">
                                <Box mx={2} my={1}>
                                    <Typography variant="subtitle2" color="textSecondary"> Per-Session Problem Statistics</Typography>
                                </Box>
                                <Divider />
                                <CardContent className={classes.halfCard}>
                                    <SessionPie />
                                </CardContent>
                            </Card></Grid>
                        <Grid item sm={6}><Card className={classes.card} variant="outlined">
                            <Box mx={2} my={1}>
                                <Typography variant="subtitle2" color="textSecondary"> Per-Session Answer Accuracy </Typography>
                            </Box>
                            <Divider />
                            <CardContent className={classes.halfCard}>
                                <SessionRadar />
                            </CardContent>
                        </Card></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.card} variant="outlined">
                        <Box mx={2} my={1}>
                            <Typography variant="subtitle2" color="textSecondary"> Session Details </Typography>
                        </Box>
                        <Divider />
                        <CardContent className={classes.fullCard}>
                            <DatePicker endDate={6} color={'#189483'} />
                            <Box mt={2}>
                                <SessionTable />
                            </Box>
                        </CardContent>
                    </Card>
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