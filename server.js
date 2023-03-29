const express = require('express');
const server = express();

//foi achado esse erro pelo linter
const path = require('path');
const parser = require('body-parser')

// create application/x-www-form-urlencoded parser
var urlencodedParser = parser.urlencoded({ extended: false })
const postgres = require('postgres');

const sql = postgres('postgres://postgres:root@localhost:5432/vendason');
var session = require('express-session');
server.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));
server.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

server.set('view engine', 'pug');
server.set('views', './views');
server.use(express.static('public'));

server.get("/", function(req,res) { 
    return res.render('login', {youAreUsingPug: true});
})

server.get("/login", function(req,res) { 
    return res.render('login', {youAreUsingPug: true});
})

server.post("/auth", urlencodedParser, async function(req,res) {
    let email = req.body.email;
    let password = req.body.password;

    if(password && email) {
        const users =  await sql`select * from users u where u.email = ${email} and u.password = ${password}`
        if (users.length == 1) {
            const user = users[0]
            // Regenerate session when signing in
            // to prevent fixation
            req.session.regenerate(function(){
              // Store the user's primary key
              // in the session store to be retrieved,
              // or in this case the entire user object
              req.session.user = user;
              res.redirect('/dashboard');
            });
          } else {
            res.locals.message = 'Email ou Senha incorretos, tente novamente!'
            return res.render('login', {youAreUsingPug: true});
          }
    }
})

server.get("/register", function(req,res) { 
    return res.render('register', {youAreUsingPug: true});
})

server.post("/register", urlencodedParser, async function(req,res) {
    let username = req.body.username;
	let password = req.body.password;
    let email = req.body.email;

    if(username && password && email) {
        const user =  await sql`insert into users(name, email, password) values(${username}, ${email}, ${password})returning name`
        if (user.length)
            res.redirect('/login')
        else
            res.redirect('/register')
    }
})

server.get("/dashboard", restrict,function(req,res) { 
    return res.render('dashboard', {youAreUsingPug: true});
})

server.get("/product", function(req,res) { 
    return res.render('product', {youAreUsingPug: true});
})

server.get("/cart", function(req,res) { 
    return res.render('cart', {youAreUsingPug: true});
})

server.get("/newad", function(req,res) { 
    return res.render('newad', {youAreUsingPug: true});
})

server.get("/myads", function(req,res) { 
    return res.render('myads', {youAreUsingPug: true});
})

server.get("/myprofile", function(req,res) { 
    return res.render('myprofile', {youAreUsingPug: true});
})

server.get("/buyfinish", function(req,res) { 
    return res.render('buyfinish', {youAreUsingPug: true});
})


server.get("/logout", function(req,res) {
    req.session.destroy(function(){
        res.redirect('/');
    });
})


server.listen(5000, function() {
    console.log("tá rodando");
})

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.locals.message = 'Access denied!';
    res.redirect('/login');
  }
}