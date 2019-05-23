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
        })
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
                <form onSubmit={this.onSubmit.bind(this)} hidden={this.state.showConfirmationMessage}>
                    <div className="row">
                        <div className="col-4 mt-3">
                            <input type="text" name="receiverName" id="receiverName" placeholder="To" onChange={this.onChange.bind(this)} required />
                        </div>
                        <div className="col-8 mt-3">
                            <input type="text" name="title" id="title" placeholder="Subject" onChange={this.onChange.bind(this)} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3">
                            <textarea type="textarea" name="content" id="content" placeholder="Message" rows="6" cols="101" onChange={this.onChange.bind(this)} required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3">
                            <Button type="submit" color="primary">Send message</Button>
                            <Button type="button" className="cancel-button"><Link to="/messages">Cancel</Link></Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}