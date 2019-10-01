import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LazyLoad from 'react-lazy-load';

export default function TopicCard(props) {
    let topicId = props.topic.split(" ")[0];
    let topic = props.topic;

    let routePath = `/${props.locale.split('-')[0]}/${props.rootUrl}/explore`
        // (topicId==='group' || topicId==='meetups    ') ? 
        // (topicId==='meetups' || topicId==='meetups    ') ?
        //     `/${props.locale.split('-')[0]}/madrid/explore`
        //     :
        //     `/${props.locale.split('-')[0]}/madrid/explore`
        // :
        // (topicId==='online') ?
        //     `/${props.locale.split('-')[0]}/online  `
        //     :
            
        // ;    
    return(
        <Grid item xs={6} sm={4} md={3} key="3">
            <Link 
                    to={{
                        pathname: routePath, topic:`${topic}`}}
                        onClick={()=>{
                            window.gtag("event", props.rootUrl + " topic card", {
                                event_category: props.rootUrl + " topics",
                                event_label: topic
                            }); 
                        }}
            >
            <Card className={`topic-card ${topic}-card`}>
                <CardActionArea>
                    <LazyLoad 
                        width={220}
                        debounce={false}
                        offsetVertical={500}
                        >
                        <CardMedia
                        image={`../images/topics/${topicId}.jpg`}
                        title={props.topicLocalised}
                        />
                    </LazyLoad>
                    <CardContent>
                    <h4>{props.topicLocalised}</h4>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Link>            
        </Grid>
    );
}