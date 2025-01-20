const express = require('express');  //bring express just to get a very simple express server up and running

const app = express();  //initialize our app var with express

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000   //put the port in a var              (it will look for an environment var called PORT to use & when deployed to heroku,tht's wher it's gonna get the port no, locally run  on port 5000)
     // So basically, if ther's no env var set, it will go def to 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) //take that var & listen on a port  ( in it pass the port & then do a callbk, print, when connection happen)







//It is the main entry file
