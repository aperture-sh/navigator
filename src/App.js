import React from 'react';
import './App.scss';
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import FileUpload from "./logic/FileUpload";
import {connect} from "react-redux";
import {configChange} from "./actions/Actions";
import Exhauster from "./components/Exhauster";
import NavigatorDialog from "./components/NavigatorDialog";

import AppBar from "./components/AppBar";
import {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import Drawer, {DrawerAppContent, DrawerContent} from "@material/react-drawer";

class App extends React.Component {
    state = {open: true};

    componentDidMount() {
        this.props.configChange(this.props.config);
    }

    render() {
        return (
            <div className="App">
                <FileUpload/>
                <NavigatorDialog content={<Exhauster />} title={"Exhauster Control Panel"} isOpen={this.props.modal}/>
                <div className="drawer-container">
                <AppBar />
                <TopAppBarFixedAdjust className='top-app-bar-fix-adjust'>
                    <Drawer
                        dismissible
                        open={this.props.drawer}
                    >
                        <DrawerContent>
                        <Sidebar />
                        </DrawerContent>
                    </Drawer>
                    <DrawerAppContent className='drawer-app-content'>
                       <Map />
                    </DrawerAppContent>
                    {/*<Grid className={"main-container"}>*/}
                    {/*    <Row className={"content-container"}>*/}
                    {/*        <Cell desktopColumns={3} order={2} phoneColumns={0} tabletColumns={3}><Sidebar/></Cell>*/}
                    {/*        <Cell desktopColumns={9} order={3} phoneColumns={12} tabletColumns={12}><Map/></Cell>*/}
                    {/*    </Row>*/}

                    {/*</Grid>*/}
                </TopAppBarFixedAdjust>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    configChange: (config) => dispatch(configChange(config))
});

const mapStateToProps = state => ({
    modal: state.modal,
    drawer: state.drawer
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
