import React from 'react';
import './Map.css';
import * as mapboxgl from "mapbox-gl";
import {showFeatures} from "../actions/Actions";
import {connect} from "react-redux";

class Map extends React.Component {
    componentDidMount() {
        this.initiated = false;
        this.loading = false;
    }

    componentDidUpdate(prevProps) {
        if (this.props.darkMode !== prevProps.darkMode) this.toggleDarkMode();
        if (this.props.config && !this.initiated) {
            this.initMap();
            this.initiated = true;
        }

        if (this.props.baselayer !== prevProps.baselayer) {
            this.toggleBaseLayer();
        }
    }

    initMap() {
        this.map = new mapboxgl.Map({
            'container': 'map',
            'maxTileCacheSize': 5,
            'minZoom': 2,
            'zoom': 4,
            'center': [-95.7129, 37.0902],
            'style': {
                'version': 8,
                'sources': {
                    'tank': {
                        "type": "vector",
                        "tiles": [this.props.config.tank + "/tile/{z}/{x}/{y}"],
                        "minzoom": 9
                    },
                    'tank2': {
                        "type": "vector",
                        "tiles": [this.props.config.tank + "/heatmap/{z}/{x}/{y}"],
                        "minzoom": 2,
                        "maxzoom": 10
                    },
                    'OSM': {
                        "type": "raster",
                        "tiles": [
                            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ],
                        "tileSize": 256
                    },
                    'cartodb': {
                        "type": "raster",
                        "tiles": [
                            "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
                            "https://cartodb-basemaps-b.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
                            "https://cartodb-basemaps-c.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                        ],
                        "tileSize": 256
                    }
                },
                "layers": [
                    {
                        "id": "cartodb",
                        "source": "cartodb",
                        "type": "raster"
                    },
                    {
                        "id": "osm",
                        "source": "OSM",
                        "type": "raster",
                        "layout": {
                            "visibility": "none"
                        }
                    },
                    {
                        "id": "geo",
                        "source": "tank",
                        "source-layer": "io.marauder.tank",
                        "type": "fill",
                        "paint": {
                            "fill-outline-color": "rgb(141,141,0)",
                            "fill-color": "rgba(141,134,0,0.2)"
                        }
                    },
                    {
                        "id": "geo2",
                        "source": "tank2",
                        "source-layer": "io.marauder.tank",
                        "type": "fill",
                        "paint": {
                            "fill-color":
                                [
                                    "interpolate",
                                    ["linear"],
                                    ["get", "count"],
                                    0, "rgba(141,141,0,0.1)",
                                    1000, "rgba(141,141,0,0.5)"
                                ]
                        }
                    }

                ]
            }
        });

        this.map.on('click', (e) => {
            let bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
            let features = [];
            if (this.map.getZoom() > 8) {
                features = this.map.queryRenderedFeatures(bbox, {layers: ['geo']});
            } else {
                features = this.map.queryRenderedFeatures(bbox, {layers: ['geo2']});
            }

            console.log(features);
            this.props.showFeatures(features);
            // console.log(features.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.properties.count),0));
        });

        this.map.on('zoom', () => {
            if (this.map.getZoom() > 9) {
                this.map.setLayoutProperty("geo2", 'visibility', 'none');

            } else {

                this.map.setLayoutProperty("geo2", 'visibility', 'visible');
            }
        });

        this.map.on('data', (e) => {
            if (e.source && e.source.type === "vector") {
                if (e.isSourceLoaded) {
                    window.$("#map").removeClass("loading");
                    this.loading = false;
                } else {
                    window.$("#map").addClass("loading");
                    this.loading = true;
                }
            }
        });
    }

    toggleDarkMode() {
        if (this.props.darkMode === true) {
            this.map.setLayoutProperty("osm", 'visibility', 'none');
            this.map.setLayoutProperty("cartodb", 'visibility', 'visible');
            this.map.setPaintProperty("geo", "fill-color", "rgba(141,134,0,0.2)");
            this.map.setPaintProperty("geo", "fill-outline-color", "rgb(141,141,0)");
        } else {
            this.map.setLayoutProperty("cartodb", 'visibility', 'none');
            this.map.setLayoutProperty("osm", 'visibility', 'visible');
            this.map.setPaintProperty("geo", "fill-outline-color", "#000000");
            this.map.setPaintProperty("geo", "fill-color", "rgba(1,1,1,0.2)");
        }
    }

    toggleBaseLayer() {
        if (this.props.baselayer === false) {
            this.map.setLayoutProperty("osm", 'visibility', 'none');
            this.map.setLayoutProperty("cartodb", 'visibility', 'none');
        } else {
            if (this.props.darkMode === true) {
                this.map.setLayoutProperty("cartodb", 'visibility', 'visible');
            } else {
                this.map.setLayoutProperty("osm", 'visibility', 'visible');
            }
        }
    }

    render() {
        return (
            <div id="map">

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    showFeatures: (features) => dispatch(showFeatures(features))
});

const mapStateToProps = state => ({
    darkMode: state.darkMode,
    config: state.config,
    baselayer: state.baselayer
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);