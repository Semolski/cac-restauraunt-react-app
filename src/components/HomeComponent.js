import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import {Loading} from './LoadingComponent'
import {baseUrl} from "../shared/baseUrl";
import {FadeTransform} from 'react-animation-components';

// Now RenderCard is recieving three items. So in here we will
// some if statements.
function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return (
            <Loading/>
        );
    }
    // if the errMess is not null then it will be passed in here.
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    // else we will return the layout of the card
    else {
        return (
            <FadeTransform in
                           transformProps={{
                               exitTransform: 'scale(0.5) translateY(-50%)'
                           }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name}/>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {/*Javascript code inside JSX ... ? means not null it is rendered as cardsubtitle.
                    item.designation only exists for the leader, otherwise it will be rendered as null. No element will be returned. */}
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}

function Home(props) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    {/*// Recall from the MainComponent that we are passing in dishesLoading*/}
                    {/*// and dishesErrMess, so they need to be passed into RenderCard*/}
                    {/*// component.*/}
                    <RenderCard item={props.dish}
                                isLoading={props.dishesLoading}
                                errMess={props.dishesErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                            isLoading={props.promosLoading}
                            errMess={props.promosErrMess}
                    />
                </div>
                {/* item={props.leader} it HAS to be leader
                always make sure this is correct!!! */}
                <div className="col-12 col-md-m-1">
                    <RenderCard item={props.leader}
                                isLoading={props.leadersLoading}
                                errMess={props.leadersErrMess} />
                </div>
            </div>
        </div>
    )
}

export default Home;