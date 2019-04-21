import axios from 'axios';

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl)
        .then(resp => {
            console.log("Persons fetched");
            return resp.data;
        })
        .catch(err => {
            console.log("Cannot fetch persons ", err);
            return [];
        });
};

const addPerson = (name, number) => {
    const newPerson = {
        name: name,
        number: number
    };

    return axios.post(baseUrl, newPerson)
        .then(resp => {
            console.log(resp);
            return resp.data;
        });
};

const deletePerson = (id) => {
    const deleteUrl = `${baseUrl}/${id}`;
    console.log(`Sending delete to ${deleteUrl}`);

    return axios.delete(deleteUrl)
        .then(result => id);
};

const updatePerson = (person) => {

    const updateUrl = `${baseUrl}/${person.id}`;
    console.log(`Sending update to ${updateUrl}`);

    return axios.put(updateUrl, person)
        .then(resp => {
            console.log("Updated!!!");
            return resp.data;
        });
};

export default {getAll, addPerson, deletePerson, updatePerson};