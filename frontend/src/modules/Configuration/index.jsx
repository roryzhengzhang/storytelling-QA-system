import React from 'react';
import DrawerAndNavbar from '../DrawerAndNavbar';
import { styled, makeStyles } from "@material-ui/core/styles";
import { GridList, Box, Typography, Grid, Container, Checkbox, Card, Divider, Chip } from '@material-ui/core';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import { Face, Place, EmojiEmotions, DirectionsWalk, CompareArrows } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
}));

const CardWithCheckbox = (props) => (
    <Column gap={2}>
        <Row>
            <Item>
                <Typography variant="h6" color="textPrimary">
                    {props.header}
                </Typography>
                <Typography variant="substitle1" color="textSecondary">
                    {props.desc}
                </Typography>
            </Item>
            <Item position={'right'} mr={-0.5}>
                <Checkbox
                    checked={props.checked}
                    disableRipple
                    color="primary"
                />
            </Item>
        </Row>
        {/* <Item>
            <Box minHeight={200} bgcolor={"#F4F7FA"} borderRadius={8}></Box>
        </Item> */}
    </Column>
)

function Configuration(props) {

    const classes = useStyles();

    const configList = (
        <Container maxWidth="lg">
            <Box py={4}>
                <Typography variant="subtitle1" color="textSecondary"> Customize the best storytelling experience for your kid! </Typography>
                <Typography variant="h4" color="textPrimary"> Preference Configuration </Typography>
            </Box>

            <Card>

                {/* <Box py={2} px={3}>
                    <Typography variant="h5">
                        Learning Goal
                    </Typography>
                </Box>
                <Box py={0} px={3}>
                    <Grid container>
                        <Grid item xs={6} sm={4}>
                            <CardWithCheckbox header="Memorize" desc="Test kid's memory of story plot" checked={checked.indexOf(1) !== -1} />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <CardWithCheckbox header="Understand" desc="Test kid's understanding of story plot" checked={checked.indexOf(1) !== -1} />
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <CardWithCheckbox header="Transfer" desc="Test kid's ability to applying learned knowledge to novel scenario" checked={checked.indexOf(1) !== -1} />
                        </Grid>

                    </Grid>
                </Box>

                <Divider /> */}
                <Column gap={3}>
                    <Item>
                        <Typography variant="h5">
                            I want more questions on ...
                        </Typography>
                    </Item>
                    <Row>
                        <Item>
                            <Chip label="character" color="primary" variant="outlined" clickable icon={<Face />} />
                        </Item>
                        <Item>
                            <Chip label="place" color="primary" variant="default" clickable icon={<Place />} />
                        </Item>
                        <Item>
                            <Chip label="feeling" color="primary" variant="outlined" clickable icon={<EmojiEmotions />} />
                        </Item>
                        <Item>
                            <Chip label="action" color="primary" variant="outlined" clickable icon={<DirectionsWalk />} />
                        </Item>
                        <Item>
                            <Chip label="causal relationship" color="primary" variant="outlined" clickable icon={<CompareArrows />} />
                        </Item>
                        <Item>
                            <Chip label="outcome" color="primary" variant="outlined" clickable icon={<CompareArrows />} />
                        </Item>
                        <Item>
                            <Chip label="prediction" color="primary" variant="outlined" clickable icon={<CompareArrows />} />
                        </Item>

                    </Row>
                </Column>

            </Card >

        </Container >
    );

    return (
        <DrawerAndNavbar content={configList} />
    );
}

export default {
    routeProps: {
        path: "/config",
        component: Configuration
    },
    name: 'Configuration'
};