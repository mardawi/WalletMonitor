function ExpensesEdAd(_title,_container) {
	var db = require('lib/db');
	var Catgdata = db.getCategories();
	
	var expensesWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		layout:'vertical',
		backgroundColor : '#ccc'
	});
	
	expensesWin.dateValue = new Date();
	
	
	var currentSessionMode = Titanium.Media.audioSessionMode;
	var recording = Ti.Media.createAudioRecorder();
	
	recording.compression = Ti.Media.AUDIO_FORMAT_ULAW;
	recording.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;
	
	var rec;
	var sound;
	
	
	
	var amountTF = Ti.UI.createTextField({
		keyboardType:Ti.UI.KEYBOARD_DECIMAL_PAD,
		width:'90%',
		top:'2%',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		hintText:'Set Amount'
	});
	
	// var fullDateTime = new Date();
	// fullDateTime.getFullYear();
	// fullDateTime.getMonth();
	// fullDateTime.getDay();
	// fullDateTime.getHours();
	// fullDateTime.getMinutes();
	
	var dateValue = Ti.UI.createTextField({
		hintText:String.formatDate(new Date()),
		enabled: false,
		width:'90%',
		top:'2%',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	dateValue.addEventListener('click', function(e){
		var DatePickerWindow = require('ui/common/transactions/addEditTrans/DatePickerWindow');
		var dateWindow = new DatePickerWindow('select date', expensesWin);
		_container.open(dateWindow);
	});
	
	// var setDate = Ti.UI.createButton({
		// width:'20%',
		// left:'80%',
		// title:'Set'
	// });
	
	// setDate.addEventListener('click', function(event){
		// var DatePickerWindow = require('ui/common/transactions/addEditTrans/DatePickerWindow');
		// var dateWindow = new DatePickerWindow('select date', expensesWin);
		// _container.open(dateWindow);
	// });
	
	Ti.App.addEventListener('DateChanged', function(e){
		dateValue.hintText = expensesWin.dateValue
		// dateValue.hintText = String.formatDate(expensesWin.dateValue);
	});
	
	// dateValue.add(setDate);
	
	var setCatg = Ti.UI.createButton({
		title:'Set Category',
		// enabled: false,
		// borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		width:'90%',
		top:'2%'
	});
	
	setCatg.addEventListener('click', function(e){
		var categoryWin = require('ui/common/categoryWin');
		var CategoryWin = new categoryWin('Category',expensesWin,_container);
		_container.open(CategoryWin);
	});
	
	Ti.App.addEventListener('selectCategory', function(e){
		setCatg.title = expensesWin.selectedCatg.title;
	});
	
	var descriptionTA = Ti.UI.createTextArea({
		value:'Set Description',
		width:'90%',
		height:'15%',
		top:'2%',
		borderColor:'black',
		borderRadius:5
	});
	
	descriptionTA._hintText = descriptionTA.value;
 
	descriptionTA.addEventListener('focus',function(e){
    	if(e.source.value == e.source._hintText){
        	e.source.value = "";
    	}
	});
	descriptionTA.addEventListener('blur',function(e){
    	if(e.source.value==""){
        	e.source.value = e.source._hintText;
    	}
	});
	
	var tagsTF = Ti.UI.createTextArea({
		value:'Set Tags',
		borderColor:'black',
		borderRadius:5,
		width:'90%',
		height:'15%',
		top:'2%'
	});
	
	tagsTF._hintText = tagsTF.value;
 
	tagsTF.addEventListener('focus',function(e){
    	if(e.source.value == e.source._hintText){
        	e.source.value = "";
    	}
	});
	tagsTF.addEventListener('blur',function(e){
    	if(e.source.value==""){
        	e.source.value = e.source._hintText;
    	}
	});
		
	// var tagsTF = Ti.UI.createTextField({
		// enabled: false,
		// borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		// hintText:'Tags',
		// width:'90%',
		// top:'2%'
	// });
// 	
	// tagsTF.addEventListener('click', function(e){
		// var tagsWin = require('ui/common/tagsWin');
		// var TagsWin = new tagsWin('Tag',expensesWin,_container);
		// _container.open(TagsWin);
	// });
	
	
	// var topView = Ti.UI.createView({
		// top:'0%',
		// left:'0%',
		// width:'100%',
		// height:'60%'
	// });
// 	
	// var row1 = Ti.UI.createTableViewRow({
	    // height:'10%',
	    // selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	// });
// 	
	// var amountLBL = Ti.UI.createLabel({
		// text : 'Amount:',
		// left : '5%',
		// width:'30%'
	// });
// 	
	// var amountTF = Ti.UI.createTextField({
		// left:'35%',
		// width:'35%',
		// height:'90%',
		// hintText:'Amount'
	// });
// 	
	// row1.add(amountLBL);
	// row1.add(amountTF);
// 	
	// var row2 = Ti.UI.createTableViewRow({
	    // height:'10%',
	    // selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	// });
// 	
	// var dateLBL = Ti.UI.createLabel({
		// text : 'Date:',
		// width:'30%',
		// left : '5%'
	// });
// 	
	// var dateValue = Ti.UI.createTextField({
		// hintText:String.formatDate(new Date()),
		// editable:false,
		// left:'35%',
		// width:'35%',
		// height:'90%',
		// borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	// });
// 	
	// var setDate = Ti.UI.createButton({
		// width:'20%',
		// left:'75%',
		// title:'Set'
	// });
// 	
	// setDate.addEventListener('click', function(event){
		// var DatePickerWindow = require('ui/common/transactions/addEditTrans/DatePickerWindow');
		// var dateWindow = new DatePickerWindow('select date', expensesWin);
		// _container.open(dateWindow);
	// });
// 	
	// Ti.App.addEventListener('DateChanged', function(e){
		// dateValue.hintText = String.formatDate(expensesWin.dateValue);
	// });
// 	
	// row2.add(dateLBL);
	// row2.add(dateValue);
	// row2.add(setDate);
// 	
	// var row3 = Ti.UI.createTableViewRow({
	    // height:'10%',
	    // selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	// });
// 	
	// var categoryLBL = Ti.UI.createLabel({
		// text : 'Category:',
		// width:'30%',
		// left : '5%'
	// });
// 	
	// var setCatgBTN = Ti.UI.createButton({
		// title:'Set Category',
		// left:'35%',
		// width:'35%'
	// });
// 	
	// setCatgBTN.addEventListener('click', function(e){
		// var categoryWin = require('ui/common/categoryWin');
		// var CategoryWin = new categoryWin('Category',expensesWin,_container);
		// _container.open(CategoryWin);
	// });
// 	
	// Ti.App.addEventListener('selectCategory', function(e){
		// setCatgBTN.title = expensesWin.selectedCatg.title;
	// });
// 	
	// row3.add(categoryLBL);
	// row3.add(setCatgBTN);
// 	
	// var row4 = Ti.UI.createTableViewRow({
	    // height:'25%',
	    // selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	// });
// 	
	// var descriptionLBL = Ti.UI.createLabel({
		// text : 'Description:',
		// width:'30%',
		// top : '5%',
		// left : '5%'
	// });
// 	
	// var descriptionTA = Ti.UI.createTextArea({
		// left:'37%',
		// width:'60%',
		// height:'70%',
		// borderColor:'black',
		// borderRadius:5
	// });
// 	
	// row4.add(descriptionLBL);
	// row4.add(descriptionTA);
// 	
	// var row5 = Ti.UI.createTableViewRow({
		// height:'10%',
	    // selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	// });
// 	
	// var tagsBTN = Ti.UI.createButton({
		// title:'Add Tags',
		// left:'70%',
		// width:'25%'
	// });
// 	
	// var tagsLBL = Ti.UI.createLabel({
		// hintText:'Tags',
		// width:'65%',
		// left : '5%'
	// });
// 	
	// tagsBTN.addEventListener('click', function(e){
		// var tagsWin = require('ui/common/tagsWin');
		// var TagsWin = new tagsWin('Tag',expensesWin,_container);
		// _container.open(TagsWin);
	// });
// 	
	// row5.add(tagsLBL);
	// row5.add(tagsBTN);
// 	
	// var data = [row1, row2, row3, row4, row5];
	// var table = Ti.UI.createTableView({
	    // data:data,
	    // scrollable:false,
	    // style: Ti.UI.iPhone.TableViewStyle.GROUPED
	// });

	var bottomView = Ti.UI.createView({
		width : '100%',
		height:'45%',
		layout : 'horizantal'
	});
	
	var addPhoto = Ti.UI.createButton({
		title:'Add Photo',
		top:'5%',
		left:'5%',
		width:'40%',
		height:'30%'
	});
	var file = null;
	
	addPhoto.addEventListener('click', function(e){
			if(Ti.Media.isCameraSupported){
				Ti.Media.showCamera({
					success: function(e){
						var getTime = new Date();
						file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'/photos/' + getTime.getHours() + ':' + getTime.getMinutes() + ':' + getTime.getMilliseconds() + '.jpg');
					}
				})
			}else{
				Ti.Media.openPhotoGallery({
					success:function(e){
						// file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'/photos/' + getTime.getHours() + ':' + getTime.getMinutes() + ':' + getTime.getMilliseconds() + '.jpg');
					}
				});
			}
	});
	
	var recVoice = Ti.UI.createButton({
		title:'Voice memo',
		top:'5%',
		left:'55%',
		width:'40%',
		height:'30%'
	});
	
	recVoice.addEventListener('click', function(){
		
		if (recording.recording)
		{
			rec = recording.stop();
			recVoice.title = "Start Recording";
			// b2.show();
			// pause.hide();
			// clearInterval(timer);
			Ti.Media.stopMicrophoneMonitor();
		}
		else
		{
			if (!Ti.Media.canRecord) {
				Ti.UI.createAlertDialog({
					title:'Error!',
					message:'No audio recording hardware is currently connected.'
				}).show();
				return;
			}
			recVoice.title = "Stop Recording";
			Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
			recording.start();
			// pause.show();
			Ti.Media.startMicrophoneMonitor();
			// duration = 0;
		}
		
		// var sound_record = require('ui/common/record');
		// var Sound_Record = new sound_record('Record',expensesWin,_container);
		// _container.open(Sound_Record);
	});
	
	var locLBL = Ti.UI.createLabel({
		text:'Location',
		top:'45%',
		left:'55%',
		width:'40%'
	});
	
	var locSW = Ti.UI.createSwitch({
		value:false,
		top:'45%',
		left:'5%'
	});
	
	var setLatitude = 0;
	var setLongitude = 0;
			
	locSW.addEventListener('change', function(e){
		if(locSW.value == true){
			Ti.Geolocation.purpose = "Recieve User Location";
			Ti.Geolocation.getCurrentPosition(function(e){
				if(e.error){
					alert('Trun Location ON');
					return;
				}
				setLatitude = e.coords.latitude;
				setLongitude = e.coords.longitude;
				Ti.API.info('latitude: ' + setLatitude + 'longitude: ' + setLongitude);
			});
		}else{
			setLatitude = 0;
			setLongitude = 0;
		}
	});
	
	// var saveBTN = Ti.UI.createButton({
		// title:'Save',
		// top:'65%',
		// width:'90%'
// 		
	// });
// 	
	// saveBTN.addEventListener('click', function(e){
		// splitTags = tagsTF.value;
		// arrayTags = [];
		// arrayTags = splitTags.split(",");
		// db.addExpense(amountTF.value,expensesWin.dateValue,expensesWin.selectedCatg.id,descriptionTA.value,setLatitude,setLongitude,'',file,expensesWin.Record,arrayTags/*expensesWin.AllTags*/);
		// expensesWin.close();
	// });
	
	
	var saveNav = Ti.UI.createButton({
		title:'Save'
	});
	
	saveNav.addEventListener('click', function(e){
		var getTime = new Date();
		var memo = (Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'/records/' + getTime.getHours() + ':' + getTime.getMinutes() + ':' + getTime.getMilliseconds() + '.wav'));
		memo.write(rec);
		
		textTags = tagsTF.value;
		splitTags = [];
		splitTags = textTags.split(",");
		db.addExpense(amountTF.value,String.formatDate(expensesWin.dateValue) + ' ' + String.formatTime(expensesWin.dateValue),expensesWin.selectedCatg.id,descriptionTA.value,setLatitude,setLongitude,'',file.nativePath,memo.nativePath/*expensesWin.Record*/,splitTags/*expensesWin.AllTags*/);
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
	
	if(Ti.Platform.osname == 'android'){
		// addPhoto.height == '20%';
		// recVoice.height == '20%';
		// locSW.top == '35%';
		// locLBL.top == '35%';
		// saveNav.top == '45%';
		expensesWin.add(saveNav);
	}else{
		expensesWin.setRightNavButton(saveNav);
	}
	
	expensesWin.addEventListener('click', function(e){
		amountTF.blur();
		descriptionTA.blur();
		tagsTF.blur();
	});
	return expensesWin;

};
module.exports = ExpensesEdAd; 
 