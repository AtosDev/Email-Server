import React, { useState } from "react";
import { TextEditor, getInnerHtml, addContentTo } from "text-editor-react";
import axios from "axios";

import "./Editor.css";

const styles = {
    toolbarStyle: {
        display: "flex",
        alignItems: "center",
        justifycontent: "center",
    },
    toolItemStyle: {
        color: "#2CA1BC",
    },
    editorStyle: {
        border: "2px solid #727789",
        borderRadius: "10px",
        color: "#727789",
        height: "25vh",
        margin: "1rem",
        padding: "1rem",
    },
};

function Editor() {
    const [content, setContent] = useState("");
    const id = "text-editor-demo-id";
    const targetDivId = "target-div-id";

    const handleClick = () => {
        const _content = getInnerHtml(id);
        console.log("Content = ", _content);
        setContent(_content)
        addContentTo(content, targetDivId);
    };

    const handleSend = async () => {
        const BASE_URL = process.env.REACT_APP_BASE_URL + "api/sendemail";
        console.log("BASE URL = ", BASE_URL)
        const data = {
            content : content
        };
        const res = await axios.post(BASE_URL, data);
    }

    return (
        <div className="editor">
            <div className="editor-title">
                {`Email Editor`}
            </div>
            <TextEditor
                id={id}
                toolbarStyle={styles.toolbarStyle}
                toolItemStyle={styles.toolItemStyle}
                editorStyle={styles.editorStyle}
            />
            <div className="target-header">
                <h2 className="target-heading">Email Content:</h2>
                <button className="button" onClick={handleClick}>Add Content</button>
            </div>
            <div className="target-div" id={targetDivId}></div>
            <div className="send-email-btn">

                <button className="button" onClick={handleSend}>Send Email</button>
            </div>
        </div>
    );
}

export default Editor;