import React from "react";
import {connect} from "react-redux";
import {
    closeExhauster,
    addExhaustedFeatures,
    submitExhaustedFeature,
    deleteExhaustedFeature,
    changeExhaustedFeatureProperty, initExhaustedFeatures, removePropertyFromFeature
} from "../actions/Actions";
import './Exhauster.css';

class Exhauster extends React.Component {
    componentDidMount() {
       this.initiated = false;
       this.exhausterEmpty = false;
       this.offset = 0;
    }

    componentDidUpdate(prevProps) {
        if (this.props.config && !this.initiated) {
            this.resetView();
        }
        if (this.props.config && this.initiated && this.props.features.length <= 10) {
            if (!this.exhausterEmpty) {
                //TODO: implement lazy loading and infinite scroll
                // this.loadFeatures(20)
            }
        }
        window.$('[data-toggle="tooltip"]').tooltip();

    }

    loadFeatures(limit) {
        fetch(`${this.props.config.exhauster.url}/?limit=${limit}&offset=${this.offset}`, {
            method: 'GET'
        })
            .then(res => res.json()).then(res => {
            this.initiated = true;
            this.offset = this.offset + limit;
            if (res.features.length <= 0) {
                this.exhausterEmpty = true;
            } else {
                this.props.addFeatures(res.features);
                this.exhausterEmpty = false;
            }
        });
    }

    resetView() {
        if (this.initiated) {
            this.props.initFeatures([]);
        }

        fetch(`${this.props.config.exhauster.url}/?limit=20&offset=0`, {
            method: 'GET'
        }).then(res => {

            return res.json();
        }).then(res => {
            this.initiated = true;
            this.props.initFeatures(res.features);
            this.offset = 20;
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

    removePropertyFromFeature(id, prop) {
        this.props.removeProperty(id, prop);
        console.log(`Remove "${prop}" from ${id}`)
    }

    render() {
        return(
            <div className={"modal " + (this.props.modal ? "exhauster-open" : "")} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Exhauster Control Panel</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.closeExhauster}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h6>The following features were not imported due database type collisions. Please correct and submit features, or dismiss them completly.</h6>
                            <button type="button" className="btn btn-default" aria-label="Left Align" data-toggle="tooltip" data-placement="top" title="Refresh Data" onClick={() => this.resetView()}>
                                <i className={"material-icons"}>refresh</i>
                            </button>
                            <h5 className={ this.props.features.length <= 0 ? "" : "show-no-features" }>No Import Error occurred</h5>
                            <ul>
                            {   this.props.features.map((f) => {
                                    return (
                                        <li key={f._id.$oid} className="list-group-item">
                                            <span>Feature ID: {f._id.$oid}</span>
                                            <form className={"form"}>
                                            {
                                                Object.keys(f.properties).map(prop => {
                                                   return (

                                                       <div className={"form-group"}  key={f._id.$oid + "-" + prop}><label htmlFor={f._id.$oid + "-" + prop}>{prop}</label>
                                                       <div className="input-group input-group-sm">

                                                           <input type="text" className="form-control form-control-lg" id={f._id.$oid + "-" + prop} name={f._id.$oid + "-" + prop}
                                                                  placeholder={"Enter " + prop} value={f.properties[prop]} onChange={(e) => this.handleChangeInput(e,f)} />
                                                           <div className="input-group-append">
                                                           <button type="button" className="btn btn-default btn-outline-secondary" title="Remove Property"  onClick={() => this.removePropertyFromFeature(f._id.$oid, prop)}>
                                                               <i className={"material-icons"}>delete</i>
                                                           </button>
                                                           </div>

                                                       </div>
                                                       </div>
                                                   )
                                                })

                                            }
                                            </form>


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
    initFeatures: (features) => dispatch(initExhaustedFeatures(features)),
    deleteFeature: (feature) => dispatch(deleteExhaustedFeature(feature._id.$oid)),
    submitFeature: (feature) => dispatch(submitExhaustedFeature(feature._id.$oid)),
    changeFeature: (feature, key, value) => dispatch(changeExhaustedFeatureProperty(feature._id.$oid, key, value)),
    removeProperty: (id, key) => dispatch(removePropertyFromFeature(id, key))
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

