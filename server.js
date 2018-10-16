const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const api = require('./controllers/api');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const getId = require('./controllers/getId');
const image =  require('./controllers/image')

app.use(cors());

app.use(bodyParser.json());
const postgres = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'Manu#9717',
		database: 'SmartBrain'
	}
});



app.get('/',(req,res)=>{
	console.log('working');
})

app.post('/api',(req,res)=>{api.handleApi(req,res)});

//signin
app.post('/signin',(req,res)=>{signin.handleSignin(postgres, bcrypt, req, res)});

//register
app.post('/register',(req,res)=>{register.handleRegister(postgres,bcrypt, req,res)});

//get profile

app.get('/profile/:id',(req,res)=>{getId.handleGetId(postgres,req,res)});
//api call
/*app.get('/api',(req,res)=>{


})*/


app.put('/image',(req,res)=>{image.handleImage(postgres, bcrypt, req, res)});


app.listen(process.env.PORT || 3000);