import React from 'react';
import Dialog, {DialogButton, DialogContent, DialogFooter, DialogTitle} from "@material/react-dialog";
import {connect} from "react-redux";
import "@material/react-dialog/dist/dialog.css";
import "./NavigatorDialog.css";
import {closeExhauster} from "../actions/Actions";

class NavigatorDialog extends React.Component {

    render() {
        const isOpen = this.props.isOpen;
        const content = this.props.content;
        const title = this.props.title;
        return(
            <Dialog open={isOpen} onClose={this.props.closeModal}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              {content}
            </DialogContent>
            <DialogFooter>
                <DialogButton action='dismiss' outlined="true">Close</DialogButton>
            </DialogFooter>
            </Dialog>
    )
    }
}

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeExhauster())
});

const mapStateToProps = state => ({
    isOpen: state.modal
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigatorDialog);