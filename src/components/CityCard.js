import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import LazyLoad from 'react-lazy-load';

export default function CityCard(props) {
    let topicId = props.topic.split(" ")[0];
    let topic = props.topic;
    return(
        <div style={{ width: '270px', marginRight: '10px', height: '255px', display:'inline-block' }}>
            <Link to={{pathname:`/${props.locale.split('-')[0]}/${topic}`}}
                onClick={()=>{
                    window.gtag("event", "city card", {
                        event_category: "cities",
                        event_label: topic
                    }); 
                }}
            >
            <Card className={`city-card ${topicId}-card`}>
                <CardActionArea>
                    <LazyLoad 
                    width={290}
                    height={200}
                    debounce={false}
                    offsetVertical={500}
                    >
                        <CardMedia
                        image={`../images/cities/${topicId}.jpg`}
                        title={props.topicLocalised}
                        />
                    </LazyLoad>
                    <CardContent>
                    <h4>{props.topicLocalised}</h4>
                    {/* <span>{props.resultCount} classes</span> */}
                    </CardContent>
                </CardActionArea>
            </Card>
            </Link>            
        </div>
    );
}