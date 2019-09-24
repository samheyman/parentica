import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default function TopicCard(props) {
    let topicId = props.topic.split(" ")[0];
    let topic = props.topic;
    console.log(props);
    return(
        <Grid item xs={6} sm={4} md={3} key="3">
            <Link to={{pathname:`/${props.locale.split('-')[0]}/explore`, topic:`${topic}`}}
                onClick={()=>{
                    window.gtag("event", "topic card", {
                        event_category: "topics",
                        event_label: topic
                    }); 
                }}
            >
            <Card className="topic-card">
                <CardActionArea>
                    <CardMedia
                    image={`../images/topics/${topicId}.jpg`}
                    title={props.topicLocalised}
                    />
                    <CardContent>
                    <h4>{props.topicLocalised}</h4>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Link>            
        </Grid>
    );
}