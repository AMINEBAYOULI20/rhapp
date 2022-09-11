const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require('dotenv').config()
global.__basedir = __dirname;

const bodyParser=require('body-parser');
const reunionRoutes = require('./routes/reunion.route')
const employeRoute = require('./routes/employe.route')
const annonceRoutes = require('./routes/annonce.route')
const congeRoutes = require('./routes/conge.route');
const authRoutes = require('./routes/auth.route');
const concourRoutes = require('./routes/concourroute');
const condidateRoutes = require('./routes/condidate.route');

const res = require("express/lib/response");
const conge = require("./models/conge");
require('./Config/dbConnect')
require('dotenv').config()

app.use(bodyParser.json())
app.use('/employe',employeRoute)
app.use('/conge',congeRoutes)
app.use('/annonce',annonceRoutes)
app.use('/reunion',reunionRoutes)
app.use('/auth',authRoutes)
app.use('/condidate',condidateRoutes)
app.use('/concour',concourRoutes)

const PORT =5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });