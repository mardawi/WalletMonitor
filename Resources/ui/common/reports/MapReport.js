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
		var lastWeek = new Date();
		lastWeek.setDate(0);
		var expenses = db.getExpensesIncluded(lastWeek, new Date());
		fill(expenses);
	});

	var btnLast30Days = Ti.UI.createButton({
		title : 'Last 30 Days',
		width : '85%',
		height : '10%',
	});
	win.add(btnLast30Days);

	btnLast30Days.addEventListener('click', function(e) {
		var lastMonth = new Date();
		lastMonth.setMonth((lastMonth.getMonth - 1 < 0) ? 0 : lastMonth.getMonth - 1);
		var expenses = db.getExpensesIncluded(lastMonth, new Date());
		fill(expenses);
	});

	var btnLastYear = Ti.UI.createButton({
		title : 'Last Year',
		width : '85%',
		height : '10%',
	});
	win.add(btnLastYear);

	btnLastYear.addEventListener('click', function(e) {

		var lastYear = new Date();
		lastYear.setYear(lastYear.getYear() - 1);
		var expenses = db.getExpensesIncluded(lastYear, new Date());
		// for (var i = 0; i < expenses.length; i++) {
		// dataExp.push(Titanium.Map.createAnnotation({
		// latitude : expenses[i].latitude,
		// longitude : expenses[i].longitude,
		// title : expenses[i].address,
		//
		// pincolor : Titanium.Map.ANNOTATION_GREEN,
		// animate : true,
		// }));
		// }
		// mapview.annotations = dataExp;
		// win.remove(mapview);
		// win.add(mapview);
		fill(expenses);
	});

	var fill = function(expenses) {
		dataExp = [];
		mapview.annotations = [];
		win.remove(mapview);
		win.add(mapview);
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
	}
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
