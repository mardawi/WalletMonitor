function addCategory(_title, _container) {
	var db = require('lib/db');
	
	
	var win = Ti.UI.createWindow({
		title:_title,
		backgroundColor:'white'
	});
	
	var self = Ti.UI.createView({
		top:0,
		height:"100%",
	});
	
	var addLabel = Ti.UI.createLabel({
		text:"Category name",
		color:"black",
		top:15,
		left:5
	});
	
	var addFeild = Ti.UI.createTextField({
		top:10,
		width:150,
		left:150
	});
	
	var addBtn = Ti.UI.createButton({
		title:"Add",
		top:70,
		width:150
	});
	
	addBtn.addEventListener("click",function(){
		db.addCategory(addFeild.value);
		win.close();
	});
	
	
	self.add(addBtn);
	self.add(addFeild);
	self.add(addLabel);
	win.add(self);
	return win;
}
module.exports = addCategory;