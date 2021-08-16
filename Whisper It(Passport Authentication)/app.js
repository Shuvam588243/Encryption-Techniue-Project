require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./models/User');
const session = require('express-session');
const passport = require('passport');





app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('./public'));


app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
).then(()=>
{
    console.log('Database Connected');
});

app.get('/',(req,res)=>
{
    res.render('home');
});

app.get('/login',(req,res)=>
{
    res.render('login');
});


app.get('/register',(req,res)=>
{
    res.render('register');
});

app.get('/secrets',(req,res)=>
{
    if (req.isAuthenticated()){
        res.render("submit");
      } else {
        res.redirect("/login");
      }
});

app.post('/register',(req,res)=>
{
    console.log(req.body);

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
          console.log(err);
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function(){
            res.redirect("/secrets");
          });
        }
      });
    
});


app.post('/login', (req,res)=>
{
    
})



app.listen(port,()=>
{
    console.log(`Listening to Port ${port}`);
})
