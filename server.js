const express = require('express');  //bring express just to get a very simple express server up and running
const connectDB = require('./config/db')  //bring connectDB here

const app = express();  //initialize app var with express

//Connect Database
connectDB();

app.get('/', (req, res) => res.send('API Running'));  //create a single endpoint to test
           //res.send:-send data to browser
    

//define Routes(for all routes file)
app.use('/api/users', require('./routes/api/users'));     //put endpt(/)  &   api/users pertain to user's file  &  api/users:-pertain to ('/') of users file
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000   //put the port in a var  (it will look for an environment var called PORT to use & when deployed ,tht's where it's gonna get the port no, locally run on port 5000)
     // So basically, if ther's no env var set, it will go def to 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) //take that var & listen on a port  ( in it pass the port & then do a callbk, print, when connection happen)


//It is the main entry file
