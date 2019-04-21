import React from 'react';

const Filter = ({val, changeHandler}) => {
    return (<div>
        rajaa näytettäviä: <input value={val} onChange={changeHandler}/>
    </div>)
};

export default Filter;