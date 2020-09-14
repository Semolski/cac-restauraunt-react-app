import React from "react";
import {
    Card,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    BreadcrumbItem,
    Breadcrumb,
} from "reactstrap";
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent'
import {baseUrl} from "../shared/baseUrl";

// componentDidMount() {
    //     console.log('Dishdetail Component componentDidMount ')
    // }
    //
    // componentDidUpdate() {
    //     console.log('Dishdetail Component componentDidUpdate invoked ')
    //
    // }
    // instructor method for rendering dishes

    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.id}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
// In the RenderComments function, along with the comments, it
// will also recieve addComment, and dishId.
// Those two just need to passed directly to the comment form.
    function RenderComments({comments, postComment, dishId}) {
        if (comments != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}</p>
                                </li>
                            );
                        })}
                        {/*// dishId and addComment have been extracted already from the props.*/}
                        {/*// so they are already available to use. They will be passed to the CommentForm*/}
                        {/*// component.*/}
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </ul>
                </div>
            );
        else
            return(
                <div />
            )
    }



const DishDetail = (props) => {
    // This is saying if isLoading is true then we will simply return
    // the view as the loading component, so the loading
    // spinner will be shown.
    //
    // This structure will be made of use at multiple place in the
    // application where the details of the dish are displayed.
    //
    // The dish information is displayed in 3 different components.
    // <DishDetail> <Home> <Menu>
    //
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        // console.log('Dishdetail Component component render invoked');

        else if (props.dish != null)
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            {/*It is props.dish.name so the title of the breadcrumb is the title of the dish*/}
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">`
                        <RenderDish dish={props.dish} />
                        {/*Now that comments are being passed in separately from the dish, it doesn't
                        need to be props.dish.comments */}
                        <RenderComments comments={props.comments}
                         postComment={props.postComment}
                        dishId={props.dish.id}/>
                    </div>

                </div>
            );
        else
            return (
                <div />
            )
    };

    // renderComments(comments) {
    //     if (comments != null) {
    //         let options = {year: "numeric", month: "short", day: "numeric"};
    //         return comments.map(comment => (
    //             <ul key={comment.id} className="list-unstyled">
    //                 <li className="mb-2">{comment.comment}</li>
    //                 <li>
    //                     {"--"}{comment.author}{" "}
    //                     {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}.toLocaleDateString("en-US", options)}
    //                 </li>
    //             </ul>
    //         ))
    //     } else return (
    //         <div/>
    //     )
    // }
    //
    // render() {
    //     const {dish} = this.props;
    //     return (
    //         <div className="row">
    //             <div className="col-12 col-md-5 m-1">
    //                 <Card>
    //                     <CardImg src={dish.image} alt={dish.name}/>
    //                     <CardBody>
    //                         <CardTitle>{dish.name}</CardTitle>
    //                         <CardText>{dish.description}</CardText>
    //                     </CardBody>
    //                 </Card>
    //             </div>
    //             <div className="col-12 col-md-5 m-1">
    //                 <h4>Comments</h4>
    //                 {this.renderComments(dish.comments)}
    //             </div>
    //         </div>
    //     )
    // }
export default DishDetail;