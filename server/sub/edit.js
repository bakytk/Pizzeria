

module.exports = function (app, client, jsonParser, multer, fs, formData, axios) {

	const upload = multer({ dest: '/uploads' })
	
	function isNumeric(value) {
    	return /^-{0,1}\d+$/.test(value);
	};
	
	function hashGenerator (length=10) { 
    	return Math.random().toString(20).substring(2, length)
    }
	
	function uploadImgUrl (file) {

		// convert binary data to base64 encoded string
		const bitmap = fs.readFileSync(file, { encoding: 'base64' });  
		
		let bodyData = new formData();
		bodyData.append('image', bitmap);
		
		return new Promise( (resolve, reject) => {
			
			axios ({
			  method  : 'post',
			  url     : 'https://api.imgbb.com/1/upload?key=' + process.env.IMGB,
			  headers : bodyData.getHeaders(),
			  data    : bodyData
			})
			.then(function (response) {
				
				//console.log(response);
				let imgUrl = response.data.data.display_url;
				//console.log(imgUrl);
    			resolve(imgUrl);
  			})
  			.catch(function (error) {
    			console.error(error);
				resolve(error);
  			});
		});
	};

	try {

		app.post('/edit', jsonParser, upload.single('img'), function(req,res) {

		   //console.log('edit originalUrl ', req.originalUrl);
		   //console.log('req.body ', req.body);

		   let sessionID = req.sessionID;
		   //console.log('edit sessionID ', sessionID);

		   //check if 'admsessions' exists, if not create
		   client.scard ('admsessions', function (err1, num) {

				if (err1) { console.error('err1 \n'+ err1); }
				if ( num == 0 ) {
					client.sadd ('admsessions', '1');
					console.log ('1 added');

					//check if sessionID added, if not append
					client.sismember ('admsessions', sessionID, function (err2, res) {

						if (err2) { console.error('err2 \n'+ err2);}
						if ( res == 0 ) {
							client.sadd ('admsessions', sessionID)
							}
					});
				}
			});

			let ts = Date.now();
			let object = req.body.object;
			let action = req.body.action;
			let update = JSON.parse(req.body.update);
			//console.log('parameters \n', object, action, update);
			
			client.hset (sessionID, ts, action + '_' + object, function (err2, r) {

				if (err2) { console.error('err2 \n'+ err2);}
				if (r==1) { 

					//console.log('r ', r);
					
					// ============================= ADD - CATEGRY ==========================

					if ( action === 'add' && object === 'category') {

						//add cat name to set - shop
						client.sadd (process.env.SHOP, //eg samplepizza
									 update.name, function (err3, p) {

							console.log('p ', p);
							if (err3) { console.error('err3 \n'+ err3);}
							if (p=='1') { 
								
								//add cat rank
								const key = process.env.SHOP + '_' + update.name + '_catBtn';
								const rank = isNumeric (update.rank) ? Number (update.rank) : 100;
								
								client.hmset (key, //eg samplepizza_Пиццы_catBtn
									 'cat', update.name, 'id', rank, function (err4, m) {

									//console.log('m', m);
									if (err4) { console.error('err4 \n'+ err4);}
									if (m=='OK') { 

										return res.json({ success: true, 
											 message: 'Ассортимент успешно обновлен !' });
							
									}//if
								})//hset
							}//if

						}); //hsadd
					} //if action-object
					
					// ============================= CHG- CATEGRY ==========================
					
					if ( action === 'chg' && object === 'category') {
						
						const target = update.name;
						const field = update.attribute;
						const input = update.newValue;
						//console.log('parameters ', target, attribute, input);
						
						if (field === 'rank') { 
						
							//chg cat rank
							const key = process.env.SHOP + '_' + target + '_catBtn';
							const rank = isNumeric (input) ? Number (input) : 100;
							//console.log('rank, key ', rank, key);
							
							client.hset (key, //eg samplepizza_Пиццы_catBtn
										 'id', rank, function (err3, m) {

										//console.log('m ', m);
										if (err3) { 
											console.error('err3 \n'+ err3);
											return res.json({ success: false, 
												 message: 'Ошибка сервера !' });
										}
										else { 
											return res.json({ success: true, 
												 message: 'Ассортимент успешно обновлен !' });

										}//else
							})//hset
						} //if-rank
							
						else if (field === 'name') { 
						
							//add new cat name 
							client.sadd (process.env.SHOP, //eg samplepizza
										 input, function (err3, p) {

								//console.log('p ', p);
								if (err3) { console.error('err3 \n'+ err3);}
								else { 
									
									//remove prev cat name
									client.srem (process.env.SHOP, //eg samplepizza
												 target, function (esrem, srem) {

										//console.log('srem ', srem);
										if (esrem) { console.error('esrem \n'+ esrem);}
										else { 
											
										let oldHeaderkey = process.env.SHOP + '_' + target + '_catBtn';
										let newHeaderkey = process.env.SHOP + '_' + input + '_catBtn';
											
										//get old cat-rank
										client.hget (oldHeaderkey, 'id', function (e, rank) {

											//console.log('rank ', rank);
											if (e) { console.error('e \n'+ e);}
											else { 
											
											//rename header key: eg samplepizza_Пиццы_catBtn
										    client.rename (oldHeaderkey, newHeaderkey,
													function (esren, sren) {

											//console.log('sren ', sren);
											if (esren) { console.error('esren \n'+ esren);}
											else { 
												
												client.hmset (newHeaderkey, 'cat', input, 'id', rank,
													function (e0, h) {

													//console.log('h ', h);
													if (e0) { console.error('e0 \n'+ e0);}
													else {
												
														//rename cat key: eg samplepizza_Пиццы
														let oldCatkey = process.env.SHOP + '_' + target;
														let newCatkey = process.env.SHOP + '_' + input;

														client.rename (oldCatkey, newCatkey,
																	function (esren2, sren2) {

															//console.log('sren2 ', sren2);
															if (esren2) { console.error('esren2 \n'+ esren2);}
															else { 

																//rename each item-key for cat: 
																//eg samplepizza_Пиццы_Моцарела
																client.smembers(newCatkey,
																	function (e2, items) {

																	//console.log('items ', items[0]);
																	if (e2) { console.error('e2 \n'+ e2);}
																	else { 

																		items.forEach( (i,idx) => {

																		  let oldItem = oldCatkey + '_' + i;
																		  let newItem = newCatkey + '_' + i;
																		  //console.log('chg ', oldItem);

																		  client.rename (oldItem, newItem,
																			function (e3, t) {
																			  
																			//console.log('t ', t);
																			if (e3) { 
																			//console.error('e3 \n'+ e3);
																			}
																			else { 
																			  
																			    //hset 'cat' inside item-hash
																			    client.hset (newItem, 
																							 'cat', input,
																				   function (e4, v) {

																				   //console.log('v ', v);
																				   if (e4) { 
																				   //console.error('e4 '+ e4);
																				   }
																				   else {
																					   
																				     if(idx === items.length-1) 
																				     { return res.json({ 
																					  success: true, 
																					  message: 
																		'Ассортимент успешно обновлен !' });
																					 }}//if-else
																					
																				});//hset 
																			 }//else
																				
																			}); //rename-item

																		  });//items-forEach
																		}//else		
																	});//smembers
																}//else	
															});//rename catKey
														}//else	
													});//hmset headerKey-cat
													}//else	
												});//rename -eaderKey
											}//else	
										});//hget-cat-id
											
									  }//else	
									});//srem prev catName
									
								}//else	
							});//sadd new catName
							
						}//else-if field=name
					} //if action-object
					
					// ============================= DEL - CATEGRY ==========================
					
					if ( action === 'del' && object === 'category') {

						//STEP 1 = remove from SET 'shop'
						client.srem (process.env.SHOP, //eg samplepizza
									 update.name, function (err3, p) {

							//console.log('p ', p);
							if (err3) { console.error('err3 \n'+ err3);}
							if (p=='1') { 
								
								//STEP 2 = remove HEADER '_catBtn' //eg samplepizza_Пиццы_catBtn
								
								const key = process.env.SHOP + '_' + update.name + '_catBtn';
								
								client.del (key, //eg samplepizza_Пиццы_catBtn
									async function (err4, m) {

									//console.log('m ', m);
									if (err4) { console.error('err4 \n'+ err4);}
									
									//STEP 3 = retrieve and del items in categry
									
									let key2 = process.env.SHOP + '_' + update.name //eg samplepizza_Пиццы
									let items = await client.smembersAsync (key2); //[Моцарела, Фетучини, ..]
									await client.delAsync (key2);
										
									items.forEach ((k, idx) => { 

										//console.log('m ', m);
										let key3 = key2 + '_' + k //eg samplepizza_Пиццы_Моцарела
										
										client.del (key3, //eg samplepizza_Пиццы_catBtn
											function (err4, s) {
											
											//console.log('s ', s);
											if (err4) { console.error('err4 \n'+ err4);}

											if (idx == items.length-1) {
												return res.json({ success: true, 
												 	message: 'Категория удалена !' });
											}//if
										})//del-key3
									})//items-forEach
									
								})//del-key
							
							}//if-p
						})//srem

					} //if action-object
					
					// ============================= ADD-ITEM ==========================

					if ( action === 'add' && object === 'item') {
						
						let title = update.title;
						let cat = update.cat;
						let des = update.des;
						let rawPrice = update.price;
						let price =isNumeric (rawPrice) ? Number (rawPrice) : 0
						//console.log('params ', title, cat, des, price);
						
						//Generating hash-value for 'productid' attr, added by default
						let hash = hashGenerator();
						console.log('hash ', hash);

						//add title to shop_category set 
						let catKey = process.env.SHOP + '_' + cat;
						client.sadd (catKey, //eg samplepizza_Суши
									 title, async function (err3, p) {

							//console.log('p ', p);
							if (err3) { console.error('err3 \n'+ err3);}
							else { 
								
								if (req.file)  {
									
									let file = req.file.path; 
									//console.log('file ', file);
									
									uploadImgUrl (file)
									.then ((imgUrl) =>{
										
										//console.log('imgUrl ', imgUrl);
										
										let itemKey =  catKey + '_' + title;

										client.hmsetAsync (itemKey, //eg samplepizza_Пиццы_Моцарелла
										   'cat', cat, 'title', title,  'des', des,
										   'price', price, 'img', imgUrl,  
											'productid', hash) // this is not passed-in by the user
										
										.then (()=>{
											return res.json({ success: true, 
												message: 'Ассортимент успешно обновлен !' });
										})
										.catch((e)=>{
											console.error(e);
											return res.json({ success: false, 
												message: 'Ошибка обработки ! ' });
										});
									}).catch((e)=>{
											console.error(e);
											return res.json({ success: false, 
												message: 'Ошибка обработки ! ' });
									});

								} else { 
									
									return res.json({ success: false, 
											message: 'Ошибка обработки фото ' });
								}//if
							}//else
						}); //hsadd
						
					} //if action-object
					
					// ============================= CHG-ITEM ==========================
					
					if ( action === 'chg' && object === 'item') {
						
						let target = update.title;
						let cat = update.cat;
						let field = update.attribute;
						let input = update.newValue;
						//console.log('parameters ', target, cat, field, input);
						
						const itemKey = process.env.SHOP + '_' + cat + '_' + target;
						//eg samplepizza_Пиццы_Моцарелла
						
						if (field === 'img') {
							
							let file = req.file.path; 
							//console.log('file ', file);
							
							uploadImgUrl (file)
							.then ((imgUrl) =>{
										
								//console.log('imgUrl ', imgUrl);
								
								client.hsetAsync (itemKey, 'img', imgUrl)
							
								.then (()=>{
											return res.json({ success: true, 
												message: 'Ассортимент успешно обновлен !' });
								})
								.catch((e)=>{
											console.error(e);
											return res.json({ success: false, 
												message: 'Ошибка обработки ! ' });
								});//hsetAsync
							});//then-imgUrl
						
						} else { 
						
							//chg cat rank
							
							
							if (field === 'price') {
								input = isNumeric (input) ? Number (input) : 0;
							}
							
							client.hset (itemKey, //eg samplepizza_Пиццы_Моцарела
										 field, input, async function (err3, m) {

								//console.log('m ', m);
								if (err3) { 
									//console.error('err3 \n'+ err3);
									return res.json({ success: false, 
										message: 'Ошибка сервера !' });
								}
								else { 
											
									if (field != 'title') { 
										return res.json({ success: true, 
											message: 'Ассортимент успешно обновлен !' });
									} else { 
											
										//if field = 'title', update cat-set also and rename item-hash
										await client.sremAsync (process.env.SHOP + '_' + cat, target);
										await client.saddAsync (process.env.SHOP + '_' + cat, input);
										await client.renameAsync(process.env.SHOP + '_' + cat +'_' + target, 
																 process.env.SHOP + '_' + cat +'_' + input);
										return res.json({ success: true, 
											message: 'Ассортимент успешно обновлен !' });
											
									}//else
								}//else
								
							})//hset
						
						} //else-if-field != 'img'
												
					} //if action-object
					
				// ============================= DEL-ITEM ==========================
					
					if ( action === 'del' && object === 'item') {
						
						let target = update.title;
						let cat = update.cat;
						//console.log('parameters ', target, cat);
						
						//add title to shop_category set 
						let catKey = process.env.SHOP + '_' + cat;
						client.srem (catKey, //eg samplepizza_Суши
									 target, function (err3, p) {

							//console.log('p ', p);
							if (err3) { console.error('err3 \n'+ err3);}
							else { 
								
								//add attributes to shop_category_item hash
								let itemKey =  catKey + '_' + target;
								
								client.del (itemKey, //eg samplepizza_Пиццы_Моцарелла
									    function (err4, m) {
									
									//console.log('m ', m);
									if (err4) { console.error('err4 \n'+ err4);}
									else { 
								
										return res.json({ success: true, 
											message: 'Ассортимент успешно обновлен !' });
									}//else
								})//del-hash
								
							}//else
						})//rm-set-item
						
					 } //if action-object
					
				/// ======================== CALLBACK-HELL BUT FAST ===========================
				} //if-r

			}); //hset
		}); //app-post
		
	} catch (error) { 
		console.error('post error \n',  error);  
		return res.json({ success: false, 
						message: 'Ошибка сервера. \nПовторите попытку позднее!' });
	}

}


