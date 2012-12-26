function CategoryReport(_title, _container) {

	var win = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : '#ccc',
		title : 'Category Report'
	});

	var isAndroid = (Ti.Platform.osname == 'android');
	var dataExp = [];

	var picker = Ti.UI.createPicker({
		top : 50,
		height : isAndroid ? '15%' : '50%',
		top : '2%',
		width:'90%'
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

		dataExp = db.getTransByCategory(e.row.category.title);
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
	});

	picker.add(data);
	picker.selectionIndicator = true;

	win.add(picker);

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

	return win;
};
module.exports = CategoryReport;
