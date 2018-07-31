var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

listOfUsers = [{
  'email': 'gabelliniriccardo.94@gmail.com',
  'password': 'riccard0',
  'name': 'Riccardo',
  'surname': 'Gabellini',
  'phone': '3333449042'
}];

app.post('/login', function (req, res) {

  const emailTyped = req.body.email;
  const passwordTyped = req.body.password;

  console.log('email : ' + emailTyped);
  console.log('password :' + passwordTyped);

  const userFound = listOfUsers.find(user => user.email === emailTyped && user.password === passwordTyped);
  const autenticated = !!userFound;

  if (autenticated) {
    const {name, surname, phone, email} = userFound;
    res.json({name, surname, phone, email});
  } else {
    res.status('401').send({'error': 'The email or password is incorrect'});
  }
});

app.post('/newUser', function (req, res) {

  const name = req.body.name;
  const surname = req.body.surname;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;

  console.log('new user sended: ', name, surname, phone, email, password);

  let userFound = false;

  listOfUsers.forEach((user) => {
    if (user.email === email)
      userFound = true;
  });

  if (!userFound) {
    listOfUsers.push({email, password, name, surname, phone});
    res.json('User added!')
    console.log('RESULT : user added!')
  } else {
    res.status('401').send({'error': 'The email used already exists'});
    console.log('RESULT: user refused. The email address already exists');
  }
});

app.get('/users', function (req, res) {
  res.json(listOfUsers)
});

app.post('/users', function (req, res) {
  listOfUsers = req.body
  res.json('Users Updated!')
});


app.listen(3000, function () {
  console.log('Users App is listening on port 3000!');
});
