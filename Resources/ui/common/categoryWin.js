var categoryWin = function(_title, _containerWin,containerTab){
	var db = require('lib/db');
	
	var win = Ti.UI.createWindow({
		title:_title,
		backgroundColor:'#ccc'
	});
	var data = db.getCategories();
	var catgTable = Ti.UI.createTableView({
		data:data,
		editable:true,
		
		backgroundColor:'#ccc'
	});
	
	var populate = function(){
			if (catgTable.data.length > 0) {
    			for (var i = catgTable.data[0].rows.length-1; i >= 0; i--) {
        			catgTable.deleteRow(i);
    			}
			}
   			data = db.getCategories();
   			catgTable.setData(data);
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
	
	catgTable.addEventListener('delete', function(e){
		db.deleteCategory(e.source.id);
	});
	
	Ti.App.addEventListener('databaseUpdated', function(e){
		populate();
   	});
   		
	win.add(catgTable);
	return win;
};

module.exports = categoryWin;
