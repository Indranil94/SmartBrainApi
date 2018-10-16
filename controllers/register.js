const handleRegister = (postgres, bcrypt, req, res)=>{
	const { name,email,password } = req.body; 
	if(name && email && password){
		postgres
		.returning("*")
		.insert({name: name, email: email}).into('users').then(data=>{

			//console.log(data);

			bcrypt.hash(password, 10, (err, hash)=> {

				if(err){
			  		res.status(400).json("Incorrect data");
			  	}

		  		postgres('login').insert({email: email, password: hash}).then(data=>{

					res.json("Successfully registered");	

		  		});	
			});
		})
		.catch(err=>{
			res.status(400).json("Incorrect data ");
		})
	}else{
		res.status(400).json("Field blank ");
	}
}

module.exports= {
	handleRegister: handleRegister
};