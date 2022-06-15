
module.exports = function (app, client, jsonParser) {


// ----------------------------------- HOME-PAGE -------------------------------------
// ===================================================================================
	
app.use('/', (req, res, next) => {
	
  //console.log(req.sessionID);
  //if (req.body)  { console.log (req.body);}
  //res.cookie('bothub', 'persistent5', { maxAge: 1000 * 60 * 30 }); //persistent cookie, if not set
	
  next();
});

app.get("/",function(req,res){ 
	
   // doesn't initiate when page is retrieved with '/'
	
   let sessionID = req.sessionID;
	
   //check if 'websessions' exists, if not create
   client.scard ('cartsessions', function (err, num) {
								
  		if (err) { console.error('err \n'+ err);}
  		if ( num == 0 ) {
			client.sadd ('cartsessions', '1')
  		}
   });
	
   //check if sessionID added, if not append
   client.sismember ('cartsessions', sessionID, function (err, res) {
								
  		if (err) { console.error('err \n'+ err);}
  		if ( res == 0 ) {
			client.sadd ('cartsessions', sessionID)
  		}
   });
	  
   let ts = Date.now();	  
   client.hset (sessionID, ts, 'getPage', function (err, r) {
   		
	    if (err) { console.error('err \n'+ err);} //console.log(r);
   		res.sendFile("index.html"); //res.sendFile(r);
   });
});


// ------------------- ОТПУСК-АССОРТИМЕНТА --------------------------------------------------------
// ==========================================================================================

app.get('/sample', jsonParser, (req, res) =>  { 
	
	const shop = process.env.SHOP; 
	//console.log('shop ' + shop);
	let Result = [];
	
	//try-catch add
	
	client.smembers (shop, function (err1, categories) {
	
		if (err1) { console.error('err1 \n'+ err1);}
		//console.log('categories ' + categories);
		
		let catList = []
		let itemList =[]
		
		// first, get small-icon img for catlist components as 1st elem in Result
		categories.forEach ((cat, catIdx) =>  {
			
			let jsnCats = {}
			
			// writing jsnCats to catButtons
			let hashKey = shop + '_' + cat+ '_catBtn'; // eg sample_pizza_Пиццы_catBtn
			//console.log('hashKey ' + hashKey);
			
			client.hmget (hashKey, 'id', 'cat',  function (err2, vals) {

				if (err2) { console.error('err2 \n'+ err2);}	
				jsnCats['cat'] = vals[1];
				jsnCats['id'] = vals[0];
				catList.push(jsnCats);
				
				// WRITE items to itemList

				let set2Key = shop + '_' + cat; // eg samplepizza_Пиццы
					
				//check if items exist, in this category
				client.scard (set2Key, function (err3, num) {
								
					if (err3) { console.error('err3 \n'+ err3);}
		
					if ( Number (num) > 0 ) {
					
						//if items exist, fetch and append
						client.smembers (set2Key, function (err4, items) {
						
							if (err4) { console.error('err4 \n'+ err4);}
							//console.log ('items \n'+ items); //ok
							
							items.forEach ((item, itemIndx) =>  { 
						
								//console.log ( 'itemIndx \n' + itemIndx);
								
								let hash2Key = set2Key + '_' + item; // eg samplepizza_Пиццы_Маргарита
								//console.log ('hash2Key \n'+ hash2Key);  //ok
								
								client.hmget (hash2Key, 'title', 'des', 'price', 
											  'img', 'cat', 'productid', function (err5, fields) {
											
											if (err5) { console.error ('err5 \n'+ err5);}
									
											//let i = {};		
											let i = { 'title' : fields[0],	'des': fields[1], 
													 'price' : fields[2], 'img': fields[3], 
													 'cat' : fields[4],	'productid' : fields[5],
													};
											//console.log(i,'\n',Object.keys(i),'\n',Object.values(i),'\n');
									
											let j = {};
											let k = {};
									
											j [item] = i;
											k [cat] = j;
											itemList.push(k);
											//console.log('itemList.length ', itemList.length);
									
											if (itemIndx == items.length-1 && catIdx == categories.length-1){
												
													Result.push(catList);
													Result.push(itemList);		
													//console.log(Result[0].length, Result[1].length);
												
													res.header("Access-Control-Allow-Origin", "*");
													res.setHeader('Content-Type', 'application/json');
													res.json(Result);
											}//if
											
								}); //hmget-fields
							}); //items
							
						}); //smembers
					 } // if
				  }) //scard--existence check
				}) //hmget

			}) //categories
		}) //smem
}); //endpt


}