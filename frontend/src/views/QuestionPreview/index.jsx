import React from 'react';
import DrawerAndNavbar from '../../modules/DrawerAndNavbar';
import { Typography, Paper, Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@material-ui/core';
import StoryBook from '../../modules/StoryBook';
import { makeStyles } from '@material-ui/core/styles';
import { ConfigCard } from '../Configuration';

const useStyles = makeStyles((theme) => ({
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

function QuestionPreview(props) {

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    const questionPreview = (
        <div className={classes.paper}>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
            >
                <DialogTitle>{"Configure your preferred question categories"}</DialogTitle>
                <DialogContent>
                    <ConfigCard />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Finished
                    </Button>
                </DialogActions>
            </Dialog>
            <StoryBook className={classes.card} hideChatbot={true} hidePlay={true}>
                The API documentation of the Paper React component. Learn more about the props and the CSS customization points.
            </StoryBook>
        </div>
    );


    return (
        <DrawerAndNavbar content={questionPreview} />
    );
}

export default {
    routeProps: {
        path: "/questionpreview",
        component: QuestionPreview
    },
    name: 'QuestionPreview'
};