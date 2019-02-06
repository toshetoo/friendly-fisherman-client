import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faRss } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitter, faGooglePlus, faDribbble } from '@fortawesome/free-brands-svg-icons';

export class Footer extends React.Component {

    render() {
        return(
            <div className="footer">
                <div className="container d-flex align-items-center">
                    <div className="row width-100">
                        <div className="col-1">
                            <img src="logo.png" alt="logo" />
                        </div>
                        <div className="col-5 text-center">
                            <span>Copyrights 2019, Friendly Fisherman</span>
                        </div>
                        <div className="col-6">
                        <ul className="socialicons d-flex text-muted">
                                <li><FontAwesomeIcon icon={faFacebookSquare}/></li>
                                <li><FontAwesomeIcon icon={faTwitter}/></li>
                                <li><FontAwesomeIcon icon={faGooglePlus}/></li>
                                <li><FontAwesomeIcon icon={faDribbble}/></li>
                                <li><FontAwesomeIcon icon={faCloud}/></li>
                                <li><FontAwesomeIcon icon={faRss}/></li>
                            </ul>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}