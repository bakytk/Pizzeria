
// sorts cat-array by 'id' in ascending order
export const catSorter = (arr) => {
		
			//Comparer Function    
			function GetSortOrder(prop) {    
				return function(a, b) {    
					if (a[prop] > b[prop]) {    
						return 1;    
					} else if (a[prop] < b[prop]) {    
						return -1;    
					}    
					return 0;    
				}    
			}    
    
			var newarr = arr.sort(GetSortOrder("id"));
			return newarr;
	
	};

// sorts and processes item-array into sub-arrays ranked by cat-array-id

export const itemSublister = (rawArray, sortedCats) => {
	
		var newArr = [];
	
		sortedCats.forEach ( c => {
			
			var CAT = c.cat; // eg Пиццы
			var subArr = [];
			
			rawArray.forEach ( el => {
				
				var keys= Object.keys(el)
				var k = keys[0];
				
				if (k === CAT) {
					
					var keys2 = Object.keys(el[CAT])
					var ITEM = keys2[0]; //eg Моцарелла
					//console.log('ITEM ' + ITEM);
				
					subArr.push(el[CAT][ITEM]);
				}
			
			});
			
			//console.log('subArr.length ' + subArr.length);
			newArr.push(subArr); 
		});

		return newArr;
	
	}
			

export const sumDue = (items) => {
	
		var total = 0;
			
		items.forEach((v) => {
	
				total += v.qty * v.price;
			});
	
		return total;
	
	}


