var categoryWin = function(_title, _containerWin,containerTab){
	var db = require('lib/db');
	
	var win = Ti.UI.createWindow({
		title:_title
	});
	var data = db.getCategories();
	var catgTable = Ti.UI.createTableView({
		data:data
	});
	
	var populate = function(){
   			data = db.getCategories();
   			catgTable.appendRow({title:'Add New Row'})
   	};

	populate();
	
	catgTable.addEventListener('click', function(e){
		if(e.index == data.length){
			var dailog = require('ui/common/transactions/addEditTrans/AddItem')
			var addCategory = new dailog('Category',win);
			containerTab.open(addCategory);
		}
		else{
			_containerWin.selectedCatg = e.rowData
		
		
		
		Ti.App.fireEvent('selectCategory');
		win.close();
		}
	});
	
	
   	
   	Ti.App.addEventListener('databaseUpdated', function(e){
   		
   		populate();
   	});
   		
	win.add(catgTable);
	return win;
};

module.exports = categoryWin;
