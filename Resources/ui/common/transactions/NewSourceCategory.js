function TransactionReport(_title, _container) {

var win = Ti.UI.createWindow({
	title: _title,
	width: '100%',
	height:'100%',
	backgroundColor: 'blue'
});

win.add(Ti.UI.createLabel({
	title: 'test'
}))
return win;

};
module.exports = TransactionReport;