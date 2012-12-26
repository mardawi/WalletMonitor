function CategoryReport(_title, _container) {

	var win = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : '#ccc',
		title : 'Category Report'
	});

	var picker = Ti.UI.createPicker({
		top : 50
	});

	var db = require('lib/db');
	var categories = db.getCategories();

	var data = [];

	for (var i = 0; i < categories.length; i++) {
		data.push(Ti.UI.createPickerRow({
			title : categories[i].title,
			category : categories[i]
		}));
	}

	picker.addEventListener('change', function(e) {
		Ti.UI.createAlertDialog({
			message : e.row.category.title + ' selected'
		}).show();
	});

	picker.add(data);
	picker.selectionIndicator = true;

	win.add(picker);

	var scrollView = Ti.UI.createScrollView({
		scrollType : 'vertical',
		width : '90%',
		top : '2%'
	});

	win.add(scrollView);

	var dataExp = db.recentExpenses();

	var transTable = Ti.UI.createTableView({
		title : 'Recent',
		height : '100%',
	});

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
			text : dataExp[i].date,
			right : '5%'
		}))

		row.add(rightPart);
		tableCustomRows.push(row);
	};

	transTable.data = tableCustomRows;
	scrollView.add(transTable);

	transTable.addEventListener('click', function(e) {

		var obj = e.rowData.data;

		var ExpenseDetailWindow = require('ui/common/transactions/ExpenseDetails');
		var detailedExpense = new ExpenseDetailWindow('Expense', _container, obj);
		_container.open(detailedExpense);

	});

	return win;
};
module.exports = CategoryReport;
