import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default function TopicCard(props) {
    return(
        <Grid item xs={6} sm={4} md={3} key="3">
            <Link to={{pathname:"/explore", topic:props.topic}}>
                <Card className="topic-card">
                    <CardActionArea>
                        <CardMedia
                        image={`../images/topics/${props.topic}.jpg`}
                        title={props.topic}
                        />
                        <CardContent>
                            <h4>{props.topic}</h4>
                            {/* <p>{props.resultCount} classes</p> */}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>            
        </Grid>
    );
}