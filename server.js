import { PrismaClient } from "@prisma/client";
import  express  from "express";
import path from "path";
import parser from "body-parser";
import postgres from "postgres";
import session from "express-session";
import { UserRepository } from "./src/repositories/UserRepository.js";
import { User } from "./src/entity/user.js";
import { AdRepository } from "./src/repositories/AdRepository.js";
import { Ad } from "./src/entity/ad.js"

const server = express();

var urlencodedParser = parser.urlencoded({ extended: false })
const prisma = new PrismaClient()
const sql = postgres('postgres://postgres:root@localhost:5432/vendason');

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
  if (err) res.locals.message = '<p class="msg_error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

server.set('view engine', 'pug');
server.set('views', './views');
server.use(express.static('public'));

server.get("/", async function(req,res) { 
    return res.render('index', {youAreUsingPug: true});
})

server.get("/login", function(req,res) { 
    return res.render('login', {youAreUsingPug: true});
})

server.post("/auth", urlencodedParser, async function(req,res) {
    let email = req.body.email;
    let password = req.body.password;

    const userRepository = new UserRepository(prisma)
    const resultado = await userRepository.findByEmail(email)

    if (resultado && password == resultado.password) {
            req.session.regenerate(function(){
            req.session.user = resultado;
            res.redirect('/dashboard'); 
        });
    } else {
        res.locals.message = 'Email ou Senha incorretos, tente novamente!'
        return res.render('login', {youAreUsingPug: true});
    }
})

server.get("/register", function(req,res) { 
    return res.render('register', {youAreUsingPug: true});
})

server.post("/register", urlencodedParser, async function(req,res) {
    let name = req.body.name;
	let password = req.body.password;
    let email = req.body.email;
    
    const userRepository = new UserRepository(prisma)
    const user = await userRepository.save(new User(null,name,email,password,""))

    if(name && password && email) {
        if (user) {
            res.redirect('/login')
        }
        else {
            res.locals.message = 'Já existe alguém com esse email, tente novamente!'
            return res.render('register', {youAreUsingPug: true});
        }
    }
})

server.get("/dashboard", restrict, async function(req,res) { 

    const adRepository = new AdRepository(prisma)
    const ads = await adRepository.findAll()
    return res.render('dashboard', { youAreUsingPug: true, ads });
   
}) 

server.get("/product/:id", async function(req,res) { 
    const productId = parseInt(req.params.id, 10)
    console.log(productId)
    const adRepository = new AdRepository(prisma)
    const ad = await adRepository.findById(productId)
    console.log(ad)
    return res.render('product', {youAreUsingPug: true, product: ad});
})


server.get("/cart", function(req,res) { 
    if (!req.session.user) {
        res.redirect('/login')
    }
    return res.render('cart', {youAreUsingPug: true});
})

server.get("/newad", function(req,res) { 
    if (!req.session.user) {
        res.redirect('/login')
    }
    return res.render('newad', {youAreUsingPug: true});
})

server.post("/newad", urlencodedParser, async function(req,res) {
    if (!req.session.user) {
        res.redirect('/login')
    }

    let product = req.body.product
    let price = req.body.price
    let description = req.body.description
    let image = req.body.image
    let userId = req.session.user.id
   
    console.log(req.session.user)
    console.log(product,price,image,description)

    const adRepository = new AdRepository(prisma)
    const ad = await adRepository.save(new Ad(null,product,price,description,image,userId))
    
    if(product && price && description && image) {
        if (ad) {
            return res.render('product', {youAreUsingPug: true, product: ad});
        } else {
            res.locals.message = "Anúncio ja existente, tente novamente!"
            return res.render('newad', {youAreUsingPug: true});
        }
    }
})

server.get("/myads", async function(req,res) { 
    if (!req.session.user) {
        res.redirect('/login')
    }

    const userId = req.session.user.id;
    const adRepository = new AdRepository(prisma);
    const userAds = await adRepository.findByUserId(userId);
    
    return res.render('myads', { youAreUsingPug: true, ads: userAds });
})

server.get("/myprofile", async function(req,res) { 
    if (!req.session.user) {
        res.redirect('/login')
    }
    // const email = req.session.user.email
    // const userRepository = new UserRepository(prisma)
    // const user = await userRepository.findByEmail(email)

    //console.log(name,password,email)

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