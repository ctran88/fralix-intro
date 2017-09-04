'use strict';

import React from 'react';
import { Row,
         Form,
         FormGroup,
         FormControl,
         ControlLabel,
         Button,
         Modal } from 'react-bootstrap';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            message: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetBody = this.resetBody.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    resetBody() {
        this.setState({
            subject: '',
            message: '',
            submitted: false
        });
    }
    
    handleSubmit(e) {
        var details = {
            sender: this.props.sender,
            ask: this.props.ask,
            introTo: this.props.introTo,
            subject: this.state.subject,
            message: this.state.message
        };

        console.log('Fralix sent: ', details);

        this.setState({
            submitted: true
        });

        setTimeout(this.resetBody, 1500);
        e.preventDefault();
    }

    render() {
        return (
            <div className="form-container">
                <Form onSubmit={ this.handleSubmit }>
                    <Row>
                        <FormGroup controlId="subjectField">
                            <ControlLabel>Subject</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                name="subject"
                                rows="2"
                                value={ this.state.subject }
                                onChange={ this.handleChange }
                            />
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup controlId="messageField">
                            <ControlLabel>Message</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                name="message"
                                rows="15"
                                value={ this.state.message }
                                onChange={ this.handleChange }
                            />
                        </FormGroup>
                    </Row>
                    <Row className="row-button">
                        <Button type="submit">Send</Button>
                    </Row>
                </Form>

                <Modal
                    show={ this.state.submitted }
                    container={ this }
                    bsSize="sm"
                >
                    <Modal.Body>
                        { this.props.submittedMessage }
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
};

Body.defaultProps = {
    submittedMessage: 'Fralix Sent'
};

export default Body;