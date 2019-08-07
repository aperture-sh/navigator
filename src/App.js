import React from 'react';
import './App.css';
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import FileUpload from "./logic/FileUpload";
import {connect} from "react-redux";
import {configChange} from "./actions/Actions";
import Exhauster from "./components/Exhauster";
import NavigatorDialog from "./components/NavigatorDialog";

import '@material/react-button/dist/button.css'
import '@material/react-list/dist/list.css';
import "@material/react-dialog/dist/dialog.css";
import '@material/react-card/dist/card.css';
import '@material/react-text-field/dist/text-field.css';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-layout-grid/dist/layout-grid.css';
import "@material/react-switch/dist/switch.css";
import {Cell, Grid, Row} from '@material/react-layout-grid';
import AppBar from "./components/AppBar";
import {TopAppBarFixedAdjust} from '@material/react-top-app-bar';

class App extends React.Component {
    componentDidMount() {
        this.props.configChange(this.props.config);
    }

    render() {
        return (
            <div className="App">
                <FileUpload/>
                <NavigatorDialog content={<Exhauster />} title={"Exhauster Control Panel"} isOpen={this.props.modal}/>
                <AppBar />
                <TopAppBarFixedAdjust>
                    <Grid className={"main-container"}>
                        <Row className={"content-container"}>
                            <Cell desktopColumns={3} order={2} phoneColumns={4} tabletColumns={4}><Sidebar/></Cell>
                            <Cell desktopColumns={9} order={3} phoneColumns={4} tabletColumns={4}><Map/></Cell>
                        </Row>

                    </Grid>
                </TopAppBarFixedAdjust>

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
