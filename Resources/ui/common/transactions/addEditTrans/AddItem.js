function AddItem(_title, _container) {

	var win = Ti.UI.createWindow({
		width:'100%',
		height:'100%',
		backgroundColor:'#ccc',
		layout:'vertical'
	});
	

	var label = Ti.UI.createLabel({
		text: 'Add ' + _title,
		top: '10%'
	})
	win.add(label);
	
	var itemName = Ti.UI.createTextField({
		hintText: 'Enter ' + _title,
		top: '3%',
		width:'50%',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	win.add(itemName);
	
	
	var okBtn = Ti.UI.createButton({
		title: 'Ok',
		width: '50%',
		top:'5%'
	});
	win.add(okBtn);
	
	okBtn.addEventListener('click', function(){
		_container.itemValue = itemName.value;
	})
	
	return win;

};
module.exports = AddItem;
