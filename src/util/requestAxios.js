import axios from'axios';

const requestAxios = axios.create({
        // baseURL:'https://boiling-bayou-41464.herokuapp.com/api/v1',        
        baseURL:'http://localhost:7000/api/v1',        
})

export default requestAxios;