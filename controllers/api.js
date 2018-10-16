const clarifai = require('clarifai');
const clar_app = new Clarifai.App({
 apiKey: 'ccea46d761714b07a6218e0e8c6b65d8'
});

const handleApi = (req,res) => {
	const { imageUrl } = req.body;
	console.log(clar_app);
	clar_app.models.predict("a403429f2ddf4b49b307e318f00e528b",imageUrl)
      .then(response=> {
			const data = response.outputs[0].data.regions[0].region_info.bounding_box;
			res.json(data);
		})
      .catch(err=>{
      	console.log(err);
      })
}

module.exports={
	handleApi: handleApi
};