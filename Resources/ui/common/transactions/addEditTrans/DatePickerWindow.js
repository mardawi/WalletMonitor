function DatePickerWindow(_title, _container) {

	var win = Ti.UI.createWindow({

	});

	var value = new Date();
	
	var minDate = new Date();
	minDate.setFullYear(value.getFullYear()-1);
	minDate.setMonth(1);
	minDate.setDate(1);

	

	var picker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : minDate,
		maxDate : value,
		value : value
	});
	picker.selectionIndicator = true;

	win.add(picker);

	picker.addEventListener('change', function(e) {
		_container.dateValue = e.value;
		Ti.App.fireEvent('DateChanged');
	});

	return win;

};
module.exports = DatePickerWindow;
