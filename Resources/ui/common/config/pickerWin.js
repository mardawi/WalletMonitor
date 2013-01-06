function pickerWin(_title, _container) {

	var PicWin = Ti.UI.createWindow({
		title : 'Set Date',
		backgroundColor : '#ccc',
		layout : 'horizontal'
	});

	var picker = Ti.UI.createPicker({
		top : '10%'
	});
	
	var pickerValues = [
				Titanium.UI.createPickerRow({title:'',custom_item : ''}),
				Titanium.UI.createPickerRow({title:'Week',custom_item : 'w'}),
				Titanium.UI.createPickerRow({title:'Month',custom_item : 'm'}),
				Titanium.UI.createPickerRow({title:'Year',custom_item : 'y'})
			];
			
	picker.add(pickerValues);
	picker.selectionIndicator = true;

	PicWin.add(picker);

	picker.addEventListener('change', function(e) {
		if(e.row.title=='Month'){
			Ti.App.Properties.setString("DatePicker",'Month');
			Ti.App.fireEvent("TimeChange");
		}
		if(e.row.title=='Week'){
			Ti.App.Properties.setString("DatePicker",'Week');
			Ti.App.fireEvent("TimeChange");
		}
		if(e.row.title=='Year'){
			Ti.App.Properties.setString("DatePicker",'Year');
			Ti.App.fireEvent("TimeChange");
		}
		_container.setperiod = e.row.title;
		Ti.App.fireEvent('DateChanged');
	});

	return PicWin;

};
module.exports = pickerWin;