import React from 'react';
import MessagesService from '../../../core/services/messages.service';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Messages.scss';
import BaseService from '../../../core/services/base-api.service';

export class NewMessage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            receiverName: '',
            title: '',
            content: '',
            errors: '',
            showConfirmationMessage: false,
        }
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        MessagesService.getAllForReceiver().then((response) => {
            this.setState({ messages: response.data.items })
        });

        if (this.props.computedMatch.params.toAuthor) {
            setTimeout(() => {
                this.setState({
                    receiverName: 'James',
                    title: 'RE: Catfish in lakes',
                    content: `== > gfgdfgsdfgdf
I wanted to talk to you about your topic, do you have a minute?`
                });
            }, 200)
        }
    }

    onSubmit(event) {
        event.preventDefault();

        MessagesService.validateUser(this.state.receiverName).then((response) => {
            if (response.data.message) {
                this.setState({ errors: response.data.message });
            } else {
                if(response.data.item.id === BaseService.getLoggedUserId()) {
                    this.setState({ errors: "You can't send messages to your self." });
                } else {
                    let message = this.state;
                message['receiverId'] = response.data.item.id;
                MessagesService.saveMessage(message).then((response) => {
                    if (response.data.message) {
                        this.setState({ errors: response.data.message });
                    } else {
                        this.setState({ showConfirmationMessage: true });
                    }
                });
                }
                
            }
        });
    }
    render() {
        return (
            <div>
                <div hidden={this.state.showConfirmationMessage} className="errors text-center">
                    <span className="text-danger">{this.state.errors}</span>
                </div>
                <div hidden={!this.state.showConfirmationMessage} className="text-center">
                        <span className="text-success">The message was send successfully.</span>
                    </div>
                <form onSubmit={this.onSubmit.bind(this)} hidden={this.state.showConfirmationMessage} className="messages-form">
                    <div className="row">
                        <div className="col-4 mt-3">
                            <input type="text" name="receiverName" id="receiverName" value={this.state.receiverName} placeholder="To" onChange={this.onChange.bind(this)} required />
                        </div>
                        <div className="col-8 mt-3">
                            <input type="text" name="title" id="title" value={this.state.title} placeholder="Subject" onChange={this.onChange.bind(this)} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3">
                            <textarea type="textarea" name="content" id="content" value={this.state.content} placeholder="Message" rows="6" cols="101" onChange={this.onChange.bind(this)} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3">
                            <Button type="submit" color="primary">Send message</Button>
                            <Button type="button" className="cancel-button ml-2"><Link to="/messages">Cancel</Link></Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}