function configCategories(_title, _container) {
	var db = require('lib/db');
	
	var win = Ti.UI.createWindow({
		title:_title,
		backgroundColor:'white'
	});
	var data = db.getCategories();
	
	var catgTable = Ti.UI.createTableView({
		data:data
	});
	
	var populate = function(){
   			data = db.getCategories();
   			catgTable.data = data;
   			catgTable.appendRow({title:'Add New Row'});
   	};

	populate();
	
	catgTable.addEventListener('click', function(e){
		if(e.index == data.length){
			var dailog = require('ui/common/config/addCategory');
			var addCategory = new dailog('Add Category',win);
			_container.open(addCategory);
		}
		else{
			var dailog = require('ui/common/config/editCategory');
			var editCategory = new dailog('Edit Category',win,e.rowData.title,e.rowData.id);
			_container.open(editCategory);
		}
	});
	
	
   	
   	Ti.App.addEventListener('databaseUpdated', function(e){
   		populate();
   	});
   	
   		
	win.add(catgTable);
	return win;
	
}
module.exports = configCategories;
