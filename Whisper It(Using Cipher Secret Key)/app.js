require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./models/User');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('./public'));

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

app.post('/register',(req,res)=>
{
    const newUser = new User({
        email : req.body.username,
        password : req.body.password
    });

    newUser.save((err)=>
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log('User Added');
            res.render('secrets');
        }
    })
});


app.post('/login', (req,res)=>
{
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({email:username},(err,userFound)=>
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            if(userFound)
            {
                if(userFound.password === password)
                {
                    res.render('secrets');
                }
                else
                {
                    res.json({
                        err : 'Invalid Password !!! '
                    })
                }
            }
        }
    });

})



app.listen(port,()=>
{
    console.log(`Listening to Port ${port}`);
})
