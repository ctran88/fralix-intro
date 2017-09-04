'use strict';

import React from 'react';
import { Row,
         Col,
         Image,
         Glyphicon } from 'react-bootstrap';
import Select from 'react-select';
import people from '../../people.json';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sender: {
                name: this.props.senderName,
                imageUrl: this.props.senderImageUrl,
            },
            ask: {
                name: 'Ask',
                imageUrl: 'src/public/images/default_user.jpeg'
            },
            introTo: {
                name: 'Intro to',
                imageUrl: 'src/public/images/default_user.jpeg'
            },
            askActive: false,
            introToActive: false
        };
        this.toggleActive = this.toggleActive.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
    }

    renderOptions(option) {
        return (
            <div>
                <Image
                    className="option-avatar"
                    src={ option.value[1] }
                    circle
                    height="50px"
                    width="50px"
                />
                <div className="option-label">
                    <small>{ option.label[0] }</small><br/>
                    <small>{ option.label[1] }</small><br/>
                    <small>{ option.label[2] }</small>
                </div>
            </div>
        );
    }

    toggleActive(e) {
        if (e.target.id === 'ask-avatar') {
            this.setState({
                askActive: !this.state.askActive,
                introToActive: false
            });
        } else if (e.target.id === 'intro-to-avatar') {
            this.setState({
                askActive: false,
                introToActive: !this.state.introToActive
            });
        }
    }

    handleSelect(el) {
        if (this.state.askActive) {
            this.props.setHeaderDetails('ask', el.value[0]);
            this.setState({
                ask: {
                    name: el.label[0],
                    imageUrl: el.value[1]
                },
                askActive: false
            });
        } else if (this.state.introToActive) {
            this.props.setHeaderDetails('introTo', el.value[0]);
            this.setState({
                introTo: {
                    name: el.label[0],
                    imageUrl: el.value[1]
                },
                introToActive: false
            });
        }
    }

    renderSelect() {
        var options = people.map((el, index) => {
            var fullName = el.first_name + ' ' + el.last_name;

            return {
                value: [el.email, el.image_url],
                label: [fullName, el.title, el.company]
            };
        });

        options.shift();

        return (
            <Row className="row-select">
                <Select
                    options={ options }
                    optionRenderer={ this.renderOptions }
                    matchProp="label"
                    placeholder="Search..."
                    arrowRenderer={ () => <Glyphicon glyph="search" /> }
                    onChange={ this.handleSelect }
                />
            </Row>
        );
    }

    render() {
        const askClasses = {
            avatar: true,
            active: this.state.askActive
        };
        const introToClasses = {
            avatar: true,
            active: this.state.introToActive
        };

        return (
            <div className="header-container">
                <Row>
                    <Col className="avatar-container" xs={ 4 } md={ 4 }>
                        <Image
                            id="sender-avatar"
                            className="avatar"
                            src={ this.state.sender.imageUrl }
                            circle
                        />
                        <p>{ this.state.sender.name }</p>
                    </Col>
                    <Col className="avatar-container" xs={ 4 } md={ 4 }>
                        <Image
                            id="ask-avatar"
                            className={ askClasses }
                            src={ this.state.ask.imageUrl }
                            circle
                            onClick={ this.toggleActive }
                        />
                        <p>{ this.state.ask.name }</p>
                    </Col>
                    <Col className="avatar-container" xs={ 4 } md={ 4 }>
                        <Image
                            id="intro-to-avatar"
                            className={ introToClasses }
                            src={ this.state.introTo.imageUrl }
                            circle
                            onClick={ this.toggleActive }
                        />
                        <p>{ this.state.introTo.name }</p>
                    </Col>
                </Row>
                { this.state.askActive || this.state.introToActive ? this.renderSelect() : null }
            </div>
        );
    }
};

export default Header;