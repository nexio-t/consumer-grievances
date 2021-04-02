# Consumer Grievances

A web app to fetch consumer complaints from the FTC and Consumer Financial Protection Bureau. Per exercise instructions, APIs were sourced from [data.gov](https://www.data.gov/). 

The thinking behind this app was to combine sources of consumer complaints -- robocalls from businesses and financial / services complaints -- by state to understand which states have it best and which have it worst.   

## Installation

To run locally, navigate to the consumer-grievances sub-folder and run yarn install followed by yarn start

```bash
cd consumer-grievances/frontend/consumer-grievances
yarn install; yarn start
```

If you would like to run the backend locally as well, please see the repo here and replace all requests with localhost:5000. 

## Deployed versions
You can access the deployed version of the backend [here](https://consumer-grievances-backend.herokuapp.com/). 

You can access the backend repo [here](https://github.com/nexio-t/consumer-grievances-backend), and a deployed version [here](https://consumer-grievances-backend.herokuapp.com/).

## Demo 
You can see a gif demonstrating functionality here:

![Consumer Grievances Home Page]('./frontend/consumer-grievances/public/consumergrievances.gif');

![Consumer Grievances Home Page]('./frontend/public/grievanceshomepage.png');

## Deployed versions
You can access the deployed version of the backend here. 

You can access the backend repo here, and a deployed version here.

## Areas of further development 
* Adding TypeScript interfaces to validate data structures and types
* Create a weighted-average quality-of-life score based on complaints per capita and other metrics 
* Create additional dashboards that look at complaints across other categories 
* With additional functionalities and / or other pages, redux would be a viable option 

## Technical decisions
* Requests were handled with express's [redirect](https://expressjs.com/en/4x/api.html#res.redirect) but could have also been made with the request (or other) libraries, although redirects were sufficient and transparently service data from an API that is not my own. 
* Frontend could have used other frameworks and libraries, but I am familiar and comfortable with React and was optimizing for speed of development.
* Material UI is new to me but provides clean and customizable components. In hindsight, I may have opted to use a CSS framework like Bulma given the simplicity of the app and to optimize for speed.
* This is a simple app, so redux would be overkill, but with additional pages and / or further requests to additional APIs, redux would be a good candidate for state management. 

## Stack
[Create React App](https://reactjs.org/docs/create-a-new-react-app.html)

[Express](https://expressjs.com/)

[Material UI](https://material-ui.com/)

[FTC Do Not Call List API](https://www.ftc.gov/developer/api/v0/endpoints/do-not-call-dnc-reported-calls-data-api)

[Consumer Financial Protection Bureau API](https://cfpb.github.io/api/ccdb/api.html)

[Data USA API](https://datausa.io/about/api//)