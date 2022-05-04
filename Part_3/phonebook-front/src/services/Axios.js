import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, addPerson, remove }