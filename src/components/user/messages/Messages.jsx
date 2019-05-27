import React from 'react';
import MessagesService from '../../../core/services/messages.service';
import { Link } from "react-router-dom";
import { Button, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import './Messages.scss';

export class Messages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: undefined,
            activeTabName: 'received',
            selectedMessage: undefined,
        }

        this.delete = this.delete.bind(this);
        this.selectTab = this.selectTab.bind(this);
        this.markAsRead = this.markAsRead.bind(this);
        this.selectMessage = this.selectMessage.bind(this);
    }

    componentDidMount() {
        if (this.props.computedMatch.params.selectedTab) {
            this.selectTab(this.props.computedMatch.params.selectedTab)
        } else {
            MessagesService.getAllForReceiver().then((response) => {
                this.setState({ messages: response.data.items })
            });
        }
    }


    delete(id) {
        MessagesService.delete(id).then((response) => {
            if (response.data.message) {
                this.setState({ errors: response.data.message });
            } else {
                let messages = this.state.messages.filter(x => x.id !== id);
                this.setState({ messages });
            }
        });
    }
    
    selectTab(tabName) {
        if (tabName.toLowerCase() === 'sent') {
            MessagesService.getAllForSender().then((response) => {
                this.setState({ messages: response.data.items, activeTabName: 'sent' })
            });
        } else {
            MessagesService.getAllForReceiver().then((response) => {
                this.setState({ messages: response.data.items, activeTabName: 'received' })
            });
        }
    }

    markAsRead(message) {
        MessagesService.markAsRead(message).then((response) => {
            if (response.data.message) {
                this.setState({ errors: response.data.message });
            } else {
                let messages = this.state.messages.map((m) => {
                    if (m.id === message.id) {
                        m.seen = true;
                    }

                    return m;
                });

                this.setState({ messages });
            }
        });
    }

    selectMessage(message) {
        if (!message.seen && this.state.activeTabName !== 'sent') {
            this.markAsRead(message);
        }
        if (this.state.selectedMessage === message.id)
            this.setState({ selectedMessage: undefined });
        else
            this.setState({ selectedMessage: message.id });
    }

    render() {
        const activeTabName = this.state.activeTabName;

        const handleDateFormat = (date) => {
            return new Date(date).toLocaleDateString("en-US");
        }

        const receiverMessageElement = (message) => {
            let name = activeTabName === "received" ? message.senderName : message.receiverName;
            let className = this.state.selectedMessage === message.id ? "user-message selected-message" : "user-message";
            return (
                <div key={message.id} className={className}>
                    <div className="row message-details" style={{ fontWeight: message.seen === true ? "" : "bold" }} onClick={() => this.selectMessage(message)}>
                        <div className="col-md-3">{name}</div>
                        <div className="col-md-3">{message.title}</div>
                        <div className="col-md-2 short-message-content">{message.content}</div>
                        <div className="col-md-2">{handleDateFormat(message.sentOn)}</div>
                        <div className="col-md-2">
                            <FontAwesomeIcon icon={faTrash} onClick={() => this.delete(message.id)} className="faIcon trash" />
                            <FontAwesomeIcon icon={faCheckCircle} onClick={() => this.markAsRead(message)} hidden={message.seen} className="faIcon checkCircle" />
                        </div>
                    </div>
                    <div className="row message-content">
                        {message.content}
                    </div>
                </div>
            );
        }

        const senderMessageElement = (message) => {
            let name = activeTabName === "sent" ? message.senderName : message.receiverName;
            let className = this.state.selectedMessage === message.id ? "user-message selected-message" : "user-message";
            return (
                <div key={message.id} className={className} onClick={() => this.selectMessage(message)}>
                    <div className="row message-details">
                        <div className="col-md-3">{name}</div>
                        <div className="col-md-3">{message.title}</div>
                        <div className="col-md-2">{message.seen ? "Yes" : "No"}</div>
                        <div className="col-md-2">{handleDateFormat(message.sentOn)}</div>
                        <div className="col-md-2">
                            <FontAwesomeIcon icon={faTrash} onClick={() => this.delete(message.id)} className="faIcon trash" />
                        </div>
                    </div>
                    <div className="row message-content">
                        <div>{message.content}</div>
                    </div>
                </div>
            );
        }

        const renderReceiverMessages = (messages) => {
            if (messages === undefined || messages.length === 0) {
                return <p>No messages received.</p>
            }
            return messages.map((message) => receiverMessageElement(message));
        }

        const renderSenderMessages = (messages) => {
            if (messages === undefined || messages.length === 0) {
                return <p>No messages sent.</p>
            }
            return messages.map((message) => senderMessageElement(message));
        }

        return (
            <div className="list-holder">
                <Button className="send-message"><Link to="/new-message">Send message</Link></Button>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className={`nav-link ${activeTabName === "received" ? "active" : ""}`} to="/messages/received" onClick={() => this.selectTab('received')}>Received</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${activeTabName === "sent" ? "active" : ""}`} to="/messages/sent" onClick={() => this.selectTab('sent')}>Sent</Link>
                    </li>
                </ul>

                <div className="message-container" hidden={!(activeTabName === "received")}>
                    <div className="row messages-header">
                        <div className="col-md-3">Sender name</div>
                        <div className="col-md-3">Subject</div>
                        <div className="col-md-2">Message</div>
                        <div className="col-md-2">Sent On</div>
                        <div className="col-md-2">Options</div>
                    </div>
                    {renderReceiverMessages(this.state.messages)}
                </div>

                <div className="message-container" hidden={!(activeTabName === "sent")}>
                    <div className="row messages-header">
                        <div className="col-md-3">Receiver name</div>
                        <div className="col-md-3">Subject</div>
                        <div className="col-md-2">Seen</div>
                        <div className="col-md-2">Sent On</div>
                        <div className="col-md-2">Options</div>
                    </div>
                    {renderSenderMessages(this.state.messages)}
                </div>

            </div>
        );
    }
}