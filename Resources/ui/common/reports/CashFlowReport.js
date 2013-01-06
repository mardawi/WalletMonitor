function CashFlow(_title, _container) {

var win = Ti.UI.createWindow({
	title:_title,
	backgorundColor:'#ccc'
});

var chartView = Ti.UI.createWebView({
	width: 320,
   	height: 367,
   	top: 0,
   	url: 'chart.html'
});

win.add(chartView);
	var db = require('lib/db');
	var somedata = [];
	var days = [];
	var from = new Date();
	var to = new Date();
	from.setMonth(from.getMonth() - 1 < 0 ? 11 : from.getMonth() - 1);
	if(from.getMonth() == 11)
		from.setYear(from.getYear( )- 1);
	Ti.API.info('from = ' + String.formatDate(from));
	var expenses = db.getExpensesIncluded(from, to);

	for (var i = 0; i < expenses.length; i++) {
		somedata.push(parseInt(expenses[i].amount));
	}

chartView.addEventListener('beforeload',function(e){
	
	Ti.API.info('somedata = ' + somedata);
	
	var str = '';
	for(var i=0; i< somedata.length;i++)
	{
		str = str + somedata[i];
		if(i<somedata.length -1)
		str = str + ', ';
	}
	Ti.API.info('str' + str);
	chartView.evalJS("data =[" + str + "];");
});



return win;
};
module.exports = CashFlow;