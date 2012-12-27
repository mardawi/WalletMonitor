function setInitailBalance(_title, _container) {
	var db = require('lib/db');

	var win = Ti.UI.createWindow({
		title : _title,
		backgroundColor : '#ccc',
		layout : 'vertical'
	});

	var balnaceLBL = Ti.UI.createLabel({
		text : "Balnace Value",
		top : '20%',
		color : "black",
	});

	win.add(balnaceLBL);

	var balnacetxt = Ti.UI.createTextField({
		value : "0.0",
		top : '2%',
		color : "#000000",
		width : '45%',
	});

	win.add(balnacetxt);

	var savebtn = Ti.UI.createButton({

		title:"save",
		top:300,
		width:100
	});
	
	
	savebtn.addEventListener("click",function(){
		if(balnacetxt.value!=''){
			Ti.App.Properties.setDouble('setBalnace',Number(balnacetxt.value));
		}
		
		Ti.App.fireEvent('setInitail', {balnace:balnacetxt.value,expenses:expensestxt.value,deposits:depositstxt.value});
	});
	
	
	var checkValue = function(){
		if(Ti.App.Properties.hasProperty('setBalnace')){
			balnacetxt.value = Ti.App.Properties.getDouble("setBalnace");
		} else {
			Ti.App.Properties.setDouble("setBalnace", 0.0);
		}
	}
	checkValue();

	return win;

}

module.exports = setInitailBalance;
