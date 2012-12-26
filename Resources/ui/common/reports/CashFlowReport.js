function CashFlow(_title, _container) {

var win = Ti.UI.createWindow({
	title:_title,
	backgorundColor:'#ccc'
});

var chartView = Ti.UI.createWebView({
	width: 320,
   	height: 367,
   	top: 0,
   	url: 'ui/charts/chart.htm'
});

win.add(chartView);

return win;
};
module.exports = CashFlow;