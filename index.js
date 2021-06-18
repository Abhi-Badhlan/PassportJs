const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const passport=require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup')

const PORT= 3002;
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));



app.use(express.json());

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))
   
const isLoggedIn=(req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.sendStatus(401);
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
    res.send('you are not logged in')
})

app.get('/failed',()=>{
    res.send('You failed to login')
})

app.get('/good',isLoggedIn,(req,res)=>{
    console.log(req.user.displayName);
    res.send(`welcome Mr. ${req.user.displayName}`)
})

app.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });

  app.get('/logout',(req,res)=>{
      req.session=null;
      req.logout;
      res.redirect('/')
  })
app.listen(PORT,()=>{console.log(`Listening at port:  ${PORT}`)})