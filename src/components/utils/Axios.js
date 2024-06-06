import axios from 'axios'  //ES6, not just .jsx     ES5 === const axios = require('axios)

const Axios = axios.create({ //creating instances allows us to put a base URL in, avoids us having to put http://etc...
    baseURL: import.meta.env.DEV === 'development' 
        ? "http://localhost:3000/" 
        : "DEPLOYMENT ADDRESS", 
        timeout: 50000

})

export default Axios

//be able to user instance to go into different file, make a function that takes the JWT token we have, create a header --> attach to it
//base call
//will handle Profile