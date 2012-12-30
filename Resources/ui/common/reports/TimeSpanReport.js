function TimeSpanReport(_title, _container) {

	var win = Ti.UI.createWindow({
		title: 'Time Span Report',
		layout: 'vertical',
		backgroundColor:'#ccc'
	});
	
	var dataExp = [];
	var db = require('lib/db');
	
	var startView = Ti.UI.createView({
		height: '25%',
		width:'90%'	
	});
	
	win.add(startView);
	
	var yearAgo = new Date();
	yearAgo.setYear(yearAgo.getYear() - 1);
	
	var today = new Date();
	var startDay = new Date();
	var endDay = new Date();
	
	var startPicker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE,
		minDate : yearAgo,
		maxDate : today,
		value : today
	});
	startView.add(startPicker);
	
	startPicker.addEventListener('change', function(e) {
		startDay = e.value;
		populateTable();
	});
	
	var endView = Ti.UI.createView({
		height: '25%',
		width:'90%'	
	});
	
	win.add(endView)
	
	var endPicker = Ti.UI.createPicker({
		type: Ti.UI.PICKER_TYPE_DATE,
		minDate : yearAgo,
		maxDate : today,
		value : today
	});
	endView.add(endPicker);
	
	endPicker.addEventListener('change', function(e) {
		endDay = e.value;
		populateTable();
	});
	
	var transTable = Ti.UI.createTableView({
		title : 'Recent',
		height : '100%',
	});
	win.add(transTable);

	transTable.addEventListener('click', function(e) {

		var obj = e.rowData.data;

		var ExpenseDetailWindow = require('ui/common/transactions/ExpenseDetails');
		var detailedExpense = new ExpenseDetailWindow('Expense', _container, obj);
		_container.open(detailedExpense);

	});
	
	var populateTable = function()
	{
		dataExp = db.getExpensesIncluded(startDay, endDay);
		var tableCustomRows = [];

		for (var i = 0; i < dataExp.length; i++) {
			var row = Ti.UI.createTableViewRow({
				height : '70',
				data : dataExp[i]
			});

			if (i % 2 == 0)
				row.backgroundColor = '#999';
			else
				row.backgroundColor = '#777';

			var leftPart = Ti.UI.createView({
				layout : 'vertical',
				left : '0',
				width : '50%'
			});
			leftPart.add(Ti.UI.createLabel({
				text : 'Expense',
				left : '5%',
				color : '#d71527'
			}));
			leftPart.add(Ti.UI.createLabel({
				text : dataExp[i].amount + ' JD',
				left : '5%'
			}));
			row.add(leftPart);

			var rightPart = Ti.UI.createView({
				layout : 'vertical',
				right : '0',
				width : '50%'
			});

			var obj = db.getCategory(dataExp[i].categoryId);

			rightPart.add(Ti.UI.createLabel({
				text : obj.title,
				right : '5%',
				color : 'black'
			}));

			rightPart.add(Ti.UI.createLabel({
				text : dataExp[i].date + ' ' + dataExp[i].time,
				right : '5%'
			}))

			row.add(rightPart);
			tableCustomRows.push(row);
		};

		transTable.data = tableCustomRows;
	}
	
	return win;
};

module.exports = TimeSpanReport; 