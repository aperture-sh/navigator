import React from 'react';
import './Navbar.css';

export class Navbar extends React.Component {
    render() {
        return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Tank Navigator</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Reset View</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Upload GeoJSON</a>
                    </li>
                    <li className="nav-item">
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                                <label className="custom-control-label" htmlFor="customSwitch1">Dark Mode</label>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        )
    }
}