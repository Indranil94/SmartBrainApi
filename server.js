const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
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
		/*host: '127.0.0.1',
		user: 'postgres',
		password: 'Manu#9717',
		database: 'SmartBrain'*/
		connectionString: process.env.DATABASE_URL,
  		ssl: true,
	}
	
});



app.get('/',(req,res)=>{
	res.json("At home page");
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


app.listen(process.env.PORT || 3000,()=>console.log(`Process running on ${process.env.PORT}`));