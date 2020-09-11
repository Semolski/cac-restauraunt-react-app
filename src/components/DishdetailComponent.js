import React from "react";
import {Card, CardImg, CardBody, CardText, CardTitle, BreadcrumbItem, Breadcrumb, Button} from "reactstrap";
import { Link } from 'react-router-dom'
import Comment from './CommentForm';


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
                    <CardImg top src={dish.image} alt={dish.id}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    function RenderComments({comments}) {
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
                        <Comment />
                    </ul>
                </div>
            );
        else
            return(
                <div />
            )
    }



const DishDetail = (props) => {

        console.log('Dishdetail Component component render invoked');

        if (props.dish != null)
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
                        <RenderComments comments={props.comments} />
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