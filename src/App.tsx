import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Router>
                <Sidebar> </Sidebar>
            </Router>
                <Header> </Header>
        </>
    );
}

export default App;
