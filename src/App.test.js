import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./actions/store";

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  const url = '/config';
  const configPromise = fetch(url);
  configPromise.then((res) => res.json())
    .then(config => {
    	ReactDOM.render(
    		<Provider store={store}>
            	<App config={config} />
        	</Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
