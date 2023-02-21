const express = require('express');
const server = express();
const path = require('path');

server.set('view engine', 'pug');
server.set('views', './views')
server.use(express.static('public'))

server.get("/", function(req,res) { 
    return res.render('login', {youAreUsingPug: true});
})

server.get("/login", function(req,res) { 
    return res.render('login', {youAreUsingPug: true});
})

server.get("/register", function(req,res) { 
    return res.render('register', {youAreUsingPug: true});
})

server.get("/dashboard", function(req,res) { 
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

server.get("/myprofile", function(req,res) { 
    return res.render('myprofile', {youAreUsingPug: true});
})


server.get("/logout", function(req,res) { 
    return res.render('login', {youAreUsingPug: true});
})


server.listen(5000, function() {
    console.log("tá rodando");
})