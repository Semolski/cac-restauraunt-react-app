import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import { Switch, Route, Redirect} from "react-router-dom";

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {

        const Homepage = () => {
            return(
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        };
        return (
            <div>
                <Header />
                {/*This will switch between the routes based on how we specify the routes*/}
                <Switch>
                    <Route path="/home" component={Homepage} />
                    {/*exact means the route should match exactly to that component*/}
                    {/*if props needs to be passed in, a function component will need to be created inline*/}
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Route exact path="/contactus" component={Contact} />\

                {/*    Redirect can specify default route*/}
                <Redirect to="/home"/>
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
