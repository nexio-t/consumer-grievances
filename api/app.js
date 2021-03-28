const express = require('express')
const app = express()
const request = require("request"); 
const port = 5000
require('dotenv').config()


app.get('/fetchConsumerComplaints/:state', (req, res) => {

    console.log("req.params is: ", req.params); 

    const { state } = req.params; 

    res.redirect(`https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/geo/states/?${state}`)

})

app.get('/fetchRobocallComplaints/:state', (req, res) => {

    console.log("req.params is: ", req.params); 

    const { state } = req.params; 
 
    res.redirect(`https://api.ftc.gov//v0/dnc-complaints?api_key=${process.env.API_KEY}&state="${state}"`)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})