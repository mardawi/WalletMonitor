var tagsWin = function(_title, _containerWin,containerTab){
	
	var win = Ti.UI.createWindow({
		title:_title,
		layout:'vertical',
		backgroundColor : '#fff'
	});
	
	var allTags = [];
	
	
	var tagsTF = Ti.UI.createTextField({
		hintText:'Add Tag',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		width:'100%',
		height:'15%'
	});
	
	var addTagBTN = Ti.UI.createButton({
		title:'Add',
		left:'70%',
		width:'30%'
	});
	
	tagsTF.add(addTagBTN);
	
	var tagsTable = Ti.UI.createTableView({
		height:'70%',
		editable:true
	});
	
	var saveBTN = Ti.UI.createButton({
		title:'Save',
		width:'50%',
		height:'15%'
	});
	
	addTagBTN.addEventListener('click', function(e){
		tagsTable.appendRow(Ti.UI.createTableViewRow({title:tagsTF.value}));
		allTags.push(tagsTF.value);
		tagsTF.value = '';
		tagsTF.blur();
	});
	
	saveBTN.addEventListener('click', function(e){
		_containerWin.AllTags = allTags;
		win.close();
	});
	
	win.add(tagsTF);
	win.add(tagsTable);
	win.add(saveBTN);
	
	return win;
};

module.exports = tagsWin;