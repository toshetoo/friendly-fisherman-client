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
                            <img src="./images/logo.jpg" alt="logo" />
                        </div>
                        <div className="col-5 text-center d-flex align-items-center justify-content-end">
                            <span>Copyrights 2019, Friendly Fisherman</span>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                        <ul className="socialicons d-flex text-muted">
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faFacebookSquare}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faTwitter}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faGooglePlus}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faDribbble}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faCloud}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faRss}/></li>
                            </ul>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}