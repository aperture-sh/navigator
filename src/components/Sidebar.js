import React from 'react';
import './Sidebar.css';
import {connect} from "react-redux";
import uuidv4 from 'uuid/v4';
import List, {ListItem, ListItemText, ListGroup, ListDivider} from "@material/react-list";
import {Headline5, Headline6} from "@material/react-typography";

class Sidebar extends React.Component {
    render() {
        const files = this.props.files;
        const features = this.props.features;
        return (
            <div className="sidebar">
                <Headline5>Feature Information:</Headline5>
                <Headline6 style={{ display: features.length > 0 ? "none" : "block" }}>Click on geometry to get information</Headline6>
                <ListGroup>
                    { features.map(function(f){
                        return (
                            <React.Fragment key={uuidv4()}>
                            <List>
                                {
                                    Object.keys(f.properties).map(prop => {
                                        return (
                                        <ListItem key={uuidv4()}>
                                            <ListItemText
                                                primaryText={prop +':'}
                                                secondaryText={f.properties[prop]}
                                            />
                                        </ListItem>
                                        )
                                    })
                                }
                            </List>
                            <ListDivider key={uuidv4()} tag="div" />
                            </React.Fragment>
                        );
                    })}

                </ListGroup>
                <Headline5>File Uploads:</Headline5>
                <Headline6 style={{ display: Object.keys(files).length > 0 ? "none" : "block" }}>No files uploading at the moment</Headline6>
                <List>
                    { Object.keys(files).map(function(file){
                        return (
                            <ListItem key={uuidv4()}>
                                <ListItemText
                                    primaryText={files[file].fileName}
                                    secondaryText={ files[file].progress + '%'}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    files: state.files,
    features: state.features
});

export default connect(mapStateToProps)(Sidebar)