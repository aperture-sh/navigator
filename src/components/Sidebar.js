import React from 'react';
import './Sidebar.css';
import {connect} from "react-redux";

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
                            <li key={f.properties.area} className="list-group-item">
                                <p>City: {f.properties.city}</p>
                                <p>Postcode: {f.properties.postcode}</p>
                                <p>Area in m^2: {f.properties.area}</p>
                            </li>
                        );
                    })}
                </ul>
                <h5>File Uploads:</h5>
                <ul className="list-group">
                    { Object.keys(files).map(function(file){
                        return (
                            <li key={file} className="list-group-item">
                                <p>{files[file].fileName}</p>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar"
                                         aria-valuenow={files[file].progress} aria-valuemin="0" aria-valuemax="100">
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