
module.exports = function (app, client, MongoClient, jsonParser) {

app.post('/cart/add', jsonParser, function(req,res) {
	
   let sessionID = req.sessionID;
   console.log(sessionID, 'addItem');
	
   //check if 'websessions' exists, if not create
   client.scard ('cartsessions', function (err1, num) {
								
  		if (err1) { console.error('err1 \n'+ err1);}
  		if ( num == 0 ) {
			client.sadd ('cartsessions', '1')
  		}
   });
	
   //check if sessionID added, if not append
   client.sismember ('cartsessions', sessionID, function (err2, res) {
								
  		if (err2) { console.error('err2 \n'+ err2);}
  		if ( res == 0 ) {
			client.sadd ('cartsessions', sessionID)
  		}
   });
	  
   let ts = Date.now();
	
   client.hset (sessionID, ts, 'addItem', function (err3, r) {
   		
	    if (err3) { console.error('err3 \n'+ err3);}
	    if (r==1) { 
			
			let title = req.body.title;
			let cat = req.body.cat;
			let price = req.body.price;
			let productid = req.body.productid; 
            let qty = req.body.qty; 
			
			let cart = sessionID + '_cart';
			let key = cart + ':' + productid;
			
			//check if productid in cart
			client.sismember (cart, productid, async function (err4, exist) {
				
				if (err4) { console.error('err4 \n'+ err4);}
				//console.log('exist ' + exist);
				
				if (exist==1) {
					
					let q_old = await client.hgetAsync (key, 'qty');
					let q_new = Number (qty) + Number (q_old);
					
					await client.hsetAsync (key, 'qty', q_new);
					return res.json({ success: true, message: 'Увеличено количество в корзине!' });
				
				} else { 
					
					client.sadd (cart, productid, function (err5, r) {
						
						if (err5) { console.error('err5 \n'+ err5);}
						//console.log('r ' + r);
				
						if (r==1) {
					
						  client.hmset (key, 'title', title, 'cat', cat, 'price', price,
								  'productid', productid, 'qty', qty, 
								  function (err6, p) {

							if (err6) { console.error('err6 \n'+ err6);}
							//console.log('p ' + p);

							if (p=='OK') { 
								return res.json({ success: true, message: 'Добавлено в корзину!' });
							}

							else { 
								return res.json({ success: false, 
												 message: 'Ошибка сервера. \nТовар не добавлен!' });
							}
							}); //hmset
						}//if
						
					}); //sadd
				}//else
			
			}) //ismember
		}//if
	    
	    else { 
			return res.json({ success: false, message: 'Ошибка сервера. \nТовар не добавлен!' });
		}
   });
	
   
});

/*
async function cartRelease (sessionID) {
	
	let cart = sessionID + '_cart';
	let response = [];
			
	let productids = await client.smembersAsync (cart);
	
	productids.forEach( ( productid, idx )=>{
					
			let key = cart + ':' + productid
					
			client.hmget (key, 'title', 'cat', 'price', 'qty', 'productid',
								  function (err3, values) {
					
						let jsn = {};
						if (err3) { console.error('err3 \n'+ err3);}
						//console.log('values \n' + values);

						jsn['title'] = values[0];
						jsn['cat'] = values[1];
						jsn['price'] = values[2];
						jsn['qty'] = values[3];
						jsn['productid'] = values[4];

						response.push( jsn );

						if ( idx == productids.length-1 ) {
							return response;
						}

					}); //hmget
		}); //forEach

}
*/


app.post('/cart/get', function(req,res) {
	
   let sessionID = req.sessionID;
   //console.log(sessionID, 'getCart'); 
	
   let ts = Date.now();
	
   client.hset (sessionID, ts, 'getCart', async function (err1, r) {
   		
	    if (err1) { console.error('err1 \n'+ err1);}
	    //console.log('r ' + r);
	   
	    if (r==1) { 
			
			let cart = sessionID + '_cart';
			let response = [];

			client.smembers (cart, function (err2, productids) {

				if (err2) { console.error('err2 \n' + err2);}	
				//console.log('productids \n' + productids);

				productids.forEach( ( productid, idx )=>{

						let key = cart + ':' + productid

						client.hmget (key, 'title', 'cat', 'price', 'qty', 'productid',
										function (err3, values) {

						let jsn = {};
						if (err3) { console.error('err3 \n'+ err3);}
							//console.log('values \n' + values);

						jsn['title'] = values[0];
						jsn['cat'] = values[1];
						jsn['price'] = values[2];
						jsn['qty'] = values[3];
						jsn['productid'] = values[4];

						response.push( jsn );

						if ( idx == productids.length-1 ) {
							
							//console.log('response \n' + response);

							res.header("Access-Control-Allow-Origin", "*");
							res.setHeader('Content-Type', 'application/json');
							res.json(response);
						}

					}); //hmget
				}); //forEach

			}); // smembers
		}
	}); // hset

});


app.post('/cart/incr', jsonParser, function(req,res) {
	
   let sessionID = req.sessionID;
   //console.log(sessionID, 'incrCart');
	
   //console.log(req.body);
	
   let ts = Date.now();
	
   client.hset (sessionID, ts, 'incrCart', function (err, r) {
   		
	    if (err) { console.error('err \n'+ err);}
	    //console.log('r ' + r);
	   
	    if (r==1) { 
	
		   let productid = req.body.productid;
		   let dir = req.body.dir;
			
		   let cart = sessionID + '_cart';
		   let key = cart + ':' + productid;
			
		   //console.log( 'productid', productid);
		   //console.log( 'key', key);
			
		   client.hget (key, 'qty', function(err1, q) {
			   
			   let newqty = Number (q);
			   
			   if (dir === 'plus')  { newqty = newqty + 1; } 
			   else if (dir === 'minus')  { 
					
			   	 if (newqty == 0 || newqty < 0) { //pass			 
				 } else { newqty = newqty - 1; } 			 
			   } 
			   //console.log( 'newqty 1 ', newqty);
			   
			   client.hset (key, 'qty', newqty , function(err1, s) {

				   if (err1) { console.error('err1 \n'+ err1);}
				   //console.log('s ' + s);
				   //console.log( 'newqty 2 ', newqty);

				   let response = [];

				   client.smembers (cart, function (err2, productids) {

							if (err2) { console.error('err2 \n' + err2);}	
							//console.log('productids \n' + productids);

							productids.forEach( ( productid, idx )=>{

									let key = cart + ':' + productid

									client.hmget (key, 'title', 'cat', 'price', 'qty', 'productid',
													function (err3, values) {

									let jsn = {};
									if (err3) { console.error('err3 \n'+ err3);}
										//console.log('values \n' + values);

									jsn['title'] = values[0];
									jsn['cat'] = values[1];
									jsn['price'] = values[2];
									jsn['qty'] = values[3];
									jsn['productid'] = values[4];

									response.push( jsn );

									if ( idx == productids.length-1 ) {

										//console.log('response \n' + response);

										res.header("Access-Control-Allow-Origin", "*");
										res.setHeader('Content-Type', 'application/json');
										res.json(response);
									}

								}); //hmget
							}); //forEach

						}); // smembers

			   	}); //hset
		}); //hget
		} //if
   });//hset
});

app.post('/cart/del', jsonParser, function(req,res) {
	
   let sessionID = req.sessionID;
   //console.log(sessionID, 'delItem');
	
   //console.log(req.body);
	
   let ts = Date.now();
	
   client.hset (sessionID, ts, 'delItem', function (err, r) {
   		
	    if (err) { console.error('err \n'+ err);}
	    //console.log('r ' + r);
	   
	    if (r==1) { 
	
		   let productid = req.body.productid;
		   //console.log('productid ', productid);
			
		   let cart = sessionID + '_cart';
		   let key = cart + ':' + productid;
			
		   client.srem (cart, productid, function(err1, r) {
			   
			   if (err1) { console.error('err1 \n'+ err1);}
			   if (r == 1)  { 
				   
				   client.del (key, function(err2, d) {
					   
					   if (err2) { console.error('err2 \n'+ err2);}
					   if (d == 1)  { 
					   
						   let response = [];

						   client.smembers (cart, function (err2, productids) {

									if (err2) { console.error('err2 \n' + err2);}	
									//console.log('productids \n' + productids);

									productids.forEach( ( productid, idx )=>{

											let key = cart + ':' + productid

											client.hmget (key, 'title', 'cat', 'price', 'qty', 'productid',
															function (err3, values) {

												let jsn = {};
												if (err3) { console.error('err3 \n'+ err3);}
													//console.log('values \n' + values);

												jsn['title'] = values[0];
												jsn['cat'] = values[1];
												jsn['price'] = values[2];
												jsn['qty'] = values[3];
												jsn['productid'] = values[4];

												response.push( jsn );

												if ( idx == productids.length-1 ) {

													//console.log('response \n' + response);

													res.header("Access-Control-Allow-Origin", "*");
													res.setHeader('Content-Type', 'application/json');
													res.json(response);
												}

											}); //hmget
									}); //forEach

							}); // smembers
					   } //if
						   
					}); //del
				} //if
			   
			}); // srem
		} //if
	   
	}); // hset
	
});


app.post('/cart/empty', function(req,res) {
	
   let sessionID = req.sessionID;
   //console.log(sessionID, 'emptyCart');
	
   let ts = Date.now();
	
   client.hset (sessionID, ts, 'emptyCart', function (err, r) {
   		
	    if (err) { console.error('err \n'+ err);}
	    //console.log('r ' + r);
	   
	    if (r==1) { 
			
		   let cart = sessionID + '_cart';
			
		   client.smembers (cart, function (err2, productids) {

				if (err2) { console.error('err2 \n' + err2);}	
				//console.log('productids \n' + productids);

				productids.forEach( ( productid, idx )=>{
					
					let key = cart + ':' + productid
			
		   			client.del (key, function(err3, d) {
						
						if (err3) { console.error('err3 \n' + err3);}	
						//console.log('d \n' + d);
			   
						if ( idx == productids.length-1 ) {
							
							client.del (cart, function(err4, c) {
								
								if (err4) { console.error('err4 \n' + err4);}	
								//console.log('c \n' + c);
								
								if (c) {

									res.header("Access-Control-Allow-Origin", "*");
									res.setHeader('Content-Type', 'application/json');

									let blank =[];
									return res.json(blank);
								}
							}); // del set
						}
					 }); // del hashes
					
				}); // forEach
			   }); // smembers
			} //if
		}); // hset
});


app.post('/cart/checkout', function(req,res) {
	
   let sessionID = req.sessionID;
   //console.log(sessionID, 'checkout'); 
	
   let ts = Date.now();
	
   client.hset (sessionID, ts, 'checkout', async function (err1, r) {
   		
	    if (err1) { console.error('err1 \n'+ err1);}
	    //console.log('r ' + r);
	   
   }); 
});


app.post('/order', jsonParser, function(req,res) {
	
   let sessionID = req.sessionID;
   //console.log(sessionID, 'orderPlaced');
	
   let ts = Date.now();
	
   //try-catch
	
   client.hset (sessionID, ts, 'order', function (err, r) {
   		
	    if (err) { console.error('err \n'+ err);}
	    if (r==1) { 
			
			//console.log(req.body);
			
			let platform = req.body.platform;
			let name = req.body.name;
			let phone = req.body.phone; 
            let address = req.body.address;
			let payment = req.body.payment;
			
			let userkey = sessionID + '_user';
			//write usr data to mongo-db

			client.hmset (userkey, 'platform', platform, 'name', name, 'phone', phone,
					'address', address, 'payment', payment, function (err1, p) {

				if (err1) { console.error('err1 \n'+ err1);}
				//console.log('p ' + p);

				if (p=='OK') { 

					res.json({ success: true, 
						message: 'Заказ принят. Ожидайте звонка оператора' });

										
					try {		
						
						// ======================================================
											
						// 1 - write order from redis to mongo
											
						MongoClient.connect("mongodb://localhost:27017/", 
							{ useNewUrlParser: true, useUnifiedTopology: true  }, 

							function(err, mongoclient){

								if (err) {	console.error(err);}

									const db = mongoclient.db("mydb");
									const collection = db.collection("leads");

									//retrieve cart and write to mongo-db

									let user = {
										platform: platform,
										name: name,
										phone: phone,
										address: address,
										payment: payment,
									};
							
									let cart = sessionID + '_cart';
									let cartList = [];
							
									client.smembers (cart, function (e1, pids) {

										if (e1) { console.error('e1 \n'+ e1);}
										//console.log('pids \n' + pids);
										
										pids.forEach( ( pid, idx )=>{
					
											let item = cart + ':' + pid
			
											client.hmget (item, 'title', 'cat', 
														  'price', 'qty', 'productid',
													     function (err3, values) {

												let jsn = {};
												if (err3) { console.error('err3 \n'+ err3);}
												//console.log('values \n' + values);

												jsn['title'] = values[0];
												jsn['cat'] = values[1];
												jsn['price'] = values[2];
												jsn['qty'] = values[3];
												jsn['productid'] = values[4];
												
												cartList.push(jsn);
												
												if ( idx == pids.length-1 ) {

													let ts = Date.now();
							
													let session = {
														sessionId: sessionID,
														user: user,
														timestamp: ts,
														cart: cartList,
													};

													collection.insertOne(session, function(err, result){

													  if(err) { return console.log(err);} 
													  //console.log('result.ops \n', result.ops);

													  // ==================================
													  // 2 - clear session_cart

													  let cart = sessionID + '_cart';

													  client.smembers (cart, 
																	   function (err2, productids) {

														if (err2) { console.error('err2 \n' + err2);}	
														//console.log('productids \n' + productids);

														productids.forEach( ( productid, idx )=>{

														  let itemkey = cart + ':' + productid

														  client.del (itemkey, 
																	  function(err3, d) {

															if (err3) { console.error('err3 \n' + err3);}	
															//console.log('d \n' + d);

															if ( idx == productids.length-1 ) {

															  client.del (cart, function(err4, c) {

																if (err4) { console.error('err4 \n' + err4);}
																//console.log('c \n' + c);
																//console.log('session-cart cleared');

															  }); // del cart-set

															} //if
														}); // del itemkey

													  }); // forEach
													  }); // smembers

													// ============= redis session-cart cleared 
													}); //collection
												} //if
												
											}); //hmget
										  }); //pids
										}); //smemembers
						
							}); //mongoconn
							
												
						// =============================
						} catch (error) {console.error(error); }

					} //if

					else { 
						return res.json({ success: false, 
						message: 'Ошибка сервера. Повторите попытку позднее'});
				}
			}); //hmset
		} //if
	}); //hset
});

}