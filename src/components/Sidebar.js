import React from 'react';
import './Sidebar.css';
import {connect} from "react-redux";
import uuidv4 from 'uuid/v4';

class Sidebar extends React.Component {
    render() {
        const files = this.props.files;
        const features = this.props.features;
        return (
            <div className="sidebar">
                <h5>Feature Information:</h5>
                <ul className="list-group">
                    { features.map(function(f){
                        return (
                            <ul>
                                {   this.props.features.map((f) => {
                                    return (
                                        <li key={uuidv4()} className="list-group-item">
                                            {
                                                Object.keys(f.properties).map(prop => {
                                                    return (
                                                        <p>prop: f.properties[prop]</p>
                                                    )
                                                })
                                            }

                                            <p>
                                                <button type="button" className="btn btn-danger" onClick={() => this.dismissFeature(f)}>Dismiss Feature</button>
                                                <button type="button" className="btn btn-primary" onClick={() => this.saveChanges(f)}>Save changes</button>
                                            </p>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        );
                    })}
                </ul>
                <h5>File Uploads:</h5>
                <ul className="list-group">
                    { Object.keys(files).map(function(file){
                        const divStyle = {
                            width: files[file].progress + '%'
                        };
                        return (
                            <li key={file} className="list-group-item">
                                <p>{files[file].fileName}</p>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar"
                                         aria-valuenow={files[file].progress} aria-valuemin="0" aria-valuemax="100" style={ divStyle }>
                                        { files[file].progress }%
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    files: state.files,
    features: state.features
});

export default connect(mapStateToProps)(Sidebar)