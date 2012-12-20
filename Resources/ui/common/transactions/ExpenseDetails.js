function ExpenseDetails(_title, _container, _expenseObj) {

	var win = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		backgroundColor:'#ccc'
	});
	
	var formView = Ti.UI.createView({
		width: '90%',
		height: '65%',
		top:'3%',
		backgroundColor:'#333',
		layout:'vertical',
	});
	win.add(formView);
	
	var amountView = Ti.UI.createView({
		layout:'horizantal',
		top:'0',
		left:0,
		height:'15%',
		width: '100%'
	});
	formView.add(amountView);
	
	amountView.add(Ti.UI.createLabel({
		text : 'Amount:',
		left : '5%',
		width:'30%'
	}));
	
	amountView.add(Ti.UI.createLabel({
		left:'35%',
		width:'35%',
		text:_expenseObj.amount
	}));
	
	var dateView = Ti.UI.createView({
		layout: 'horizantal',
		top:'17%',
		left:0,
		height: '15%',
		width: '100%'
	});
	win.add(dateView);
	
	dateView.add(Ti.UI.createLabel({
		text: 'Date',
		left : '5%',
		width:'30%'
	}));
	
	dateView.add(Ti.UI.createLabel({
		left:'35%',
		width:'35%',
		text:_expenseObj.date
	}));
	
	dateView.add(dateValue);
	
	var bottomView = Ti.UI.createView({
		top : '70%',
		width : '100%',
		height : '30%',
		layout : 'horizantal'
	});
	
	var locLBL = Ti.UI.createLabel({
		text:'Location',
		top:'50%',
		left:'5%',
		width:'40%',
		color:'black'
	});
	
	var locAddress = Ti.UI.createLabel({
		top:'50%',
		text: _expenseObj.address,
		left:'45%',
	});
	
	bottomView.add(locLBL);
	bottomView.add(locAddress);
	win.add(bottomView);

	return win;

};
module.exports = ExpenseDetails; 