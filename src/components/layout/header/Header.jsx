import React from "react";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, Button, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import UsersService from './../../../core/services/users.service';
import MessagesService from './../../../core/services/messages.service';
import { API_BASE } from "../../../core/services/Constants";
import { NO_IMAGE_URL } from './../../../core/services/Constants';

export class Header extends React.Component {


    constructor(props) {
        super(props);

        this.stateInterval = undefined;

        this.state = {
            numberOfMessages: 0,
            imagePath: undefined
        }
    }

    componentDidMount() {
        const isLoggedIn = this.props.isLoggedIn;
        if (isLoggedIn) {

            MessagesService.getNewMessagesCount().then((response) => {
                this.setState({ numberOfMessages: response.data.numberOfNewMessages })
            })

            if (!this.stateInterval) {
                this.stateInterval = setInterval(() => {
                    MessagesService.getNewMessagesCount().then((response) => {
                        this.setState({ numberOfMessages: response.data.numberOfNewMessages })
                    })
                }, 5000)
            }

            UsersService.getById().then((resp) => {
                this.setState({
                    imagePath: resp.item.imagePath
                })
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const isLoggedIn = this.props.isLoggedIn;

        if (isLoggedIn && !this.stateInterval) {
            this.stateInterval = setInterval(() => {
                MessagesService.getNewMessagesCount().then((response) => {
                    this.setState({ numberOfMessages: response.data.numberOfNewMessages })
                })
            }, 5000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.stateInterval);
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        const numberOfMessages = this.state.numberOfMessages;
        const messageNotificationColor = numberOfMessages > 0 ? '#1abc9c' : '';

        const imageSrc = () => {
            if (this.state.imagePath !== undefined) {
                return API_BASE+ this.state.imagePath;
            } else {
                return NO_IMAGE_URL;
            }
        }

        return (
            <div className="header-content">
                <div className="image-block">
                    <img src="/images/slide.jpg" alt="header" />
                </div>
                <div className="action-bar container">
                    <div className="row">
                        <div className="col-2">
                            <div className="logo-holder">
                                <Link to="/home"><img src="/images/logo.png" alt="logo" /></Link>
                            </div>
                        </div>
                        <div className="col-8 d-flex justify-content-end align-items-center">
                            <InputGroup>
                                <Input placeholder="Search topics" className="search-input" />
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                            {isLoggedIn ?
                            <Link to="/create-topic"><button className="create-topic-btn">Create topic</button></Link>
                            : ''}
                             {isLoggedIn ?
                            <Link to="/add-event"><button className="create-topic-btn">Add event</button></Link>
                            : ''}
                            
                        </div>
                        {isLoggedIn ?
                            <div className="col-2 pl-0 ml-0 d-flex justify-content-end align-items-center">
                                <span className="icon-holder mr-2 text-muted">
                                    <span className="number-of-messages" hidden={numberOfMessages === 0}>{numberOfMessages}</span>
                                    <Link to="/messages"><FontAwesomeIcon icon={faEnvelope} color={messageNotificationColor} /></Link>
                                </span>
                                <span className="nav-profile-holder cursor-pointer mr-4">
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="a" className="avatar-holder" caret>
                                            <img src={imageSrc()} alt="profile-img" />
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <Row>
                                                <Col sm={12}><Link to="/profile" className="ml-2 text-center">Profile</Link></Col>
                                                {
                                                    UsersService.isCurrentUserAdmin()
                                                        ? <Col sm={12}><Link to="/admin" className="ml-2 text-center">Admin Panel</Link></Col>
                                                        : ''
                                                }
                                                <Col sm={12}><Link to="/home" className="ml-2 text-center" onClick={() => UsersService.logout()}>Log out</Link></Col>
                                            </Row>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </span>
                            </div>
                            : <div className="col-2 pl-0 ml-0 d-flex justify-content-end align-items-center"><Link to="/login" className="login-btn">Login</Link></div>}
                    </div>
                </div>
            </div>
        );
    }
}