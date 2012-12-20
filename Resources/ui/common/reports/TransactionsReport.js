function TransactionReport(_title, _container) {

	var win = Ti.UI.createWindow({
		title : _title,
		width : '100%',
		height : '100%',
		backgroundColor : '#ccc'
	});

	var db = require('lib/db');
	var data = db.recentDeposits();

	var transTable = Ti.UI.createTableView({
		title : 'Recent',
		height : '100%',
		// width:'100%'
	});

	win.add(transTable);

	var tableCustomRows = [];

	for (var i = 0; i < data.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : '70',
			data : data[i]
		});

		if (data[i].title == 'Deposit') {
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
				text : 'Deposit',
				left : '5%',
				color : '#006f00'
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

			var category = db.getSource(data[i].sourceId);

			rightPart.add(Ti.UI.createLabel({
				text : category.title,
				right : '5%',
				color : 'black'
			}));

			rightPart.add(Ti.UI.createLabel({
				text : data[i].date,
				right : '5%'
			}))

			row.add(rightPart);
		} else {

		}
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
