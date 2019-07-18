import React from "react";
import {connect} from "react-redux";
import {closeExhauster, addExhaustedFeatures} from "../actions/Actions";
import './Exhauster.css';

class Exhauster extends React.Component {
    componentDidMount() {
       this.initiated = false;

    }

    componentDidUpdate(prevProps) {
        if (this.props.config && !this.initiated) {
            fetch(`${this.props.config.exhauster.url}/?limit=20`, {
                method: 'GET'
            })
                .then(res => res.json()).then(res => {
                    console.log(res);
                    this.initiated = true;
                    this.props.addFeatures(res.features)
                });
        }
    }

    dataChanged() {

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
                                                           <input type="text" className="form-control" id={f._id.$oid + "-" + prop}
                                                                  placeholder={"Enter " + prop} value={f.properties[prop]} onChange={this.dataChanged} />

                                                       </div>
                                                   )
                                                })
                                            }

                                            <p>
                                                <button type="button" className="btn btn-danger">Dismiss Feature</button>
                                                <button type="button" className="btn btn-primary">Save changes</button>
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
    addFeatures: (features) => dispatch(addExhaustedFeatures(features))
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
