import React from "react";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, Button, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import UsersService from './../../../core/services/users.service';

export class Header extends React.Component {

  isLoggedIn() {
    return UsersService.getLoggedUser();
  }

  render() {
    return (
      <div className="header-content">
        <div className="image-block">
          <img src="./images/slide.jpg" alt="header" />
        </div>
        <div className="action-bar container">
          <div className="row">
            <div className="col-2">
              <div className="logo-holder">
                <Link to="/home"><img src="./images/logo.jpg" alt="logo" /></Link>
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
              <button className="create-topic-btn">Create topic</button>
            </div>
            {this.isLoggedIn() ? 
              <div className="col-2 pl-0 ml-0 d-flex justify-content-end align-items-center">
                <span className="icon-holder mr-2 text-muted">
                    <FontAwesomeIcon icon={faEnvelope} />
                </span>
              <span className="nav-profile-holder cursor-pointer mr-4">
                  <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="avatar-holder" caret>
                          <img src="./images/avatar.jpg" alt="profile-img" />
                      </DropdownToggle>
                      <DropdownMenu>
                          <Link to="/profile" className="ml-2 text-center">Profile</Link>
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
