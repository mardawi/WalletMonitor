function editCategory(_title, _container,_data,_id) {
	var db = require('lib/db');
	
	var win = Ti.UI.createWindow({
		title:_title,
		backgroundColor:'#ccc'
	});
	
	var self = Ti.UI.createView({
		top:0,
		height:"100%",
	});
	
	var label = Ti.UI.createLabel({
		text:"Category name",
		top:15,
		left:5,
		color:"black",
	})
	
	var textfeild = Ti.UI.createTextField({
		value:_data,
		top:10,
		width:150,
		left:150
	});
	
	var savebtn = Ti.UI.createButton({
		title:"save",
		top:70,
		left:50,
		width:100,
	});
	
	var deletbtn = Ti.UI.createButton({
		title:"delet",
		top:70,
		left:170,
		width:100,
	});
	
	savebtn.addEventListener("click",function(){
		db.editCategory(_id,textfeild.value);
	});
	
	deletbtn.addEventListener("click",function(){
		db.deleteCategory(_id);
	});
	
	Ti.App.addEventListener('databaseUpdated', function(e){
   		win.close();
   	});
	
	self.add(savebtn);
	self.add(deletbtn);
	self.add(textfeild);
	self.add(label);
	win.add(self);
	return win;
}
module.exports = editCategory;