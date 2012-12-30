function ExpensesEdAd(_title, _container) {
	var db = require('lib/db');

	var Catgdata = db.getCategories();
	var isAndroid = Ti.Platform.osname == 'android'

	var expensesWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		layout : 'vertical',
		backgroundColor : '#ccc'
	});

	expensesWin.dateValue = new Date();

	if (!isAndroid) {
		var currentSessionMode = Titanium.Media.audioSessionMode;
		var recording = Ti.Media.createAudioRecorder();
		recording.compression = Ti.Media.AUDIO_FORMAT_ULAW;
		recording.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;
	}

	var rec;
	var sound;

	var amountTF = Ti.UI.createTextField({
		keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
		width : '90%',
		top : '2%',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText : 'Set Amount'
	});

	var dateValue = Ti.UI.createButton({
		title : String.formatDate(new Date()) + ' ' + String.formatTime(new Date()),
		width : '90%',
		top : '2%',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	dateValue.addEventListener('click', function(e) {
		var DatePickerWindow = require('ui/common/transactions/addEditTrans/DatePickerWindow');
		var dateWindow = new DatePickerWindow('select date', expensesWin);
		_container.open(dateWindow);
	});

	Ti.App.addEventListener('DateChanged', function(e) {
		dateValue.title = isAndroid ? String.formatDate(expensesWin.dateValue) + ' ' + String.formatTime(expensesWin.timeValue) : String.formatDate(expensesWin.dateValue) + ' ' + String.formatTime(expensesWin.dateValue);
	});

	var setCatg = Ti.UI.createButton({
		title : 'Set Category',
		width : '90%',
		top : '2%'
	});

	setCatg.addEventListener('click', function(e) {
		var categoryWin = require('ui/common/categoryWin');
		var CategoryWin = new categoryWin('Category', expensesWin, _container);
		_container.open(CategoryWin);
	});

	Ti.App.addEventListener('selectCategory', function(e) {
		setCatg.title = expensesWin.selectedCatg.title;
	});

	var descriptionTA = Ti.UI.createTextArea({
		value : 'Set Description',
		width : '90%',
		height : '15%',
		top : '2%',
		borderColor : 'black',
		borderRadius : 5
	});

	descriptionTA._hintText = descriptionTA.value;

	descriptionTA.addEventListener('focus', function(e) {
		if (e.source.value == e.source._hintText) {
			e.source.value = "";
		}
	});
	descriptionTA.addEventListener('blur', function(e) {
		if (e.source.value == "") {
			e.source.value = e.source._hintText;
		}
	});

	var tagsTF = Ti.UI.createTextArea({
		value : 'Set Tags',
		borderColor : 'black',
		borderRadius : 5,
		width : '90%',
		height : '15%',
		top : '2%'
	});

	tagsTF._hintText = tagsTF.value;

	tagsTF.addEventListener('focus', function(e) {
		if (e.source.value == e.source._hintText) {
			e.source.value = "";
		}
	});
	tagsTF.addEventListener('blur', function(e) {
		if (e.source.value == "") {
			e.source.value = e.source._hintText;
		}
	});

	var bottomView = Ti.UI.createView({
		width : '100%',
		height : '45%',
		layout : 'horizantal'
	});

	var addPhoto = Ti.UI.createButton({
		title : 'Add Photo',
		top : '5%',
		left : '5%',
		width : '40%',
		height : '30%'
	});
	var file = null;

	addPhoto.addEventListener('click', function(e) {
		if (Ti.Media.isCameraSupported) {
			Ti.Media.showCamera({
				success : function(e) {
					var getTime = new Date();
					file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '/photos/' + getTime.getHours() + ':' + getTime.getMinutes() + ':' + getTime.getMilliseconds() + '.jpg');
				}
			})
		} else {
			Ti.Media.openPhotoGallery({
				success : function(e) {
				}
			});
		}
	});

	var recVoice = Ti.UI.createButton({
		title : 'Voice memo',
		top : '5%',
		left : '55%',
		width : '40%',
		height : '30%'
	});

	recVoice.addEventListener('click', function() {

		if (recording.recording) {
			rec = recording.stop();
			recVoice.title = "Start Recording";
			Ti.Media.stopMicrophoneMonitor();
		} else {
			if (!Ti.Media.canRecord) {
				Ti.UI.createAlertDialog({
					title : 'Error!',
					message : 'No audio recording hardware is currently connected.'
				}).show();
				return;
			}
			recVoice.title = "Stop Recording";
			Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
			recording.start();
			Ti.Media.startMicrophoneMonitor();
		}

	});

	var locLBL = Ti.UI.createLabel({
		text : 'Location',
		top : '45%',
		left : '55%',
		width : '40%'
	});

	var locSW = Ti.UI.createSwitch({
		value : false,
		top : '45%',
		left : '5%'
	});

	var setLatitude = 0;
	var setLongitude = 0;

	locSW.addEventListener('change', function(e) {
		if (locSW.value == true) {
			Ti.Geolocation.purpose = "Recieve User Location";
			Ti.Geolocation.getCurrentPosition(function(e) {
				if (e.error) {
					alert('Trun Location ON');
					return;
				}
				setLatitude = e.coords.latitude;
				setLongitude = e.coords.longitude;
				Ti.API.info('latitude: ' + setLatitude + 'longitude: ' + setLongitude);
			});
		} else {
			setLatitude = 0;
			setLongitude = 0;
		}
	});

	var saveNav = Ti.UI.createButton({
		title : 'Save'
	});

	saveNav.addEventListener('click', function(e) {
		var getTime = new Date();
		var memo = (Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, '/records/' + getTime.getHours() + ':' + getTime.getMinutes() + ':' + getTime.getMilliseconds() + '.wav'));
		memo.write(rec);

		textTags = tagsTF.value;
		splitTags = [];
		splitTags = textTags.split(",");
		db.addExpense(amountTF.value, String.formatDate(expensesWin.dateValue), isAndroid ? String.formatTime(expensesWin.timeValue) : String.formatTime(expensesWin.dateValue), expensesWin.selectedCatg.id, descriptionTA.value, setLatitude, setLongitude, '', file.nativePath, memo.nativePath/*expensesWin.Record*/, splitTags/*expensesWin.AllTags*/);
		expensesWin.close();
	});

	bottomView.add(addPhoto);
	bottomView.add(recVoice);
	bottomView.add(locSW);
	bottomView.add(locLBL);
	// bottomView.add(saveBTN);

	// expensesWin.add(table);
	expensesWin.add(amountTF);
	expensesWin.add(setCatg);
	expensesWin.add(descriptionTA);
	expensesWin.add(tagsTF);
	expensesWin.add(dateValue);
	expensesWin.add(bottomView);

	if (Ti.Platform.osname == 'android') {
		addPhoto.height = '20%';
		recVoice.height = '20%';
		locSW.top = '35%';
		locLBL.top = '35%';
		saveNav.top = '65%';
		saveNav.width = '45%';
		bottomView.add(saveNav);
	} else {
		expensesWin.setRightNavButton(saveNav);
	}

	expensesWin.addEventListener('click', function(e) {
		amountTF.blur();
		descriptionTA.blur();
		tagsTF.blur();
	});
	return expensesWin;

};
module.exports = ExpensesEdAd;
