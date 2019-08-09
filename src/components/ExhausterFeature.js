import React from 'react';
import './ExhausterFeature.css'
import Card, {
    CardActions,
    CardActionButtons
} from "@material/react-card";
import {Button} from "@material/react-button";
import {
    changeExhaustedFeatureProperty,
    deleteExhaustedFeature,
    removePropertyFromFeature,
    submitExhaustedFeature
} from "../actions/Actions";
import TextField, {Input} from '@material/react-text-field';
import {connect} from "react-redux";
import MaterialIcon from "@material/react-material-icon";

class ExhausterFeature extends React.Component {

    state = { f: this.props.feature };

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
        this.setState({f: f});
        this.props.changeFeature(f, target.name.split('-')[1], target.value)
    }

    removePropertyFromFeature(f, prop) {
        this.props.removeProperty(f._id.$oid, prop);
        this.setState({f: f});
        console.log(`Remove "${prop}" from ${f._id.$oid}`)
    }

    render() {
        const f = this.state.f;
        return (
            <Card>
                <h5>Feature ID: {f._id.$oid}</h5>
                <form>
                            {
                                Object.keys(f.properties).map(prop => {
                                    return (

                                        <TextField
                                            key={f._id.$oid + "-" + prop}
                                            label={prop}
                                            outlined="true"
                                            // dense="true"
                                            trailingIcon={<MaterialIcon role="button" icon="delete" />}
                                            onTrailingIconSelect={() => this.removePropertyFromFeature(f, prop)}
                                        ><Input
                                            id={f._id.$oid + "-" + prop}
                                            name={f._id.$oid + "-" + prop}
                                            value={f.properties[prop]}
                                            onChange={(e) => this.handleChangeInput(e, f)} />
                                        </TextField>
                                    )
                                })

                            }
                </form>

                <CardActions>
                    <CardActionButtons>
                        <Button outlined={"true"} className={"secondary-stroked-button"} onClick={() => this.dismissFeature(f)}>Dismiss Feature</Button>
                        <Button outlined={"true"} className={"secondary-stroked-button"} onClick={() => this.saveChanges(f)}>Save changes</Button>
                    </CardActionButtons>
                </CardActions>
            </Card>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFeature: (feature) => dispatch(deleteExhaustedFeature(feature._id.$oid)),
    submitFeature: (feature) => dispatch(submitExhaustedFeature(feature._id.$oid)),
    changeFeature: (feature, key, value) => dispatch(changeExhaustedFeatureProperty(feature._id.$oid, key, value)),
    removeProperty: (id, key) => dispatch(removePropertyFromFeature(id, key))
});


const mapStateToProps = state => ({
    config: state.config
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExhausterFeature);
