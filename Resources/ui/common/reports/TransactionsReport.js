function TransactionReport(_title, _container) {

var win = Ti.UI.createWindow({
	title: _title,
	width: '100%',
	height:'100%',
	backgroundColor: 'blue'
});

var data = [{id:1, amount:30, categoryId: 1, description:'this is an Expense description'}]

var transTable = Ti.UI.createTableView({
	title: 'Recent'
});

win.add(transTable);


win.add(Ti.UI.createLabel({
	title: 'test'
}))
return win;

};
module.exports = TransactionReport;