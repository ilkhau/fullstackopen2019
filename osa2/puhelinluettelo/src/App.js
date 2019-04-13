import React, {useState} from 'react';
import './App.css';
import Person from './components/Person'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ])

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNewNameFilter] = useState('');

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

        setPersons(persons.concat(newPerson));
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

    const personList = () => {

        let filterFn = (person) => true;

        if(nameFilter.length > 0) {
            filterFn = (person) => {
                const val = person.name.toLowerCase().includes(nameFilter.toLocaleLowerCase());
                console.log(person, val);
                return val;
            }
        }

        return persons.filter(person => filterFn(person)).map(person => {
            console.log(person);
            return <Person key={person.name} person={person} />
        });
    };

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <div>
                rajaa näytettäviä: <input value={nameFilter} onChange={nameFilterChange}/>
            </div>
            <form>
                <h2>Lisää uusi</h2>
                <div>
                    nimi: <input value={newName} onChange={nameChange}/>
                </div>
                <div>
                    numero: <input value={newNumber} onChange={numberChange}/>
                </div>
                <div>
                    <button type="submit" onClick={addName}>lisää</button>
                </div>
            </form>
            <h2>Numerot</h2>
            <ul>
                {personList()}
            </ul>
        </div>
    )

};

export default App;
