import React, { useRef, useState } from "react";
import "../../style/loading.css";

const Loading = () => {
    return (
        <div className="loading">
            <div className="loading-card">
                <h1>Loading...</h1>
            </div>
        </div>
    );
};

export default Loading;
