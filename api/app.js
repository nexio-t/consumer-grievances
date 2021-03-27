const express = require('express')
const app = express()
const request = require("request"); 
const port = 5000

app.get('/fetchConsumerComplaints', (req, res) => {

    console.log("request is: ", req); 
    res.redirect('https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/geo/states')

    // request('https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/geo/states/?state=MI', function(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         res.send(body); 
    //     }
    // })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})