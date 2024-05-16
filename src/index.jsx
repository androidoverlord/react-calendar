import React from "react";
import ReactDOM from "react-dom/client";
import Calendar from "./calendar";

//

import "./index.scss";

//

function App() {
    return (
        <React.StrictMode>
            <Calendar />
        </React.StrictMode>
    );
}

//

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
