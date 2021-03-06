import React from 'react';
import './Map.css';
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {openDrawer, showFeatures} from "../actions/Actions";
import {connect} from "react-redux";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

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
            'maxTileCacheSize': 10,
            'minZoom': 2,
            'zoom': 4,
            'center': [-95.7129, 37.0902],
            'style': {
                'version': 8,
                'sources': {
                    'tank': {
                        "type": "vector",
                        "tiles": [this.props.config.tank + "/tile/{z}/{x}/{y}"],
                        "minzoom": 10
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
                        "id": "geo-polygon",
                        "source": "tank",
                        "source-layer": "io.marauder.tank",
                        "type": "fill",
                        "paint": {
                            "fill-outline-color": "rgb(139,195,74)",
                            "fill-color": "rgba(139,195,74,0.2)"
                        },
                        "filter": ["==", "$type", "Polygon"]
                    },
                    {
                        "id": "geo-point",
                        "source": "tank",
                        "source-layer": "io.marauder.tank",
                        "paint": {
                          "circle-radius": 5,
                          "circle-color": "rgba(139,195,74, 0.5)"
                        },
                        "type": "circle",
                        "filter": ["==", "$type", "Point"]
                    },
                    {
                        "id": "geo-linestring",
                        "source": "tank",
                        "source-layer": "io.marauder.tank",
                        "paint": {
                            "line-color": "rgb(139,195,74)"
                        },
                        "type": "line",
                        "filter": ["==", "$type", "LineString"]
                    },
                    {
                        "id": "geo-heatmap",
                        "source": "tank2",
                        "source-layer": "io.marauder.tank",
                        "type": "fill",
                        "paint": {
                            "fill-color":
                                [
                                    "interpolate",
                                    ["linear"],
                                    ["get", "count"],
                                    0, "rgba(139,195,74,0.1)",
                                    1000, "rgba(139,195,74,0.5)"
                                ]
                        }
                    }

                ]
            }
        });

        if (this.props.config.mapbox_key) {
            mapboxgl.accessToken = this.props.config.mapbox_key;
            this.map.addControl(new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            }));
        }

        this.map.on('click', (e) => {
            let bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
            let features = [];
            if (this.map.getZoom() > 10) {
                features = this.map.queryRenderedFeatures(bbox, {layers: ['geo-polygon', 'geo-linestring', 'geo-point']});
            } else {
                features = this.map.queryRenderedFeatures(bbox, {layers: ['geo-heatmap']});
            }

            this.props.openDrawer();
            this.props.showFeatures(features);
            // console.log(features.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.properties.count),0));
        });

        this.map.on('zoom', () => {
            if (this.map.getZoom() > 10) {
                this.map.setLayoutProperty("geo-heatmap", 'visibility', 'none');

            } else {

                this.map.setLayoutProperty("geo-heatmap", 'visibility', 'visible');
            }
        });

        this.map.on('data', (e) => {
            if (e.source && e.source.type === "vector") {
                if (e.isSourceLoaded) {
                    document.getElementById("map").classList.remove("loading");
                    this.loading = false;
                } else {
                    document.getElementById("map").classList.add("loading");
                    this.loading = true;
                }
            }
        });
    }

    toggleDarkMode() {
        if (this.props.darkMode === true) {
            this.map.setLayoutProperty("osm", 'visibility', 'none');
            this.map.setLayoutProperty("cartodb", 'visibility', 'visible');
            this.map.setPaintProperty("geo-polygon", "fill-color", "rgba(139,195,74,0.2)");
            this.map.setPaintProperty("geo-point", "circle-color", "rgba(139,195,74,0.5)");
            this.map.setPaintProperty("geo-linestring", "line-color", "rgba(139,195,74,1.0)");
            this.map.setPaintProperty("geo-polygon", "fill-outline-color", "rgb(139,195,74)");
        } else {
            this.map.setLayoutProperty("cartodb", 'visibility', 'none');
            this.map.setLayoutProperty("osm", 'visibility', 'visible');
            this.map.setPaintProperty("geo-polygon", "fill-outline-color", "#000000");
            this.map.setPaintProperty("geo-polygon", "fill-color", "rgba(1,1,1,0.2)");
            this.map.setPaintProperty("geo-point", "circle-color", "rgba(1,1,1,0.5)");
            this.map.setPaintProperty("geo-linestring", "line-color", "rgba(1,1,1,1.0)");
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
    showFeatures: (features) => dispatch(showFeatures(features)),
    openDrawer: () => dispatch(openDrawer())
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