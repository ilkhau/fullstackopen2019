import React, {useEffect, useState} from 'react';
import './App.css';
import Persons from './components/Persons'
import Filter from './components/Filter'
import Caption from './components/Caption'
import PersonForm from "./components/PersonForm";
import personservice from './services/PersonService';

const App = () => {

    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNewNameFilter] = useState('');

    const fetchNames = () => {

        personservice.getAll()
            .then(initialPersons => setPersons(initialPersons))
    };

    useEffect(fetchNames, []);

    const addName = (event) => {
        event.preventDefault();

        if (persons.some(person => person.name === newName)) {
            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha nimi uudella?`) == false) {
                return;
            }

            const newPerson = {...persons.find(p => p.name === newName), number: newNumber};
            personservice.updatePerson(newPerson)
                .then(up => setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson)));
        } else {

            personservice.addPerson(newName, newNumber)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson));
                });
        }


        setNewName('');
        setNewNumber('');
    };

    const nameFilterChange = (event) => {
        setNewNameFilter(event.target.value);
    };

    const nameChange = (event) => {
        setNewName(event.target.value);
    };

    const numberChange = (event) => {
        setNewNumber(event.target.value);
    };

    const deletePerson = (id) => (event) => {
        event.preventDefault();

        const name = persons.find(person => person.id === id).name;

        if (window.confirm(`Poistetaanko ${name}`)) {
            personservice.deletePerson(id)
                .then(id => {
                    console.log("Person deleted");
                    setPersons(persons.filter(person => person.id !== id));
                })
        }
    };

    return (
        <div>
            <Caption caption="Puhelinluettelo"/>
            <Filter val={nameFilter} changeHandler={nameFilterChange}/>
            <PersonForm name={newName} nameHandler={nameChange}
                        number={newNumber} numberHandler={numberChange}
                        submitHandler={addName}/>
            <Persons persons={persons} nameFilter={nameFilter} deleteHandler={deletePerson}/>
        </div>
    )

};

export default App;
