function configWin(_title, _container) {
	var win = Ti.UI.createWindow({
		title : _title,
		backgroundColor : "#ffffff",
		layout : 'vertical'
	});

	var picker = Ti.UI.createPicker({
		top : '10%'
	});

	var data = [];
	data[0] = Ti.UI.createPickerRow({
		title : 'Week',
		custom_item : 'w'
	});
	data[1] = Ti.UI.createPickerRow({
		title : 'Month',
		custom_item : 'm'
	});
	data[2] = Ti.UI.createPickerRow({
		title : 'Year',
		custom_item : 'y'
	});

	picker.selectionIndicator = true;

	picker.add(data);

	win.add(picker);

	var balnaceLBL = Ti.UI.createLabel({
		text : "Balnace Value",
		top : '5%',
		color : "black",
	});

	win.add(balnaceLBL);

	var balnacetxt = Ti.UI.createTextField({
		keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
		value : "0.0",
		top : '2%',
		color : "#000000",
		width : '45%',
	});

	win.add(balnacetxt);
	
	var changeCategoriesBtn = Ti.UI.createButton({
		title : "Edit categories",
		top : '5%',
		width : '80%',
		height : '15%'
	});

	win.add(changeCategoriesBtn);

	var deletAllBtn = Ti.UI.createButton({
		title : "Delet all data",
		top : '5%',
		width : '80%',
		height : '15%'
	});

	win.add(deletAllBtn);

	deletAllBtn.addEventListener("click", function() {
		var alertDialog = Titanium.UI.createAlertDialog({
			
			title : 'Delet All Data',
			message : 'Do you want to delet all data',
			buttonNames : ['OK', 'Cancel'],
			cancel : 2
		});

		alertDialog.show();

		alertDialog.addEventListener("click", function(e) {

			if (e.index == 0) {
				db.deletAll();
			}

		})
		
	});

	var saveBtn = Ti.UI.createButton({
		title : "Close",
		top : 300
	});

	win.add(saveBtn);

	changeCategoriesBtn.addEventListener("click", function() {
		var configCategories = require('ui/common/config/configCategories');
		var CategoriesWin = new configCategories('Edit Categories', win.containingTab);
		win.containingTab.open(CategoriesWin);
	});
	
	
	var checkDate = function(){
		if(!Ti.App.Properties.hasProperty("SetBalance"))	{
			Ti.App.Properties.setDouble("SetBalance",0.0);
		}else{
			var balance = Ti.App.Properties.getDouble("SetBalance");
			balnacetxt.value = balance;
		}balance
		
		if(!Ti.App.Properties.hasProperty("DatePicker"))	{
			Ti.App.Properties.setString("DatePicker",'Month');
			picker.setSelectedRow(0,1);
		}else{
			var format = Ti.App.Properties.getString("DatePicker");
			if(format=="Month"){
				picker.setSelectedRow(0,1);
			}
			if(format=="Week"){
				picker.setSelectedRow(0,0);
			}
			if(format=="Year"){
				picker.setSelectedRow(0,2);
			}
		}
	}
	
	checkDate();
	
	
	picker.addEventListener("change",function(e){
		Ti.API.info('User selected date: ' + e.row.title);
		if(e.row.title=='Month'){
			Ti.App.Properties.setString("DatePicker",'Month');
			Ti.App.fireEvent("TimeChange");
		}
		if(e.row.title=='Week'){
			Ti.App.Properties.setString("DatePicker",'Week');
			Ti.App.fireEvent("TimeChange");
		}
		if(e.row.title=='Year'){
			Ti.App.Properties.setString("DatePicker",'Year');
			Ti.App.fireEvent("TimeChange");
		}
	});
	
	balnacetxt.addEventListener("change",function(){
		var decimalOnly = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/;
		
		if(this.value!=""){
			if(decimalOnly.test(this.value)){
				Ti.App.Properties.setDouble("SetBalance",this.value);
			}else{
				if((this.value)[(this.value).length-1] !="."){
					alert("Please enter numbers only");
				}
			}
		}
	});

	return win;
}

module.exports = configWin;
