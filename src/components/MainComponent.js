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
import { postComment, fetchDishes, fetchPromos, fetchComments } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { TransitionGroup, CSSTransition} from 'react-transition-group';


// addComment was removed from import and postComment was replaced.
// The actions that we import from react-redux-form, adds in the nessecary actions
// for resetting the form, in this case it is called 'feedback'

// importing withRouter is required to connect the app to Redux and connect

// The Main Component needs to go obtain the state from the Redux Store.
// Before that can happen const mapStateToProps function must be defined.
// mapStateToProps obtains the state as a parameter.
// This function will return. This will map the Redux Store's state
// in to properties (props) that will become available to the component.
// The state that is being obtained is from the Redux Store.

// We must import the ActionCreators function to obtain an action
// javascript object, which can then be dispatched to the store,
// by calling store dispatch.
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

// mapDispatchToProps will recieve the dispatch as one of the parameters.
// The dispatch function is the one from the store.
// When it recieves dispatch as the parameter, then
// (addComment (dishId, rating, author, comment) this is a function call
// this will return the action object for adding a comment.
// That object is then given as a parameter to the dispatch function.
// Now it must be connected to the router at the export.
// This function will be passed in as an attribute to the DishDetail component.
// Inside the DishDetail component I can make use of the function
// to dispatch the action to the Store.
//
// Next there is a new property called fetchDishes, which when invoked
// will result in a call to dispatch fetchDishes() that has been imported
//
// Recall that fetchDishes is a thunk, so we can dispatch that
// thunk...and in order to do the dispatch it needs to be mapped
// in the DispatchToProps so that fetchDishes becomes available
// for the MainComponent to be made use of.
//
// Next the dishes must be fetched. This is where we can take the help of
// the lifecycle method of the component called componentDidMount

const mapDispatchToProps = (dispatch) => ({
   postComment: (dishId, rating, author, comment) =>
       dispatch(postComment (dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    // The form will be named as feedback
    resetFeedbackForm:() => {dispatch(actions.reset('feedback'))},
    fetchComments: () =>  dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())
});

class Main extends Component {

    constructor(props) {
        super(props);
    }
    // Now that this component is using properties from the store, everything using the state
    // must be changed to props. Example: this.state.dishes.filter becomes this.props.dishes.filter

    // Next the dishes must be fetched
    // Whatever is called will be executed just after this method gets
    // mounted into the view of the application.
    //
    // This is also a good time to fetch any data needed for the application.
    // This is why we will now call fetchDishes.
    //
    // What will happen is when the main component is mounted into my view
    // by my react application, at that point after it gets mounted,
    // the fetchDishes will get called/
    // This will result in it being loaded into the Redux Store
    // And then when it becomes available, then it will become available
    // for my application.

    // We must fetch the comments and promotions just like with the dishes,
    // We do the fetching in the componentDidMount
    // After the components are mounted here, then all of these will be
    // fetched from the server.
    // But it also means we must update the Home component.
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {
        // When we pass in the dish information into the Home component,
        // It will be changed from: this.props.dishes.filter
        // To: this.props.dishes.dishes.filter
        // From there we will fetch and map the first one
        // and then pass that into the Home component.
        // Not only that, the dishesLoading attribute must be passed in.
        // dishesLoading and dishesErrMess are being marked differently because
        // the same will apply for leader and promotion later.
        const Homepage = () => {
            return(
                <Home
                    dish={this.props.dishes.dishes.filter((dish) =>
                        dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) =>
                        promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.filter((leader) =>
                        leader.featured)[0]}
                />
            )
        };
        // When this is invoked it will get the parameter that is required. The props will pass in
        // three props here.
        const DishWithId = ({match}) => {
            return (
                // Parsing here allows the string to be converted to an integer with a base of 10.
                // The filter will return the first item of the array [0]
                //
                // The same changes that were made to the Home component will be made
                // here as well. Since we are passing in the dish and nothing else
                // it will only be called isLoading and errMess
                <DishDetail dish={this.props.dishes.dishes.filter((dish) =>
                    dish.id === parseInt(match.params.dishId,10))[0]}
                /*Previously the comments were a part of the dish but now they are separate so they must be explicitly called.*/
                /*    Extract all the comments for which the id matches that value */
                    // The addComment attribute must be added.
                            isLoading={this.props.dishes.isLoading}
                            errMess={this.props.dishes.errMess}
                            comments={this.props.comments.comments.filter((comment) =>
                                comment.dishId === parseInt(match.params.dishId,10))}
                            commentsErrMess={this.props.comments.errMess}
                            postComment={this.props.postComment}
                />
            )
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
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
                    {/*// This Contact route needed to be updated for the form.*/}
                    {/*// We need to pass in an attribute to the Contact component.*/}
                    {/*// The arrow function allows us to send this attribute as a property*/}
                    {/*// to the Contact component.*/}
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm } />} />
                    {/*    Redirect can specify default route*/}
                    <Redirect to="/home"/>
                </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

// To connect the MainComponent to the Store it must be exported as seen below.
// If using the React Router, (connect(mapStateToProps)(Main)) must be surrounded by
// withRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
