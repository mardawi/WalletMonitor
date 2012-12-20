function TransactionReport(_title, _container) {

	var win = Ti.UI.createWindow({
		title : _title,
		width : '100%',
		height : '100%',
		backgroundColor : '#ccc'
	});

	var db = require('lib/db');
	var data = db.recentDeposits();

	var expenses = db.recentExpenses();

	for (var i = 0; i < expenses.length; i++) {
		data.push(expenses[i]);
	}
	data.sort(function(a, b) {
		return Date.parse(a.date) > Date.parse(b.date);
	});

	var transTable = Ti.UI.createTableView({
		title : 'Recent',
		height : '100%',
	});

	win.add(transTable);

	var tableCustomRows = [];

	for (var i = 0; i < data.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : '70',
			data : data[i]
		});

		if (i % 2 == 0)
			row.backgroundColor = '#999';
		else
			row.backgroundColor = '#777';
		var isDeposit = (data[i].title == 'Deposit');
		// if (data[i].title == 'Deposit') {

		var leftPart = Ti.UI.createView({
			layout : 'vertical',
			left : '0',
			width : '50%'
		});
		leftPart.add(Ti.UI.createLabel({
			text : isDeposit ? 'Deposit' : 'Expense',
			left : '5%',
			color : isDeposit ? '#006f00' : '#d71527'
		}));
		leftPart.add(Ti.UI.createLabel({
			text : data[i].amount + ' JD',
			left : '5%'
		}));
		row.add(leftPart);

		var rightPart = Ti.UI.createView({
			layout : 'vertical',
			right : '0',
			width : '50%'
		});

		var obj = isDeposit ? db.getSource(data[i].sourceId) : db.getCategory(data[i].categoryId);

		rightPart.add(Ti.UI.createLabel({
			text : obj.title,
			right : '5%',
			color : 'black'
		}));

		rightPart.add(Ti.UI.createLabel({
			text : data[i].date,
			right : '5%'
		}))

		row.add(rightPart);
		tableCustomRows.push(row);
	}

	transTable.data = tableCustomRows;

	transTable.addEventListener('click', function(e) {

		var obj = e.rowData.data;
		if (obj.title == 'Deposit') {
			var DepositDetailWindow = require('ui/common/transactions/DepositDetails');
			var detailedDeposit = new DepositDetailWindow('Deposit', _container, obj);
			_container.open(detailedDeposit);
		} else {
			var ExpenseDetailWindow = require('ui/common/transactions/ExpenseDetails');
			var detailedExpense = new ExpenseDetailWindow('Expense', _container, obj);
			_container.open(detailedExpense);
		}
	});

	win.add(transTable);

	win.add(Ti.UI.createLabel({
		title : 'test'
	}))
	return win;

};
module.exports = TransactionReport;
