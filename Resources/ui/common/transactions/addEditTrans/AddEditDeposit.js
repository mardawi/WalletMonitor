function AddEditDeposit(_title, _container) {

	var db = require('lib/db');
	var data = db.getSources();
	var isAndroid = Ti.Platform.osname == 'android';

	var depositWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		layout : 'vertical',
		backgroundColor : '#ccc'

	});
	depositWin.dateValue = new Date();

	var amountTxt = Ti.UI.createTextField({
		keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
		width : '90%',
		top : '15%',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText : 'Set Amount'
	});
	depositWin.add(amountTxt);

	var dateValue = Ti.UI.createButton({
		title : String.formatDate(new Date()),
		width : '90%',
		top : '5%',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	dateValue.addEventListener('click', function(event) {
		var DatePickerWindow = require('ui/common/transactions/addEditTrans/DatePickerWindow');
		var dateWindow = new DatePickerWindow('select date', depositWin);
		_container.open(dateWindow);

	});

	Ti.App.addEventListener('DateChanged', function(e) {
		dateValue.title = String.formatDate(depositWin.dateValue);
	});
	depositWin.add(dateValue);

	var addSource = Ti.UI.createButton({
		title : 'Add Source',
		top : '5%',
		width : '90%'
	});

	addSource.addEventListener('click', function(event) {
		var srcWin = require('ui/common/categoryWin');
		var CategoryWin = new srcWin('Source', depositWin, data);
		_container.open(CategoryWin);
	});

	Ti.App.addEventListener('selectCategory', function(e) {
		addSource.title = depositWin.selectedCatg.title;
	});

	depositWin.add(addSource)
	//--------------------

	var saveBtn = Ti.UI.createButton({
		title : 'save',
	});

	saveBtn.addEventListener('click', function(e) {
		db.addDeposite(amountTxt.value, depositWin.dateValue, depositWin.selectedCatg.id);
		depositWin.close();
	});

	depositWin.addEventListener('click', function(e) {
		if (isAndroid)
			return;
		amountTxt.blur();
		dateValue.blur();
	});

	if (isAndroid) {
		saveBtn.width = '45%';
		saveBtn.top = '15%';
		depositWin.add(saveBtn);

	} else
		depositWin.setRightNavButton(saveBtn);

	return depositWin;

};
module.exports = AddEditDeposit;
