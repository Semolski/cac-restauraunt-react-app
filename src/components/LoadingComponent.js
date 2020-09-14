import React from 'react';

// this is a functional component which will return an arrow function.
// which will return a loading spinner.
export const Loading = () => {
    return (
        <div className="col-12">
            // This will create a rotating spinner on the screen
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading. . .</p>
        </div>
    )
};