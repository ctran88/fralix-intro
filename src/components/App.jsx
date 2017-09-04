'use strict';

import React from 'react';
import { Panel,
         Image,
         Button } from 'react-bootstrap';
import Header from '../components/Header';
import Body from '../components/Body';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sender: this.props.email,
            ask: '',
            introTo: ''
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(type, email) {
        if (type === 'ask') {
            this.setState({
                ask: email
            });
        } else if (type === 'introTo') {
            this.setState({
                introTo: email
            });
        }
    }

    render() {
        return (
            <Panel className="modal-container">
            <div className="panel-heading">
                <Image
                    className="header-avatar"
                    src={ this.props.imageUrl }
                    circle
                    height="25px"
                    width="25px"
                />
                <strong>Fralix Intro</strong>
                <Button>x</Button>
            </div>
                <Header senderName = { this.props.name }
                        senderImageUrl = { this.props.imageUrl }
                        setHeaderDetails={ this.handleSelect }
                />
                <Body sender={ this.state.sender }
                      ask={ this.state.ask }
                      introTo={ this.state.introTo }
                />
            </Panel>
        );
    }
};

App.defaultProps = {
    email: 's.kramer@mail.com',
    name: 'Steven Kramer',
    imageUrl: 'https://randomuser.me/api/portraits/men/79.jpg'
};

export default App;