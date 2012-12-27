function CashFlow(_title) {

var win = Ti.UI.createWindow({
	title:_title,
	backgorundColor:'#ccc'
});

var chartView = Ti.UI.createWebView({
	width: Ti.Platform.displayCaps.getPlatformWidth,
   	height: Ti.Platform.displayCaps.getPlatformHeight,
   	top: 0,
   	url: 'chart.html'
});

win.add(chartView);

return win;
};
module.exports = CashFlow;