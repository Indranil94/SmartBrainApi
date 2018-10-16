const handleGetId=(postgres, req, res)=>{
	const { id } = req.params;
	let found = 0;
	postgres.select().from('users').where('id',id)
	.then(result=>{
		console.log(result);
		if(result.length){
			res.json(result[0]);
		}
		else{
			res.json("No data found")
		}
	})
	.catch(err=>{
		console.log("unable to fetch data");
	})
};

module.exports={
	handleGetId: handleGetId
};