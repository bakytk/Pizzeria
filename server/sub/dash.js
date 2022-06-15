

module.exports = function (app, MongoClient, jsonParser) {
	


// ----------------------------------- DASH-DATA -----------------------------------------
// ===================================================================================


app.get('/dash',  (req, res) =>  { //urlParser,
	
	let shop = req.decode.shop; 
	let category = req.decode.category; 
	
	//console.log('dash originalUrl ', req.originalUrl);
	
	MongoClient.connect ("mongodb://localhost:27017/", 
						{ useNewUrlParser: true, useUnifiedTopology: true  }, 
						function (err1, client){ 
	   
	    if (err1) {console.error('err1 \n', err1);}
      
  		const db = client.db('mydb');
	   
    	db.collection('leads').find() // put filter if needed, eg by Timestamp
		.toArray( function (err2, p) { 
			
			if (err2) {console.error('err2 \n', err2);}
			
			else { 
				
				  if (p.length < 1 || p == undefined) {
					res.json({ 
                		success: false, 
                		message: 'У вас еще нет заказов'
            		})
				  }
				
				  else { 
					  
					//console.error('p.length ', p.length);
					//console.error('p[0] \n', p[0]);
					  
					res.json({ 
                    	success: true, 
                    	payload: p
                	}) }
			}
			
		});
	});
					 
	
});

}
