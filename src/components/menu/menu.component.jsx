import React from "react";
import {Card, CardImg, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from '../loading/loading.component';
import { baseUrl} from "../../shared/baseUrl";

function RenderMenuItem({dish, onClick}) {
    return (
        <Card>
            {/*For each specific dish, the corresponding dish.id is evaluated here.
             And it will be substituted. So if the id is 1 the address will become
             /menu/1 */}
            <Link to={`/menu/${dish.id}`}>
            {/*    Adding baseUrl + will ensure it will be fetched directly
            from the server before rendering the items. We want it to be fetched
            from the server because when the server is updated we don't want to realize
            the img doesn't exist in the current application. The only images that will
            be used locally is the logo because it won't keep changing all the time.  */}
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
            </Link>
        </Card>
    );

}



const Menu = (props) => {
    // the menu const will be changed to props.dishes.dishes.
    const menu = props.dishes.dishes.map(dish => {
        return (
            <div key={dish.id} className="col-12 col-md-12 m-1">
                <RenderMenuItem dish={dish} onClick={props.onClick}/>
            </div>
        );
    });
// This is copied and pasted directly from DishDetail
    // *** But be sure to add .dishes as seen below ***
    if (props.dishes.isLoading) {
        return(
            <div className="container">s
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.dishes.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
                {/*{this.renderDish(this.state.selectedDish)}*/}
            </div>
        )
};



export default Menu;