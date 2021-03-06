import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import uuid from 'uuid';

export default function TypeCard(props) {
    let topicId = props.topic.split(" ")[0];
    let topic = props.topic;
    let icon = '';
    let routePath = `/${props.locale.split('-')[0]}/${props.rootUrl}/explore`
    switch(topicId) {
        case 'online': 
            icon="school";
            break;
        case 'webinars': 
            icon="question_answer";
            break;
        case 'meetups':
            icon="group";
            break;
        case 'seminars':
            icon="record_voice_over";
            break;
        default:
            icon="school";
            break;

    }
    return(
        <div className="scroll-container__item scroll-container__item--topic" key={{uuid}}>
            <Link 
                to={{
                    pathname: routePath, type: topic }}
                    onClick={()=>{
                        window.gtag("event", "class format card", {
                            event_category: "formats",
                            event_label: topic
                        }); 
                    }}
            >
            <Card className={`type-card type-card-${topicId}`}>
                <CardActionArea>
                        {/* <CardMedia
                        image={`../images/topics/${topicId}.jpg`}
                        title={props.topicLocalised}
                        /> */}
                    <CardContent>
                        <Icon>{icon}</Icon>
                        <h4>{props.topicLocalised}</h4>
                        <span>{props.count}</span>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Link>            
        </div>
    );
}