function TransactionReport(_title, _container) {

var win = Ti.UI.createWindow({
	title: _title,
	width: '100%',
	height:'100%',
	backgroundColor: '#ccc'
});


var db = require('lib/db');
var data = db.recentDeposits();

var transTable = Ti.UI.createTableView({
	title: 'Recent'
});

win.add(transTable);

var tableCustomRows = [];

for(var i=0; i< data.length; i++)
{
	var row = Ti.UI.createTableViewRow();
	if(data[i].title == 'Deposit')
	{
		row.backgroundColor= 'blue';
		var leftPart = Ti.UI.createView({
			layout: 'vertical',
		});
		row.add(Ti.UI.createLabel({
			text:'Expense'
		}));
		row.add(Ti.UI.createLabel({
			text: data[i].amount
		}));
		row.add(leftPart);
	}
	tableCustomRows.push(row);
}

transTable.data = tableCustomRows;

win.add(transTable);


win.add(Ti.UI.createLabel({
	title: 'test'
}))
return win;

};
module.exports = TransactionReport;