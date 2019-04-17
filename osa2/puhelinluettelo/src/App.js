import React, {useState, useEffect} from 'react';
import './App.css';
import Persons from './components/Persons'
import Filter from './components/Filter'
import Caption from './components/Caption'
import PersonForm from "./components/PersonForm";
import axios from 'axios';

const App = () => {

    const api = "http://localhost:3001/persons";

    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNewNameFilter] = useState('');

    const fetchNames = () => {

        axios.get(api)
            .then(resp => {
                console.log("Persons fetched");
                setPersons(resp.data);
            })
            .catch(err => {
               console.log("Cannot fetch persons ", err);
            });
    };

    useEffect(fetchNames, []);

    const addName = (event) => {
        event.preventDefault();

        const newPerson = {
            name: newName,
            number: newNumber
        };

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} on jo luettelossa`);
            return;
        }

        axios.post(api, newPerson)
            .then(resp => {
                console.log(resp);
                setPersons(persons.concat(resp.data));
            });

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

    return (
        <div>
            <Caption caption="Puhelinluettelo" />
            <Filter val={nameFilter} changeHandler={nameFilterChange} />
            <PersonForm name={newName} nameHandler={nameChange}
                        number={newNumber} numberHandler={numberChange}
                        submitHandler={addName} />
            <Persons persons={persons} nameFilter={nameFilter} />
        </div>
    )

};

export default App;
