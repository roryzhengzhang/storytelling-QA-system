import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography, CardActions, Button, Link } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  cover: {
    display: "block",
    height: "200px"
  },
  pic: {
    objectFit: "cover",
    objectPosition: "0% 0%"
  },
});

export default function StoryCard(props) {
  const classes = useStyles();

  const { imgSrc } = props;

  const history = useHistory();

  const routeChange = () => {
    let path = `/storydisplay`;
    history.push(path);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={routeChange}>
        <CardMedia
          component="img"
          height="200"
          image={imgSrc}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.intro}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            className={classes.button}
            startIcon={<ArrowRightAltIcon />}
          >
            Read the story
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}