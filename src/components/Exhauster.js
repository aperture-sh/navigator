import React from "react";
import {connect} from "react-redux";
import {
    addExhaustedFeatures,
    initExhaustedFeatures
} from "../actions/Actions";
import './Exhauster.css';
import MaterialIcon from "@material/react-material-icon";
import Button from "@material/react-button";
import ExhausterFeature from "./ExhausterFeature";
import {Subtitle1, Subtitle2} from "@material/react-typography";

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

    render() {
        return(
            <div>
                <Subtitle1>The following features were not imported due database type collisions. Please correct and submit features, or dismiss them completly.</Subtitle1>
                <Button
                    outlined="true"
                    icon={<MaterialIcon icon="refresh" />}
                    onClick={() => this.resetView()}>Refresh</Button>
                <Subtitle2 className={ this.props.features.length <= 0 ? "" : "show-no-features" }>No Import Error occurred</Subtitle2>
                {this.props.features.map((f) => <ExhausterFeature feature={f}  key={f._id.$oid} />)}
            </div>


        )
    }
}

const mapDispatchToProps = dispatch => ({
    addFeatures: (features) => dispatch(addExhaustedFeatures(features)),
    initFeatures: (features) => dispatch(initExhaustedFeatures(features)),
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

