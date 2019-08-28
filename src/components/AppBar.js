import React from 'react';
import './AppBar.css';
import TopAppBar, {TopAppBarRow, TopAppBarSection, TopAppBarTitle, TopAppBarIcon} from "@material/react-top-app-bar";
import MaterialIcon from "@material/react-material-icon";
import {
    changeFilter,
    closeDrawer,
    hideBaselayer, openDrawer,
    openExhauster,
    showBaselayer,
    startUploads,
    turnDarkModeOff,
    turnDarkModeOn
} from "../actions/Actions";
import {connect} from "react-redux";
import ReactTooltip from 'react-tooltip'
import TextField, {Input} from "@material/react-text-field";

class AppBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {darkMode: true, baseLayer: true, filter: ""};
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

    toggleBaselayer = () => {
        if (this.state.baseLayer) {
            this.setState({baseLayer: false});
            this.props.hideBaselayer();
        } else {
            this.setState({baseLayer: true});
            this.props.showBaselayer();
        }
    };

    toggleDrawer = () => {
        if (this.props.drawer) {
            this.props.closeDrawer();
        } else {
            this.props.openDrawer();
        }
    };

    triggerFilepick = () => {
        document.getElementById("filepicker").click();
    };

    uploadFiles = (e) => {
        this.props.openDrawer();
        const files = e.target.files;
        this.props.startUploads(files);
        e.target.value = "";
    };

    handleChangeInput = (e) => {
      this.setState({ ...this.state,
        filter: e.value
      });
      this.props.changeFilter("county", e.value);
    };

    render() {
        return (
            <TopAppBar>
                <input type="file" id="filepicker" className={"hidden-input"} onChange={this.uploadFiles} multiple />
                <ReactTooltip place="bottom" type="dark" effect="solid" />
                <TopAppBarRow>
                    <TopAppBarSection align='start'>
                        <TopAppBarIcon navIcon tabIndex={0}>
                            <MaterialIcon hasRipple icon='menu' onClick={() => this.toggleDrawer()}/>
                        </TopAppBarIcon>
                        <TopAppBarTitle>Tank Navigator</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection align='end'>
                        <TextField
                            label={"Filter County"}
                            outlined="true"
                            className="secondary-stroked-text-field"
                            // dense="true"
                        ><Input
                            id={"filter_county"}
                            name={"filter_county"}
                            value={this.state.filter}
                            onChange={(e) => this.handleChangeInput(e.target)} />
                        </TextField>
                        <TopAppBarIcon actionItem data-tip="Upload Files">
                            <MaterialIcon
                                aria-label="Upload File"
                                hasRipple
                                icon='cloud_upload'
                                onClick={() => this.triggerFilepick()}
                            />
                        </TopAppBarIcon>
                        <TopAppBarIcon actionItem data-tip="Import Error Handling">
                            <MaterialIcon
                                aria-label="Show Feature Import Errors"
                                hasRipple
                                icon='error'
                                onClick={() => this.props.openExhauster()}
                            />
                        </TopAppBarIcon>
                        <TopAppBarIcon actionItem data-tip="Hide/Show Baselayer">
                            <MaterialIcon
                                aria-label="Hide/Show Baselayer"
                                hasRipple
                                icon={(this.state.baseLayer) ? 'layers' : 'layers_clear'}
                                onClick={() => this.toggleBaselayer()}
                            />
                        </TopAppBarIcon>
                        <TopAppBarIcon actionItem data-tip="Darkmode on/off">
                            <MaterialIcon
                                aria-label="Darkmode on/off"
                                hasRipple
                                icon={(this.props.darkMode) ? 'brightness_high' : 'brightness_low'}
                                onClick={() => this.toggleDarkMode()}
                            />
                        </TopAppBarIcon>
                    </TopAppBarSection>

                </TopAppBarRow>
            </TopAppBar>


        )
    }
}

const mapDispatchToProps = dispatch => ({
    turnOnDarkMode: () => dispatch(turnDarkModeOn()),
    turnOffDarkMode: () => dispatch(turnDarkModeOff()),
    startUploads: (files) => dispatch(startUploads(files)),
    openExhauster: () => dispatch(openExhauster()),
    hideBaselayer: () => dispatch(hideBaselayer()),
    showBaselayer: () => dispatch(showBaselayer()),
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    changeFilter: (attr, val) => dispatch(changeFilter(attr, val))
});


const mapStateToProps = (state) => ({
    baselayer: state.baselayer,
    drawer: state.drawer,
    darkMode: state.darkMode
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBar);