import React from 'react';
import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faRss, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitter, faGooglePlus, faDribbble } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export class Footer extends React.Component {

    render() {
        return(
            <div className="footer">
                <div className="container d-flex align-items-center">
                    <div className="row width-100 align-items-center">
                        <div className="col-4 text-center d-flex align-items-center">
                            <span><FontAwesomeIcon icon={faCopyright}/> 2019, Friendly Fisherman</span>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                        <ul className="socialicons d-flex text-muted mb-0">
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faFacebookSquare}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faTwitter}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faGooglePlus}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faDribbble}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faCloud}/></li>
                                <li className="cursor-pointer"><FontAwesomeIcon icon={faRss}/></li>
                            </ul>
                        </div>
                        <div className="col-2 text-right">
                            <Link to="/feedback">Send feedback</Link>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}