import React from 'react';


function FullPageSpinner({ bgWhite }) {

    return (
        <div className={bgWhite ? "fullPageSpinner-bg-white fullPageSpinner" : "fullPageSpinner"}>
            <div className="loader" ></div>
        </div>
    )
}

export default FullPageSpinner;
