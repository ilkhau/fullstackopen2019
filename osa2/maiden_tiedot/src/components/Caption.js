import React from 'react';

const Caption = ({caption}) => {
    return (
        <h2>{caption}</h2>
    )
};

const SmallCaption = ({caption}) => {
    return (
        <h3>{caption}</h3>
    )
};

export {
    Caption,
    SmallCaption
}