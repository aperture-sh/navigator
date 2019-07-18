import React from "react";
import {connect} from "react-redux";
import {
    closeExhauster,
    addExhaustedFeatures,
    submitExhaustedFeature,
    deleteExhaustedFeature,
    changeExhaustedFeatureProperty
} from "../actions/Actions";
import './Exhauster.css';

class Exhauster extends React.Component {
    componentDidMount() {
       this.initiated = false;
       this.offset = 0;
    }

    componentDidUpdate(prevProps) {
        if (this.props.config && !this.initiated) {
            this.loadFeatures(20, this.offset)
        }
        if (this.props.config && this.initiated && this.props.features.length <= 10) {
            this.loadFeatures(20, this.offset)
        }

    }

    loadFeatures(limit, offset) {
        fetch(`${this.props.config.exhauster.url}/?limit=${limit}&offset=${offset}`, {
            method: 'GET'
        })
            .then(res => res.json()).then(res => {
            console.log(res);
            this.initiated = true;
            this.offset = this.offset + limit;
            this.props.addFeatures(res.features)
        });
    }

    saveChanges(f) {
        this.deleteFromExhauster(f);
        let gFeatures = {};
        Object.assign(gFeatures, f);
        delete gFeatures._id;
        fetch(`${this.props.config.tank}/`, {
            method: 'POST',
            body: JSON.stringify(gFeatures)
        }).then(res => {
            this.props.submitFeature(f);
            this.offset = this.offset - 1;
        });
    }

    dismissFeature(f) {
        this.deleteFromExhauster(f);
    }

    deleteFromExhauster(f) {
        fetch(`${this.props.config.exhauster.url}/${f._id.$oid}`, {
            method: 'DELETE'
        }).then(res => {
            this.props.deleteFeature(f);
            this.offset = this.offset - 1;
        });
    }

    handleChangeInput(e, f) {
        let target = e.target;
        this.props.changeFeature(f, target.name.split('-')[1], target.value)
    }

    render() {
        return(
            <div className={"modal " + (this.props.modal ? "exhauster-open" : "")} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeExhauster}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul>
                            {   this.props.features.map((f) => {
                                    return (
                                        <li key={f._id.$oid} className="list-group-item">
                                            {
                                                Object.keys(f.properties).map(prop => {
                                                   return (
                                                       <div className="form-group" key={f._id.$oid + "-" + prop}>
                                                           <label htmlFor={f._id.$oid + "-" + prop}>{prop}</label>
                                                           <input type="text" className="form-control" id={f._id.$oid + "-" + prop} name={f._id.$oid + "-" + prop}
                                                                  placeholder={"Enter " + prop} value={f.properties[prop]} onChange={(e) => this.handleChangeInput(e,f)} />

                                                       </div>
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeExhauster}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    closeExhauster: () => dispatch(closeExhauster()),
    addFeatures: (features) => dispatch(addExhaustedFeatures(features)),
    deleteFeature: (feature) => dispatch(deleteExhaustedFeature(feature._id.$oid)),
    submitFeature: (feature) => dispatch(submitExhaustedFeature(feature._id.$oid)),
    changeFeature: (feature, key, value) => dispatch(changeExhaustedFeatureProperty(feature._id.$oid, key, value))
});


const mapStateToProps = state => ({
    modal: state.modal,
    features: state.exhausted_features,
    config: state.config
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exhauster);

