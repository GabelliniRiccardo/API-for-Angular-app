var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

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
  }];


app.post('/login', function (req, res) {

  autenticated = false;


  emailTyped = req.body.email;
  passwordTyped = req.body.password;

  console.log('email : ' + emailTyped);
  console.log('password :' + passwordTyped);


  let userFound = listOfUsers.find(user => user.email === emailTyped && user.password === passwordTyped);
  autenticated = !!userFound;


  /*let userFound = listOfUsers.find((user) => {
    if (user.email === emailTyped && user.password == passwordTyped) {
      autenticated = true
    }
    return autenticated;
  })*/

  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (autenticated) {
    let { name, surname, phone, email } = userFound;
    res.json({ name, surname, phone, email });
  } else {
    res.status('401').send({'error': 'The email or password is incorrect'});
  }


});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


/* scope globale booleani + usa find per trovare gli utenti
* */

/*
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies


app.post('/login', function (req, res) {

  autenticated = false;

  listOfUsers = [{'email': 'gabelliniriccardo.94@gmail.com', 'password': 'riccard0'},
                 {'email': 'mariorossi@hotmail.com', 'password': 'mar10'}];

  emailTyped = req.body.email;
  passwordTyped = req.body.password;

  console.log('email : ' + emailTyped);
  console.log('password :' + passwordTyped);

  listOfUsers.forEach((user) => {
    if (user.email === emailTyped && user.password == passwordTyped) {
      autenticated = true;
    }
  })

  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if(autenticated) {
    res.send('200');
  }else {
    res.send('401');
  }


});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

 */