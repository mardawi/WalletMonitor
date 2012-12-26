function AddEditDeposit(_title, _container) {
	
	var db = require('lib/db');
	var data = db.getSources();

	var depositWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		layout:'vertical',
		backgroundColor : '#ccc'
	
	});
	depositWin.dateValue = new Date();

	var amountTxt = Ti.UI.createTextField({
		keyboardType:Ti.UI.KEYBOARD_DECIMAL_PAD,
		width:'90%',
		top:'5%',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:'Set Amount'
	});
	depositWin.add(amountTxt);
	
	var dateValue = Ti.UI.createTextField({
		hintText:String.formatDate(new Date()),
		enabled: false,
		width:'90%',
		top:'10%',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	dateValue.addEventListener('click', function(event){
		var DatePickerWindow = require('ui/common/transactions/addEditTrans/DatePickerWindow');
		var dateWindow = new DatePickerWindow('select date', depositWin);
		_container.open(dateWindow);
	});
	
	Ti.App.addEventListener('DateChanged',function(e){
		dateValue.hintText = depositWin.dateValue;
	});
	depositWin.add(dateValue);


	
	// var sourcePicker = Ti.UI.createPicker();
// 	
	// var data = [{title:'Bananas',custom_item:'b'}, {title:'Strawberries',custom_item:'s'}, {title:'Mangos',custom_item:'m'}, ]
	// var column = Ti.UI.createPickerColumn();
	// for(var i=0; i< data.length; i++)
		// column.addRow(Ti.UI.createPickerRow(data[i]));
	// column.addRow(Ti.UI.createPickerRow({title:'Add more',custom_item:'g'}));
// 	
	// sourcePicker.addEventListener('change', function(event){
		// if(event.rowIndex == data.length){
		// // Ti.UI.createAlertDialog({
			// // message: 'Add more selected'
		// // }).show();
// 		
// 	
			// Ti.UI.createAlertDialog({
				// title : 'Enter text',
				// style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
				// buttonNames : ['OK', 'cancel']
			// }).show();
			// }
// 
	// });
	// sourcePicker.add(column);
// 	
	// sourcePicker.selectionIndicator = true;
	// sourceView.add(sourcePicker);
	
	//-------------------
	// var testBtn = Ti.UI.createButton({
		// title: 'Add item'
	// });
	// sourceView.add(testBtn);
	
	var addSource = Ti.UI.createButton({
		title:'Add item',
		// enabled: false,
		top:'10%',
		// borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		width:'90%'
	});
	
	addSource.addEventListener('click', function(event){
		var srcWin = require('ui/common/categoryWin');
		var CategoryWin = new srcWin('Source',depositWin,data);
		_container.open(CategoryWin);
	});
	
	Ti.App.addEventListener('selectCategory', function(e){
		addSource.title = depositWin.selectedCatg.title;
	});
	
	depositWin.add(addSource)
	//--------------------

	var saveBtn = Ti.UI.createButton({
		title : 'save',
	});
	
	saveBtn.addEventListener('click', function(e){
		db.addDeposite(amountTxt.value,depositWin.dateValue,depositWin.selectedCatg.id);
		depositWin.close();
	});
	// depositWin.add(saveBtn);
	
	depositWin.addEventListener('click', function(e){
		amountTxt.blur();
		dateValue.blur();
	});
	
	depositWin.setRightNavButton(saveBtn);
	
	return depositWin;

};
module.exports = AddEditDeposit;
