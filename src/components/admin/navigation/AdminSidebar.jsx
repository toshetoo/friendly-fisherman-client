import React from 'react';
import './AdminSidebar.scss';
import { Link } from 'react-router-dom';

export class AdminSidebar extends React.Component {

    render() {
        return(
            <div className="sidebar-holder">
                <h3 className="header">Available actions</h3>
                <div className="divider"></div>
                <div className="action">
                    <Link to="/admin/users-list">User management</Link>
                </div>                
                <div className="divider"></div>
                <div className="action">
                    <Link to="/admin/user-feedback">User Feedback</Link>
                </div>
                <div className="divider"></div>
                <div className="action">
                    <Link to="/admin/reports">Reports</Link>
                </div>
                <div className="divider"></div>
                <div className="action">
                    <Link to="/admin/polls-list">Poll Management</Link>
                </div>
                <div className="divider"></div>
                <div className="action">
                    <Link to="/admin/categories-list">Category Management</Link>
                </div>
            </div>
        );
    }
}