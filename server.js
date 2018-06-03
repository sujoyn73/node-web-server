const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  fs.appendFileSync('log.txt',log + '\n')
  console.log(log);
  next();
});

// app.use((req,res) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('convertToCaps',(text) => {
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('Welcome.hbs',{
    pageTitle: 'Welcome Page',
    user: 'Sujoy',
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to find the data!!'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageTitle: 'Projects',
  });
});

app.listen(port,() => {
  console.log(`Server started on port : ${port}`);
});
