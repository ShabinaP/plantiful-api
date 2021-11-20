const axios = require('axios') ;
require('dotenv').config()
const APIENDPOINT = process.env.APIENDPOINT
const getData = async() => {
    const plants = await axios.get(APIENDPOINT,
        )
     const data = await plants.data
     console.log(data)
}

getData()