function setInitailBalance(_title, _container) {
	var db = require('lib/db');
	
	var win = Ti.UI.createWindow({
		title:_title,
		backgroundColor:'white'
	});
	
	var self = Ti.UI.createView({
		top:0
	});
	
	var balnaceLBL = Ti.UI.createLabel({
		text:"Balnace Value",
		left:5,
		top:90,
		color:"#000000",
	});
	
	var expensesLBL = Ti.UI.createLabel({
		text:"Expenses Value",
		left:5,
		top:140,
		color:"#000000",
	});
	
	var depositsLBL = Ti.UI.createLabel({
		text:"Deposit Value",
		left:5,
		top:190,
		color:"#000000",
	});
	
	var balnacetxt = Ti.UI.createTextField({
		value:"0.0",
		top:80,
		color:"#000000",
		width:140,
		left:150
	});
	
	var expensestxt = Ti.UI.createTextField({
		value:"0.0",
		top:130,
		color:"#000000",
		width:140,
		left:150
	});
	
	var depositstxt = Ti.UI.createTextField({
		value:"0.0",
		top:180,
		color:"#000000",
		width:140,
		left:150
	});
	
	var savebtn = Ti.UI.createButton({
		title:"save",
		top:300,
		width:100
	});
	
	
	savebtn.addEventListener("click",function(){
		if(balnacetxt.value!=''){
			Ti.App.Properties.setDouble("setBalnace",Number(balnacetxt.value));
		}
		if(expensestxt.value!=''){
			Ti.App.Properties.setDouble("setExpenses",Number(expensestxt.value));
		}
		if(depositstxt.value!=''){
			Ti.App.Properties.setDouble("setDeposit",Number(depositstxt.value));
		}
		
		Ti.App.fireEvent('setInitail', {balnace:balnacetxt.value,expenses:expensestxt.value,deposits:depositstxt.value});
	});
	
	var checkValue = function(){
		if(Ti.App.Properties.hasProperty('setBalnace')){
			balnacetxt.value = Ti.App.Properties.getDouble("setBalnace");
		}else{
			Ti.App.Properties.setDouble("setBalnace",0.0);
		}
		
		if(Ti.App.Properties.hasProperty('setExpenses')){
			expensestxt.value = Ti.App.Properties.getDouble("setExpenses");
		}else{
			Ti.App.Properties.setDouble("setExpenses",0.0);
		}
		
		if(Ti.App.Properties.hasProperty('setDeposit')){
			depositstxt.value = Ti.App.Properties.getDouble("setDeposit");
		}else{
			Ti.App.Properties.setDouble("setDeposit",0.0);
		}
	}
	checkValue();
	
	self.add(savebtn);
	
	self.add(depositstxt);
	self.add(expensestxt);
	self.add(balnacetxt);
	
	self.add(depositsLBL);
	self.add(expensesLBL);
	self.add(balnaceLBL);
	
	win.add(self);
	
	return win;
	
}
module.exports = setInitailBalance;
