var categoryWin = function(_title, _container,_data){
	var win = Ti.UI.createWindow({
		title:_title
	});
	var data = _data;
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
