import React from 'react';
import './App.css';
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FileUpload from "./logic/FileUpload";
import {connect} from "react-redux";
import {configChange} from "./actions/Actions";
import Exhauster from "./components/Exhauster";

class App extends React.Component {
    componentDidMount() {
        this.props.configChange(this.props.config);
    }

    render() {
        return (
            <div className="App">
                <FileUpload/>
                <Exhauster />
                <div className={"blackout-layer " + (this.props.modal ? "show-blackout-layer" : "")} tabIndex="-1" role="dialog">&nbsp;</div>
                <Navbar/>
                <div className="container-fluid main-container">
                    <div className="row no-gutters">
                        <div className="col">
                            <Sidebar/>
                        </div>
                        <div className="col-10">
                            <Map/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    configChange: (config) => dispatch(configChange(config))
});

const mapStateToProps = state => ({
    modal: state.modal
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
