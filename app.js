var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

autenticated = false;

listOfUsers = [{
  'email': 'gabelliniriccardo.94@gmail.com',
  'password': 'riccard0',
  'name': 'Riccardo',
  'surname': 'Gabellini',
  'phone': '3333449042'
},
  {
    'email': 'mariorossi@hotmail.com',
    'password': 'mar10',
    'name': 'Mario',
    'surname': 'Rossi',
    'phone': '3487963457'
  },
  {
    'email': 'chiaramontinaro.94@gmail.com',
    'password': 'ch1ar4',
    'name': 'Chiara',
    'surname': 'Montinaro',
    'phone': '3392264061'
  },
  {
    'email': 'gregoriorossi@hotmail.com',
    'password': 'greg0r10',
    'name': 'Gregorio',
    'surname': 'Rossi',
    'phone': '3484457678'
  }];


app.post('/login', function (req, res) {


  autenticated = false;


  emailTyped = req.body.email;
  passwordTyped = req.body.password;

  console.log('email : ' + emailTyped);
  console.log('password :' + passwordTyped);


  let userFound = listOfUsers.find(user => user.email === emailTyped && user.password === passwordTyped);
  autenticated = !!userFound;


  if (autenticated) {
    let {name, surname, phone, email} = userFound;
    res.json({name, surname, phone, email});
  } else {
    res.status('401').send({'error': 'The email or password is incorrect'});
  }


});


app.get('/users', function (req, res) {
  if (autenticated) {
    let listToSend = listOfUsers;
    res.json(listToSend)
  } else {
    res.status('401').send({'error': 'The user is not authorized'});
  }
})

app.post('/users', function (req, res) {

  if (autenticated) {

    listOfUsers = req.body

    res.json('Users Updated!')

  }
  else {
    res.status('401').json('The user is not authorized');
  }


});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

