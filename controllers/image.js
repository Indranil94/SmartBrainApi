const handleImage =(postgres, bcrypt, req, res)=> {
	const { id } = req.body;
	postgres('users')
	.where('id','=',id)
	.increment('hits',1)
	.returning('*')
	.then(result=>{
		console.log(result);
		res.json(result[0]);
	})
	.catch(err=>{
		console.log('Not able to update');
		res.status(400).json('Not able to update');
	})

};

module.exports= {
	handleImage: handleImage
};