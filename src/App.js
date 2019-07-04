import React from 'react';
import './App.css';
import {Map} from "./Map";
import {Navbar} from "./Navbar";
import {Sidebar} from "./Sidebar";

function App() {
  return (

    <div className="App">
        <Navbar />
        <div className="container-fluid main-container">
            <div className="row no-gutters">
                <div className="col">
                    <Sidebar />
                </div>
                <div className="col-10">
                    <Map />
                </div>
            </div>
        </div>

    </div>
  );
}

export default App;
