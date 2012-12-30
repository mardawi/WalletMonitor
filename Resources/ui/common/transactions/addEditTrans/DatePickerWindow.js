function DatePickerWindow(_title, _container) {

	var win = Ti.UI.createWindow({
		title : 'Set Date',
		backgroundColor : '#ccc',
		layout : 'horizontal'
	});

	var isAndroid = Ti.Platform.osname == 'android';

	var value = new Date();
	var minDate = new Date();
	minDate.setFullYear(value.getFullYear() - 1);
	minDate.setMonth(1);
	minDate.setDate(1);

	var picker = Ti.UI.createPicker({
		type : isAndroid ? Ti.UI.PICKER_TYPE_DATE : Ti.UI.PICKER_TYPE_DATE_AND_TIME,
		minDate : minDate,
		maxDate : value,
		value : value,
		top : '10%'
	});
	picker.selectionIndicator = true;

	win.add(picker);

	if (isAndroid) {
		var androidTimePicker = Ti.UI.createPicker({
			type : Ti.UI.PICKER_TYPE_TIME,
			width : '50%',
			top : '10%'
		});

		picker.width = '50%';
		win.add(androidTimePicker);

		androidTimePicker.addEventListener('change', function(e) {
			_container.timeValue = e.value;
			Ti.App.fireEvent('TimeChanged');
		});
	}

	picker.addEventListener('change', function(e) {
		_container.dateValue = e.value;
		Ti.App.fireEvent('DateChanged');
	});

	return win;

};
module.exports = DatePickerWindow;
