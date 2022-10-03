import React from "react";
import Editor from "../Editor/Editor";

import "./Home.css";

function Home() {
    console.log(":)");
    return (
        <div className="root">
            <div className="home">
                <Editor />
            </div>
        </div>
    );
}

export default Home;