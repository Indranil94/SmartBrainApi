const handleSignin = (postgres, bcrypt, req, res) => {
	const { email,password } = req.body;
	if(email && password){
		postgres
		.select()
		.from('users')
		.where('email','like',email)
		.then(result=>{
			if(result.length){
				postgres
				.select('password')
				.from('login')
				.where('email','like',email)
				.then(result_log=>{
					//console.log(result_log);
					if(result_log.length){
						bcrypt.compare(password,result_log[0].password,(err,check)=>{
							if(check === true){
								res.json(result[0]);
							}
							else{
								res.status(400).json('Bad Login');
							}
						})
					}
					else{
						res.status(400).json('Bad Login');
					}
				})
				.catch(err=>{
					res.status(400).json('Bad Login');
				})
			}
		})
		.catch(err=>{
					res.status(400).json('Bad Login');
		})
	}
	else{
		res.status(400).json('Login/Password field blank');
	}
	

};

module.exports= {
	handleSignin: handleSignin
};