import React,  {Component} from 'react'
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from "reactstrap";
import {Link} from "react-router-dom";

class Contact extends Component {
    constructor(props) {
        super(props);

        // Properties within the state that can be linked to the form.
        // The property touched will keep track of what fields have been touched or not
        // The reason for tracking this is that if the user has not made any changes here,
        // Then it shouldn't be validated at all. Only after they make the first change.
        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    // Without this method, whatever is typed into the input in the form,
    // Will not appear. That is because it is tied into the current state.
    // But this will allow it to change. This method will be invoked
    // upon any change of the input value in the form.
    // It will retrieve the target input from the event that has been passed in.
    // So this method will carry which particular input has changed.
    // The second line checks to see the input type.
    // : a colon represents sayings "otherwise"
    // So the second line will check to see if it is a checkbox otherwise
    // It will retrieve the value
    // The third line will retrieve the target name
    // the name is also how we define the state properties...
    // That is why we can do this.setState()
    // Line 4 states any change will change the state.
    // Who's state will change? The state of the [name]
    // To review: We got the value from the input that is change ->
    // if it is a checkbox when get it from target checked ->
    // if it is another kind of input we get it from value ->
    // and then that value will set the state and change the the property value

    // How do the two get connected together?
    // In the form, in each of the inputs onChange={this.handleInputChange} must be added
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // Will indicate which field has been modified and will recieve an event.
    // Whichever box has been modified it will be set to true.
    // Now we will be able to track which input box has been modified.
    // ... means all of the properties.
    // handleBlur will be invoked the same way as handleChange, inside each of the Inputs
    // handleBlur must also be bound.
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true }
        });
    };

    // Validates form each time the form is re-rendered.
    // If they are empty they will be sent a corresponding error message
    validate(firstname, lastname, telnum, email) {
        const errors = {
          firstname: '',
          lastname: '',
          telnum: '',
          email: ''
        };

        if(this.state.touched.firstname && firstname.length < 3)
            errors.firstname = 'First Name should be >= 3 characters';
        else if(this.state.touched.firstname && firstname.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.lastname && lastname.length < 3)
            errors.lastname = 'Last Name should be >= 3 characters';
        else if (this.state.touched.lastname && lastname.length > 20)
            errors.lastname = "Last Name should be <= 20 characters";

        // Regular expression is used to check to see if it is a string of numbers
        // /^\ is called a hat
        // !reg.test() is a building method for the regular expression
        const reg = /^\d+$/;
        if(this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = "Tel. Number should contain only numbers"
        // Checks the entire string to see if at least 1 of the characters is an @ sign.
        if(this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = "Email should contain a @ sign"

        return errors;

        // It will be invoked in the render function because every time there is
        // a change in the input fields, the form will be re-rendered.
        // Use bootstrap's class FormFeedback to impelement.
    }

    // In order to made this handleSumbit method available for use
    // It needs to be bound in the constructor above.
    handleSubmit(event) {
        console.log("Current State is: " + JSON.stringify(this.state));
        alert("Current State is: " + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {

        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            {/*Having a formgroup allows you to define it as a row*/}
                            <FormGroup row>
                                {/* md={2} for md to xl screen sizes this label will occupy 2 cols */}
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                {/* Col md={10} in reactstrap is the bootstrap equivalent of <div class="col-md-10"> */}
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname"
                                           placeholder="First Name"
                                           /*by putting in the value field this becomes a controlled form
                                           this input is being tied to the controlled components state
                                           Any changes will be reflected in the React components state. */
                                           value={this.state.firstname}
                                           valid={errors.firstname === ''}
                                           invalid={errors.firstname !== ''}
                                            onBlur={this.handleBlur('firstname')}
                                            onChange={this.handleInputChange}/>
                                            <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname"
                                           placeholder="Last Name"
                                           value={this.state.lastname}
                                           valid={errors.lastname === ''}
                                           invalid={errors.lastname !== ''}
                                           onBlur={this.handleBlur('lastname')}
                                            onChange={this.handleInputChange}/>
                                            <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        value={this.state.telnum}
                                        valid={errors.telnum === ''}
                                        invalid={errors.telnum !== ''}
                                        onBlur={this.handleBlur('telnum')}
                                        onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={this.handleBlur('email')}
                                        onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                {/*/*This is a JS object inside the curly braces */}
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree"
                                            checked={this.state.agree} /> {''}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType"
                                        value={this.state.contactType}
                                        onChange={this.handleInputChange}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="feedback" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                        rows="12"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }

}


// function Contact(props) {
//     return(
//         <div className="container">
//             <div className="row">
//                 <Breadcrumb>
//                     <BreadcrumbItem>
//                         <Link to="/home">Home</Link>
//                     </BreadcrumbItem>
//                     <BreadcrumbItem active>Contact Us</BreadcrumbItem>
//                 </Breadcrumb>
//                 <div className="col-12">
//                     <h3>Contact Us</h3>
//                     <hr/>
//                 </div>
//             </div>
//             <div className="row row-content">
//                 <div className="col-12">
//                     <h3>Location Information</h3>
//                 </div>
//                 <div className="col-12 col-sm-4 offset-sm-1">
//                     <h5>Our Address</h5>
//                     <address>
//                         121, Clear Water Bay Road<br />
//                         Clear Water Bay, Kowloon<br />
//                         HONG KONG<br />
//                         <i className="fa fa-phone"></i>: +852 1234 5678<br />
//                         <i className="fa fa-fax"></i>: +852 8765 4321<br />
//                         <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
//                     </address>
//                 </div>
//                 <div className="col-12 col-sm-6 offset-sm-1">
//                     <h5>Map of our Location</h5>
//                 </div>
//                 <div className="col-12 col-sm-11 offset-sm-1">
//                     <div className="btn-group" role="group">
//                         <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
//                         <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
//                         <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export default Contact