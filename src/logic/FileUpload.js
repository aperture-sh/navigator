import React from 'react';
import {connect} from "react-redux";
import {finishUpload, updateUploadProgress} from "../actions/Actions";

class FileUpload extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            files: {}
        };
    }

    render() {
        return null;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
    }
}

const mapDispatchToProps = dispatch => ({
    finishUpload: (fileName) => dispatch(finishUpload(fileName)),
    updateProgress: (fileName, progress) => dispatch(updateUploadProgress(fileName, progress))
});

const mapStateToProps = state => ({
    files: state.files
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileUpload);