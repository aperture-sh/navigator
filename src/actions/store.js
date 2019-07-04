import { createStore } from "redux";
import rootReducer from "../reducers/root";

let store = createStore(rootReducer);

if (process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
export default store;

