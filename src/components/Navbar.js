import React from 'react';
import './Navbar.css';
import {connect} from "react-redux";
import {startUpload, turnDarkModeOff, turnDarkModeOn, openExhauster} from "../actions/Actions";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {darkMode: true};
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

    uploadFile = (e) => {
        const file = e.target.files[0];
        this.props.startUpload(file.name, file);
        e.target.value = "";
    };

    render() {
        return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/navigator">Tank Navigator</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="dark-mode-switch" onChange={this.toggleDarkMode} checked={this.state.darkMode} />
                                <label className="custom-control-label" htmlFor="dark-mode-switch">Dark Mode</label>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="file-upload"
                                   onChange={this.uploadFile}/>
                            <label className="custom-file-label" htmlFor="customFile">GeoJSON Upload</label>
                        </div>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning" onClick={this.props.openExhauster}>Show Import Errors</button>
                    </li>
                </ul>
            </div>
        </nav>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    turnOnDarkMode: () => dispatch(turnDarkModeOn()),
    turnOffDarkMode: () => dispatch(turnDarkModeOff()),
    startUpload: (fileName, file) => dispatch(startUpload(fileName, file)),
    openExhauster: () => dispatch(openExhauster())
});

export default connect(
    null,
    mapDispatchToProps
)(Navbar);