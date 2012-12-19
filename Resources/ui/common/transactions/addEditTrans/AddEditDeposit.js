function AddEditDeposit(_title, _container) {

	var depositWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		backgroundColor : '#ccc'
	
	});

	var amountView = Ti.UI.createView({
		layout : 'horizontal',
		height : '15%',
		top : '10%',
		left : '2%',
	});
	depositWin.add(amountView);

	var amountLbl = Ti.UI.createLabel({
		text : 'Amount',
		width : '25%',
		left : 0,
		top : 0,
		// font:{fontSize:30},
		color : 'black'
	});
	amountView.add(amountLbl);

	var amountTxt = Ti.UI.createTextField({
		hintText : 'Enter Amount',
		width : '65%',
		// zIndex : 3
	});
	amountView.add(amountTxt);

	var dateView = Ti.UI.createView({
		layout : 'horizontal',
		top : '25%',
		left : '2%',
		height : '15%',
	});
	depositWin.add(dateView);

	
	var dateLbl = Ti.UI.createLabel({
		text: 'Date',
		width: '25%',
		color : 'black'
	});
	dateView.add(dateLbl);

	var dateValue = Ti.UI.createTextField({
		hintText: String.formatDate(new Date()),
		color : 'black',
		editable: false,
		width:'40%'
		// width:'30%'
	});
	dateView.add(dateValue);
	
	var changeDateBtn = Ti.UI.createButton({
		title: 'change',
		width:'20%'
	});
	dateView.add(changeDateBtn);
	
	changeDateBtn.addEventListener('click', function(event){
		var DatePickerWindow = require('ui/common/transactions/addEditTrans/DatePickerWindow');
		var dateWindow = new DatePickerWindow('select date', depositWin);
		_container.open(dateWindow);
	});
	
	Ti.App.addEventListener('DateChanged',function(e){
		dateValue.hintText = String.formatDate(depositWin.dateValue);
	});

	var sourceView = Ti.UI.createView({
		layout : 'horizontal',
		top : '40%',
		left : '2%',
		height : '15%',
	});
	depositWin.add(sourceView);

	var sourceLbl = Ti.UI.createLabel({
		text : 'Source',
		width : '25%',
		left : 0,
		top : 0,
		color : 'black'
	});
	sourceView.add(sourceLbl);

	
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
	var testBtn = Ti.UI.createButton({
		title: 'Add item'
	});
	sourceView.add(testBtn);
	
	testBtn.addEventListener('click', function(event){
		
	});
	//--------------------

	var saveBtn = Ti.UI.createButton({
		title : 'save',
		top : '65%',
		width : '50%',
		// font:{fontSize:30},
	});
	depositWin.add(saveBtn);

	return depositWin;

};
module.exports = AddEditDeposit;
