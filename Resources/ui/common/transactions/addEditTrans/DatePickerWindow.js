function DatePickerWindow(_title, _container) {

	var win = Ti.UI.createWindow({

	});

	var minDate = new Date();
	minDate.setFullYear(2009);
	minDate.setMonth(0);
	minDate.setDate(1);

	var maxDate = new Date();
	maxDate.setFullYear(2009);
	maxDate.setMonth(11);
	maxDate.setDate(31);

	var value = new Date();

	var picker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE,
		minDate : minDate,
		maxDate : maxDate,
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
