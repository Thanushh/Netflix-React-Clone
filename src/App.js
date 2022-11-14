import React from "react";
import Homescreen from "./screens/Homescreen";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";

function App() {

    return (
        <div className="app">
            {/* Switch is been replaced with Routes..with element */}
            <Router>  
                <Routes>
                    <Route exact path="/" element={<LoginScreen />} />
                </Routes> 
                <Routes>
                    <Route exact path="/homescreen" element={<Homescreen/>} />
                </Routes>
            </Router>
        </div>
        
    );
}

export default App;
