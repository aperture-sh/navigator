import React from 'react';
import './App.css';
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FileUpload from "./logic/FileUpload";
import {connect} from "react-redux";
import {configChange} from "./actions/Actions";

class App extends React.Component {
    componentDidMount() {
        this.props.configChange(this.props.config);
    }

    render() {
        return (
            <div className="App">
                <FileUpload/>
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

export default connect(
    null,
    mapDispatchToProps
)(App);
