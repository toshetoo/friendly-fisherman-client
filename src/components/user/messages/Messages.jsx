import React from 'react';
import MessagesService from '../../../core/services/messages.service';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import './Messages.scss';

export class Messages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: undefined,
            activeTabName: 'received',
        }

        this.delete = this.delete.bind(this);
        this.markAsRead = this.markAsRead.bind(this);
        this.selectTab = this.selectTab.bind(this);
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
                debugger
            if (response.data.message) {
                this.setState({ errors: response.data.message });
            } else {
                let messages = this.state.messages.filter(x => x.id !== id);
                this.setState({ messages });
            }
        });
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

    render() {
        const activeTabName = this.state.activeTabName;

        const handleDateFormat = (date) => {
            return new Date(date).toLocaleDateString("en-US");
        }

        const messageElement = (message) => {
            let name = activeTabName === "received" ? message.senderName : message.receiverName;
            return (
                <tr key={message.id}>
                    <td>{name}</td>
                    <td>{message.title}</td>
                    <td>{message.content}</td>
                    <td>{message.seen ? "Yes" : "No"}</td>
                    <td>{handleDateFormat(message.sentOn)}</td>
                    <td>
                        <FontAwesomeIcon icon={faCheckCircle} onClick={() => this.markAsRead(message)} disabled={message.seen} className="faIcon checkCircle" />
                        <FontAwesomeIcon icon={faTrash} onClick={() => this.delete(message.id)} className="faIcon trash" />
                    </td>
                </tr>
            );
        }

        const renderMessages = (messages) => {
            if (messages === undefined || messages.length === 0) {
                return <tr><td>No messages.</td></tr>
            }
            return messages.map((message) => messageElement(message));
        }

        return (
            <div>
                <Button className="send-message"><Link to="/new-message">Send message</Link></Button>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className={`nav-link ${activeTabName === "received" ? "active" : ""}`} to="/messages/received" onClick={() => this.selectTab('received')}>Received</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${activeTabName === "sent" ? "active" : ""}`} to="/messages/sent" onClick={() => this.selectTab('sent')}>Sent</Link>
                    </li>
                </ul>

                <table className="table" hidden={!(activeTabName === "received")}>
                    <thead>
                        <tr>
                            <th>Sender name</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Seen</th>
                            <th>Sent On</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderMessages(this.state.messages)}
                    </tbody>
                </table>

                <table className="table" hidden={!(activeTabName === "sent")}>
                    <thead>
                        <tr>
                            <th>Receiver name</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Seen</th>
                            <th>Sent On</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderMessages(this.state.messages)}
                    </tbody>
                </table>
            </div>
        );
    }
}