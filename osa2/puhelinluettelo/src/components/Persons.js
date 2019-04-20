import React from 'react';
import Caption from './Caption'
import Button from './Button'

const Person = ({person, deleteHandler}) => {
    console.log(person);
    return (
        <li>
            {person.name} {person.number}
            <Button text="poista" handler={deleteHandler(person.id)} />
        </li>
    )
};

const Persons = ({persons, nameFilter, deleteHandler}) => {

    const personList = () => {

        let filterFn = (person) => true;

        if (nameFilter.length > 0) {
            filterFn = (person) => {
                const val = person.name.toLowerCase().includes(nameFilter.toLocaleLowerCase());
                console.log(person, val);
                return val;
            }
        }

        return persons.filter(person => filterFn(person)).map(person => {
            console.log(JSON.stringify(person));
            return <Person key={person.name} person={person} deleteHandler={deleteHandler}/>
        });
    };

    return (
        <div>
            <Caption caption="Henkilöt"/>
            <ul>
                {personList()}
            </ul>
        </div>
    )
};

export default Persons;