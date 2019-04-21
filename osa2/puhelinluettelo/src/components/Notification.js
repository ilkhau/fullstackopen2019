import React, {useState, useEffect} from 'react';

const Notification = ({message, type}) => {
    console.log("note", message, type);
    if (message === null) {
        return <></>
    }

    const className = `message ${type}`;
    console.log(className);

    return (
        <div className={className}>
            {message}
        </div>
    )
};


export default Notification;