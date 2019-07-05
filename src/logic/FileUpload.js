import React from 'react';
import {connect} from "react-redux";
import {finishUpload, removeUpload, updateUploadProgress} from "../actions/Actions";
import config from '../config.json'

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
        this.intervalGC = setInterval(() => this.gcFiles(), 30000);
        this.intervalProgress = setInterval(() => this.simulateProgress(), 1000);
    }

    componentWillUnmount() {
        this.intervalGC.clear();
        this.intervalProgress.clear();
    }

    componentDidUpdate(prevProps) {
        Object.keys(this.props.files).forEach((fileId) => {
            const file = this.props.files[fileId];
            if (file.progress <= 0) {

                const formData = new FormData();
                formData.append("test", file);
                fetch(`${config.tank}/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": file.file.type
                    },
                    body: file.file,
                })
                .then(res => {
                    this.props.finishUpload(file.id)
                });
            }
        });

    }

    gcFiles() {
        Object.keys(this.props.files).forEach((fileId) => {
            const file = this.props.files[fileId];
            if (file.progress >= 100) {
                this.props.removeUpload(fileId);
            }
        });
    }

    simulateProgress() {
        Object.keys(this.props.files).forEach((fileId) => {
            const file = this.props.files[fileId];
            if (file.progress < 90) {
                this.props.updateProgress(fileId, file.progress + 5)
            }
        });
    }
}

const mapDispatchToProps = dispatch => ({
    finishUpload: (fileId) => dispatch(finishUpload(fileId)),
    removeUpload: (fileId) => dispatch(removeUpload(fileId)),
    updateProgress: (fileId, progress) => dispatch(updateUploadProgress(fileId, progress))
});

const mapStateToProps = state => ({
    files: state.files
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileUpload);