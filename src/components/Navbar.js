import React from 'react';
import './Navbar.css';
import {connect} from "react-redux";
import {turnDarkModeOff, turnDarkModeOn} from "../actions/Actions";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {darkMode: false};
    }

    toggleDarkMode = () => {
        if (this.state.darkMode) {
            this.setState({darkMode: false});
            this.props.turnOffDarkMode();
        } else {
            this.setState({darkMode: true});
            this.props.turnOnDarkMode();
        }
    };

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
                            <input type="checkbox" className="custom-control-input" id="dark-mode-switch" onChange={this.toggleDarkMode} checked={this.state.darkMode} />
                                <label className="custom-control-label" htmlFor="dark-mode-switch">Dark Mode</label>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    turnOnDarkMode: () => dispatch(turnDarkModeOn()),
    turnOffDarkMode: () => dispatch(turnDarkModeOff())
});

export default connect(
    null,
    mapDispatchToProps
)(Navbar);