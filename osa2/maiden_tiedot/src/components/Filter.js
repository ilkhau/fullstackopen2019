import React from 'react';

const Filter = ({text, val, changeHandler}) => {
    return (<div>
        {text} <input value={val} onChange={changeHandler}/>
    </div>)
};

export default Filter;
