const localizedTimestamp = function (utc, srcServerOffset, target_time) {
	
	function add_zero (n) { 
		let char = n.toString()
		let len = char.length;
		if (len==1) { char = '0' + char;};
		return char;
	};
	
	let diff = 3.00;
	if (target_time == 'alm')  { diff = 6.00 };

	let tzDiff = diff * 60 + Number (srcServerOffset) ; //in min
	let LoсalDate = new Date(Number (utc) + tzDiff * 60 * 1000);
	
	let LoсalHrs = add_zero (LoсalDate.getHours() ) 
	let LoсalMin = add_zero (LoсalDate.getMinutes() ) 
	let LoсalDay = add_zero (LoсalDate.getDate() ) 
	
	let LoсalMonth = LoсalDate.getMonth()
	let strMonth = ''
	switch (LoсalMonth) {
        case 0: strMonth = 'янв'; break;
		case 1: strMonth = 'фев'; break;
		case 2: strMonth = 'мар'; break;
		case 3: strMonth = 'апр'; break;
		case 4: strMonth = 'май'; break;
		case 5: strMonth = 'июн'; break;
		case 6: strMonth = 'июл'; break;
		case 7: strMonth = 'авг'; break;
		case 8: strMonth = 'сен'; break;
		case 9: strMonth = 'окт'; break;
		case 10: strMonth = 'ноя'; break;
		case 11: strMonth = 'дек'; break;
		default: break
	}
	
	let LocalTimeStr = LoсalDay + '-'+ strMonth + ' ' +  LoсalHrs + ':' + LoсalMin
	return LocalTimeStr;
}