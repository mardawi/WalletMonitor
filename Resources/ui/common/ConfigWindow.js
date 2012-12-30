function ConfigWindow(_title){
	var db = require('lib/db');
	
	var win = Ti.UI.createWindow({
		title:_title,
		layout: 'vertical',
		backgroundColor:'#ccc'
	});
	
	// var timeview = Ti.UI.createView({
		// top : 0,
		// left : 0
	// });
	
	
	var changeTimebtn = Ti.UI.createButton({
		title:"Change time span",
		top:'5%',
		width:'80%',
		height:'15%'
	});
	
	var changeCategoriesBtn = Ti.UI.createButton({
		title:"Edit categories",
		top:'5%',
		width:'80%',
		height:'15%'
	});
	
	var setBalanceBtn = Ti.UI.createButton({
		title:"Set initail balance",
		top:'5%',
		width:'80%',
		height:'15%'
	});
	
	var deletAllBtn = Ti.UI.createButton({
		title:"Delet all data",
		top:'5%',
		width:'80%',
		height:'15%'
	});
	
	deletAllBtn.addEventListener("click",function(){
		var alertDialog = Titanium.UI.createAlertDialog({ 
			title: 'Delet All Data', 
			message: 'Do you want to delet all data', 
			buttonNames: ['OK','Cancel'],
			cancel:2 
		});
		
		alertDialog.show(); 
		
		alertDialog.addEventListener("click",function(e){
			
			if(e.index==0){
				db.deletAll();
			}
			
		})
	});
	
	// Ti.App.addEventListener('databaseUpdated', function(e){
		// alert("all Data deleted");
	// });
	
	changeTimebtn.addEventListener("click",function(){
		var configTime = require('ui/common/config/configTime');
		var timeWin = new configTime('Edit Time', win.containingTab);
		win.containingTab.open(timeWin);
		
	});
	
	changeCategoriesBtn.addEventListener("click",function(){
		var configCategories = require('ui/common/config/configCategories');
		var CategoriesWin = new configCategories('Edit Categories', win.containingTab);
		win.containingTab.open(CategoriesWin);
	});
	
	setBalanceBtn.addEventListener("click",function(){
		var setInitailBalance = require('ui/common/config/setInitailBalance');
		var Balance = new setInitailBalance('set Initail Balance', win.containingTab);
		win.containingTab.open(Balance);
	});
	
	// timeview.add(deletAllBtn);
	// timeview.add(changeTimebtn);
	// timeview.add(setBalanceBtn);
	// timeview.add(changeCategoriesBtn);
	
	
	
	win.add(changeTimebtn);
	win.add(setBalanceBtn);
	win.add(changeCategoriesBtn);
	win.add(deletAllBtn);
	return win;
	
	
}
module.exports = ConfigWindow; 
