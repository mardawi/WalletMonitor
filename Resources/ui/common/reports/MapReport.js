function MapReport(_title, _container) {

	var win = Ti.UI.createWindow({
		layout : 'vertical',
		backgroundColor : '#ccc',
		title : 'Map Report'
	});

	var dataExp = [];
	var db = require('lib/db');

	var btnLastWeek = Ti.UI.createButton({
		title : 'Last Week',
		width : '85%',
		height : '10%',
	});
	win.add(btnLastWeek);

	btnLastWeek.addEventListener('click', function(e) {
		//TODO: fill Data with last week expenses
	});

	var btnLast30Days = Ti.UI.createButton({
		title : 'Last 30 Days',
		width : '85%',
		height : '10%',
	});
	win.add(btnLast30Days);

	btnLast30Days.addEventListener('click', function(e) {
		//TODO: fill Data with last 30 days Expenses
	});

	var btnLastYear = Ti.UI.createButton({
		title : 'Last Year',
		width : '85%',
		height : '10%',
	});
	win.add(btnLastYear);

	btnLastYear.addEventListener('click', function(e) {
		//TODO: fill data with last year expenses

		var expenses = db.recentExpenses();
		for (var i = 0; i < expenses.length; i++) {
			dataExp.push(Titanium.Map.createAnnotation({
				latitude : expenses[i].latitude,
				longitude : expenses[i].longitude,
				title : expenses[i].address,
				
				pincolor : Titanium.Map.ANNOTATION_GREEN,
				animate : true,
			}));
		}
		mapview.annotations = dataExp;
		win.remove(mapview);
		win.add(mapview);
	});

	var mapview = Titanium.Map.createView({
		mapType : Titanium.Map.STANDARD_TYPE,
		animate : true,
		regionFit : true,
		userLocation : true,
	});
	
	win.add(mapview);

	return win;

};
module.exports = MapReport;
