import React, {useEffect, useState} from 'react';
import './App.css';
import Persons from './components/Persons'
import Filter from './components/Filter'
import Caption from './components/Caption'
import PersonForm from "./components/PersonForm";
import personservice from './services/PersonService';
import Notification from "./components/Notification";

const App = () => {

    const [noteText, setNoteText] = useState(null);
    const [noteType, setNoteType] = useState('success');
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
            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha nimi uudella?`) === false) {
                return;
            }

            const newPerson = {...persons.find(p => p.name === newName), number: newNumber};
            personservice.updatePerson(newPerson)
                .then(up => {
                    setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson));
                    showNote(`Henkilö ${up.name} päivitettiin`, 'success');

                    setNewName('');
                    setNewNumber('');

                }).catch(err => {
                showNote(`Virhe henkilön ${newName} päivittämisessä: ${err.message}`, 'error');
            });
        } else {

            personservice.addPerson(newName, newNumber)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson));
                    showNote(`Henkilö ${newPerson.name} lisättiin`, 'success');

                    setNewName('');
                    setNewNumber('');
                }).catch(err => {
                console.log(err);
                showNote(`Virhe henkilön ${newName} lisäämisessä: ${err.message}`, 'error');
            });
        }
    };

    const showNote = (text, type) => {
        setNoteText(text);
        setNoteType(type);
        setNoteDismissal();
    };

    const setNoteDismissal = () => {
        setTimeout(() => {
            setNoteText(null);
        }, 2000);
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

        const person = persons.find(p => p.id === id);

        if (window.confirm(`Poistetaanko ${person.name}`)) {
            personservice.deletePerson(id)
                .then(id => {
                    console.log("Person deleted");
                    showNote(`Henkilö ${person.name} poistettiin`, 'success');
                })
                .catch(err => {
                    showNote(`Henkilö ${person.name} oli jo poistettu`, 'error');
                })
                .finally(() => setPersons(persons.filter(p => p.id !== person.id)));
        }
    };

    return (
        <div>
            <Notification message={noteText} type={noteType}/>
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
