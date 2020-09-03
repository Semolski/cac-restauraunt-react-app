import React, {Component} from 'react'
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron} from 'reactstrap';
import {NavLink} from 'react-router-dom'

// It is a class component and not a function because the state will be changing
class Header extends Component {

    constructor(props) {
        super(props);
        this.state ={
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this)
    }
    // We set the state again so when it becomes false it will be true and vice versa. Whenever
    // This is executed, the value will be swapped.
    // This method must be made available to use with JSX.
    // It must be bound
    // this.toggleNav = this.toggleNav.bind(this) is specifying that
    // toggleNav() will become available as this.toggleNav
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return (
            //These are called react fragments. <React.Fragment> should be used and not <> because they are not supported by all tools.
            //Allows to group together React elements. By using React fragment, you don't need to
            //add an extra node into the DOM like enclosing everything in a <div>
            //They can just be added in directly in the DOM
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        {/*NavbarToggler only shows on extra small to small screen sizes*/}
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="#">
                            {/*<img src="../public/assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" />*/}
                        </NavbarBrand>
                        {/* For the collapse to work it requires isOpen is a boolean attribute */}
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg" />
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg" />
                                        About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg" />
                                        Menu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg" />
                                        Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        )
    }
}

export default Header