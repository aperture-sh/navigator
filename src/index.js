import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./actions/store";
import {Provider} from "react-redux";


const root = document.getElementById('root');
const url = root.getAttribute('data-url');
const configPromise = fetch(url);
configPromise.then((res) => res.json())
    .then(config => ReactDOM.render(
        <Provider store={store}>
            <App config={config} />
        </Provider>
        ,root)
    );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
