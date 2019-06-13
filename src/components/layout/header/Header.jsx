import React from "react";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, Button, Input, UncontrolledDropdown, DropdownItem, UncontrolledTooltip, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEnvelope, faSearchPlus, faBell } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import UsersService from './../../../core/services/users.service';
import MessagesService from './../../../core/services/messages.service';
import { API_BASE } from "../../../core/services/Constants";
import { NO_IMAGE_URL } from './../../../core/services/Constants';
import history from './../../../core/history/History';

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

        if (isLoggedIn) {
            UsersService.getById().then((resp) => {
                this.setState({
                    imagePath: resp.item.imagePath
                })
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.stateInterval);
    }

    search(isAdvanced) {
        const url = isAdvanced ? '/search-results/true' : '/search-results';
        history.push(url);
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        const numberOfMessages = this.state.numberOfMessages;
        const messageNotificationColor = numberOfMessages > 0 ? '#1abc9c' : '';

        const imageSrc = () => {
            if (this.state.imagePath !== undefined) {
                return API_BASE + this.state.imagePath;
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
                                    <Button color="secondary" id="search-btn" onClick={() => this.search()}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                    <UncontrolledTooltip placement="top" target="search-btn">
                                        Search
                                    </UncontrolledTooltip>
                                </InputGroupAddon>
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary" id="adv-search-btn" onClick={() => this.search(true)}>
                                        <FontAwesomeIcon icon={faSearchPlus} />
                                    </Button>
                                    <UncontrolledTooltip placement="top" target="adv-search-btn">
                                        Advanced Search
                                    </UncontrolledTooltip>
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
                                <span className="icon-holder text-muted">
                                    <span className="number-of-notifications">{3}</span>

                                    <UncontrolledDropdown className="notifications-toggle">
                                        <DropdownToggle caret>
                                            <span><a href="#" ><FontAwesomeIcon icon={faBell} color={messageNotificationColor} /></a></span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                        <DropdownItem divider />
                                            <DropdownItem>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <div className="media-object">
                                                            <img data-src="holder.js/50x50?bg=cccccc" className="img-circle" alt="50x50" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2050%2050%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16b4341eb03%20text%20%7B%20fill%3A%23919191%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16b4341eb03%22%3E%3Crect%20width%3D%2250%22%20height%3D%2250%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%226.4765625%22%20y%3D%2229.55625%22%3E50x50%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <strong className="notification-title"><a href="#">Dave Lister</a> commented on <a href="#">Tournament Haskovo.</a></strong>
                                                        <p className="notification-desc">Can someone give me the coordinates for this...</p>

                                                        <div className="notification-meta">
                                                            <small className="timestamp">27. 11. 2015, 15:00</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <div className="media-object">
                                                            <img data-src="holder.js/50x50?bg=cccccc" className="img-circle" alt="50x50" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2050%2050%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16b4341eb06%20text%20%7B%20fill%3A%23919191%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16b4341eb06%22%3E%3Crect%20width%3D%2250%22%20height%3D%2250%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%226.4765625%22%20y%3D%2229.55625%22%3E50x50%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <strong className="notification-title"><a href="#">Nikola Tesla</a> commented on <a href="#">Everything about black...</a></strong>

                                                        <p className="notification-desc">Hey, can someone pick me up from the starting...</p>

                                                        <div className="notification-meta">
                                                            <small className="timestamp">27. 10. 2015, 08:00</small>
                                                        </div>

                                                    </div>
                                                </div>
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <div className="media-object">
                                                            <img data-src="holder.js/50x50?bg=cccccc" className="img-circle" alt="50x50" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2050%2050%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16b4341eb09%20text%20%7B%20fill%3A%23919191%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16b4341eb09%22%3E%3Crect%20width%3D%2250%22%20height%3D%2250%22%20fill%3D%22%23cccccc%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%226.4765625%22%20y%3D%2229.55625%22%3E50x50%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <strong className="notification-title"><a href="#">James Bond</a> commented on <a href="#">Summer fish jam in Rila.</a></strong>

                                                        <p className="notification-desc">Is there any chance for someone to lend me...</p>

                                                        <div className="notification-meta">
                                                            <small className="timestamp">1. 9. 2015, 08:00</small>
                                                        </div>

                                                    </div>
                                                </div>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </span>
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