function AddItem(_title, _container) {

	var win = Ti.UI.createWindow({
		width:'80%',
		height:'60%',
		top: '20%',
		left:'10%',
		backgroundColor:'#ccc',
		layout:'vertical'
	});
	

	var label = Ti.UI.createLabel({
		text: 'Add ' + _title,
		color: 'black',
		top: '10%',
		left:'10%',
		width: '25%'
	})
	win.add(label);
	
	var itemName = Ti.UI.createTextField({
		hintText: 'Enter ' + _title,
		width:'50%',
		// top: '25%'
	});
	win.add(itemName);
	
	var buttonsBar = Ti.UI.createView({
		layout: 'horizantal',
		width: '80%',
		top: '15%'
	})
	// win.add(buttonsBar);
	
	var okBtn = Ti.UI.createButton({
		title: 'Ok',
		width: '50%',
		left:0
	});
	win.add(okBtn);
	
	var cancelBtn = Ti.UI.createButton({
		title:'Cancel',
		width:'50%',
		left: '50%',
	})
	// buttonsBar.add(cancelBtn);
	return win;

};
module.exports = AddItem;
