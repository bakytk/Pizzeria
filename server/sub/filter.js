

module.exports = function (app, jsonParser, jwt) {
	
	
	
// ----------------------------- JWT-Filter --------------------------------
// =========================================================================
	
	
app.use(function(req, res, next){
	
	let endpoint = req.originalUrl;
	
	if (endpoint == '/dash' || endpoint == '/edit' ) { //
    	
		var token = req.headers['authorization']; 
		
		if (token) { 
			
        	jwt.verify(token, process.env.JKEY, function (err, decode){  
			//decode token
				
            if (err) {
                return res.json({
                    success: false,
                    message: 'Пользователь не авторизован. Обновите вход'
                })
            
			} else {

				//var keys = Object.keys(decode)
				//console.log('keys /n' + keys)
				
                req.decode = decode;
				
                //if(decode.exp <= Date.now()/1000){ //1000
    			//	return res.status(400).send({
            	//		status:false,
            	//		message: 'Токен истек'
            	//});
				
				next();
    		}
       		 })
    	}
		else {
        	return res.status(403).send({
            	status:false,
            	message: 'Токен не найден !'
        	});
    	}
    }
	
	else {
	
		//console.log('filter ', endpoint); 
		next();
	}
	
});
	
}


