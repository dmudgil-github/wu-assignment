const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var bodyParser = require('body-parser');


const port = process.env.PORT || 3000;
const partials = '/views/partials';
var app = express();

hbs.registerPartials(__dirname + partials);
app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Weather website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


// app.get('/todos/:id', (req, res) => {
//   var id = req.params.id;
//
//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
// }

app.post('/pws', (req, res) => {
  console.log("post /pws"+req.body.pws);
//    res.send("{'received':'OK'}");
  res.render('pws-weather.hbs', {
    pageTitle: 'PWS Weather',
    displayMessage: 'This page will show you weather from your PWS :'+req.body.pws
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
