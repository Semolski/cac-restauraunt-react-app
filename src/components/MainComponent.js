import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import About from "./AboutComponent";
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
        // When this is invoked it will get the parameter that is required. The props will pass in
        // three props here.
        const DishWithId = ({match}) => {
            return (
                // Parsing here allows the string to be converted to an integer with a base of 10.
                // The filter will return the first item of the array [0]
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                /*Previously the comments were a part of the dish but now they are separate so they must be explicitly called.*/
                /*    Extract all the comments for which the id matches that value */
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
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
                    {/*The route above and below both go to menu. But for it to not get mixed up,
                    the "exact" keyword will prevent it. If exact is not there, it will match the route to the very first
                     match it encounters. */}
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
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
