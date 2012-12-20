function DepositDetails(_title, _container, _depositObj) {

	var win = Ti.UI.createWindow({
		title : _title,
		backgroundColor : '#ccc'
	});

	var editBtn = Ti.UI.createButton({
		title : 'Edit',
		top : '2%',
		right : '2%',
		width : '20%',
	});

	win.add(editBtn);

	var amountView = Ti.UI.createView({
		layout : 'horizontal',
		height : '15%',
		top : '10%',
		left : '2%',
	});
	win.add(amountView);

	var amountLbl = Ti.UI.createLabel({
		text : 'Amount',
		width : '25%',
		left : 0,
		top : 0,
		// font:{fontSize:30},
		color : 'black'
	});
	amountView.add(amountLbl);

	var amountVal = Ti.UI.createLabel({
		text : _depositObj.amount,
		width : '65%',
		color : 'black',
	});
	amountView.add(amountVal);

	var dateView = Ti.UI.createView({
		layout : 'horizontal',
		top : '25%',
		left : '2%',
		height : '15%',
	});
	win.add(dateView);

	var dateLbl = Ti.UI.createLabel({
		text : 'Date',
		width : '25%',
		color : 'black'
	});
	dateView.add(dateLbl);

	var dateValue = Ti.UI.createLabel({
		text : _depositObj.date,
		color : 'black',
		width : '40%'
		// width:'30%'
	});
	dateView.add(dateValue);

	var sourceView = Ti.UI.createView({
		layout : 'horizontal',
		top : '40%',
		left : '2%',
		height : '15%',
	});
	win.add(sourceView);

	var sourceLbl = Ti.UI.createLabel({
		text : 'Source',
		width : '25%',
		left : 0,
		top : 0,
		color : 'black'
	});
	sourceView.add(sourceLbl);

	var db = require('lib/db');
	var source = db.getSource(_depositObj.sourceId);

	var sourceValue = Ti.UI.createLabel({
		text : source.title,
		color : 'black',
		width : '40%'
	});
	sourceView.add(sourceValue);

	return win;

};
module.exports = DepositDetails;
