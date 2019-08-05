import React from 'react';
import './ExhausterFeature.css'
import Card, {
    CardActions,
    CardActionButtons,
    CardActionIcons
} from "@material/react-card";
import {Button} from "@material/react-button";
import {
    addExhaustedFeatures, changeExhaustedFeatureProperty,
    closeExhauster,
    deleteExhaustedFeature,
    initExhaustedFeatures, removePropertyFromFeature,
    submitExhaustedFeature
} from "../actions/Actions";
import {connect} from "react-redux";

class ExhausterFeature extends React.Component {

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
        const f = this.props.feature;
        return (
            <Card key={f._id.$oid}>
                        <h5>Feature ID: {f._id.$oid}</h5>
                        <form className={"form"}>
                            {
                                Object.keys(f.properties).map(prop => {
                                    return (

                                        <div className={"form-group"} key={f._id.$oid + "-" + prop}><label
                                            htmlFor={f._id.$oid + "-" + prop}>{prop}</label>
                                            <div className="input-group input-group-sm">

                                                <input type="text" className="form-control form-control-lg"
                                                       id={f._id.$oid + "-" + prop}
                                                       name={f._id.$oid + "-" + prop}
                                                       placeholder={"Enter " + prop} value={f.properties[prop]}
                                                       onChange={(e) => this.handleChangeInput(e, f)}/>
                                                <div className="input-group-append">
                                                    <button type="button"
                                                            className="btn btn-default btn-outline-secondary"
                                                            title="Remove Property"
                                                            onClick={() => this.removePropertyFromFeature(f._id.$oid, prop)}>
                                                        <i className={"material-icons"}>delete</i>
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })

                            }
                        </form>


                <CardActions>
                    <CardActionButtons>
                        <Button outlined={"true"} onClick={() => this.dismissFeature(f)}>Dismiss Feature</Button>
                        <Button outlined={"true"} onClick={() => this.saveChanges(f)}>Save changes</Button>
                    </CardActionButtons>

                    <CardActionIcons>

                    </CardActionIcons>
                </CardActions>
            </Card>
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
)(ExhausterFeature);
