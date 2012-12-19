var categoryWin = function(_title, _container){
	var win = Ti.UI.createWindow({
		title:_title
	});
	var data = [{title:"Category 1"},{title:"Category 2"},{title:"Category 3"},{title:"Category 4"}
	,{title:"Category 5"},{title:"Category 6"},{title:"Add Category"}];
	var catgTable = Ti.UI.createTableView({
		data:data
	});
	
	catgTable.addEventListener('click', function(e){
		_container.selectedCatg = e.rowData
		Ti.App.fireEvent('selectCategory');
		win.close();
	});

	win.add(catgTable);
	return win;
};

module.exports = categoryWin;
