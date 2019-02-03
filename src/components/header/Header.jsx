import React from "react";
import { InputGroup, InputGroupAddon, Button, Input, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

export class Header extends React.Component {
  render() {
    return (
      <div className="header-content">
        <div className="image-block">
          <img src="./images/main-header.jpg" alt="header" />
        </div>
        <div className="action-bar container">
          <div className="row">
            <div className="col-2">
              <div className="logo-holder">
                <img src="logo.jpg" alt="logo" />
              </div>
            </div>
            <div className="col-8 d-flex justify-content-end">
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
            <div className="col-2 pl-0 ml-0 d-flex justify-content-end">
                <span className="icon-holder mr-2 text-muted">
                    <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span className="profile-holder mr-4">
                    <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="avatar-holder" caret>
                            <img src="./images/avatar.jpg" alt="profile-img" />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem tag="a" href="/blah">Link</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </span>                
            </div>
          </div>
        </div>
      </div>
    );
  }
}
