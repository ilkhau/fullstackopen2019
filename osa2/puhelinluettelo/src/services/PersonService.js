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

export default {getAll, addPerson};