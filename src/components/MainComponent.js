import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter} from "react-router-dom";
import { connect } from 'react-redux';

// importing withRouter is required to connect the app to Redux and connect

// The Main Component needs to go obtain the state from the Redux Store.
// Before that can happen const mapStateToProps function must be defined.
// mapStateToProps obtains the state as a parameter.
// This function will return. This will map the Redux Store's state
// in to properties (props) that will become available to the component.
// The state that is being obtained is from the Redux Store.
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

class Main extends Component {

    constructor(props) {
        super(props);

    }

    // Now that this component is using properties from the store, everything using the state
    // must be changed to props. Example: this.state.dishes.filter becomes this.props.dishes.filter
    render() {

        const Homepage = () => {
            return(
                <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            )
        };
        // When this is invoked it will get the parameter that is required. The props will pass in
        // three props here.
        const DishWithId = ({match}) => {
            return (
                // Parsing here allows the string to be converted to an integer with a base of 10.
                // The filter will return the first item of the array [0]
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                /*Previously the comments were a part of the dish but now they are separate so they must be explicitly called.*/
                /*    Extract all the comments for which the id matches that value */
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
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
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    {/*The route above and below both go to menu. But for it to not get mixed up,
                    the "exact" keyword will prevent it. If exact is not there, it will match the route to the very first
                     match it encounters. */}
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Route exact path="/contactus" component={Contact} />\
                    {/*    Redirect can specify default route*/}
                    <Redirect to="/home"/>
                </Switch>
                <Footer />
            </div>
        );
    }
}

// To connect the MainComponent to the Store it must be exported as seen below.
// If using the React Router, (connect(mapStateToProps)(Main)) must be surrounded by
// withRouter
export default withRouter(connect(mapStateToProps)(Main));
