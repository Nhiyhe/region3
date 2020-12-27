import axios from'axios';

const requestAxios = axios.create({
        baseURL:'https://church-project.herokuapp.com/api/v1',        
})

export default requestAxios;