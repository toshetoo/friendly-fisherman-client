import React, { Component } from 'react';
import MessagesService from '../../../core/services/messages.service';
import { Button } from 'reactstrap';

export class Messages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: undefined,
        }

        this.delete = this.delete.bind(this);
        this.markAsRead = this.markAsRead.bind(this);
    }

    componentDidMount() {
        MessagesService.getAll().then((response) => {
            this.setState({ messages: response.data.items })
        })
    }

    sendMessage() {

    }

    delete(id) {
        MessagesService.delete(id).then((response) => {

        });
    }

    markAsRead(id) {
        MessagesService.markAsRead(id).then((response) => {
            
        });
    }

    render() {
        const messageElement = (message) => {
            return (
                <tr>
                    <td>{message.Id}</td>
                    <td>{message.SenderId}</td>
                    <td>{message.ReceiverId}</td>
                    <td>{message.Title}</td>
                    <td>{message.Content}</td>
                    <td>{message.Seen}</td>
                    <td>{message.SentOn}</td>
                    <td><Button onClick={() => this.markAsRead(message.id)}>Mark as read</Button></td>
                    <td><Button onClick={() => this.delete(message.id)}>Delete</Button></td>
                </tr>
            );
        }

        const renderMessages = (messages) => {
            if (messages === undefined || messages.length === 0) {
                return "You have no messages.";
            }
            return messages.maps((message) => messageElement(message));
        }

        return (
            <div>
                <Button onClick={this.sendMessage.bind(this)}>Send message</Button>
                {renderMessages(this.state.messages)}
            </div>
        );
    }
}