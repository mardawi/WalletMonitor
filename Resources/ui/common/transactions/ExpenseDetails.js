function ExpenseDetails(_title, _container, _expenseObj) {
	_expenseObj.voiceNoteUrl = 'www.example.com/podcast.mp3';
	var win = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		backgroundColor:'#ccc',
		layout:'vertical',
		contentHeight:'auto',
	});
	
	var amountView = Ti.UI.createView({
		layout:'horizantal',
		top:'2%',
		left: 0,
		height: '10%',
		width: '100%'
	});
	win.add(amountView);
	
	amountView.add(Ti.UI.createLabel({
		text : 'Amount:',
		left : '5%',
		top: 0,
		width:'30%',
		color:'black'
	}));
	
	amountView.add(Ti.UI.createLabel({
		left:'35%',
		top: 0,
		width:'35%',
		text:_expenseObj.amount,
		color: 'black'
	}));
	
	var dateView = Ti.UI.createView({
		layout: 'horizantal',
		top: 0,
		left: 0,
		height: '10%',
		width: '100%'
	});
	win.add(dateView);
	
	dateView.add(Ti.UI.createLabel({
		text: 'Date',
		left : '5%',
		top: 0,
		width:'30%',
		color: 'black'
	}));
	
	dateView.add(Ti.UI.createLabel({
		left:'35%',
		top: 0,
		width:'35%',
		text:_expenseObj.date,
		color:'black'
	}));
	
	var descriptionView = Ti.UI.createView({
		layout: 'horizantal',
		top: 0,
		left: 0,
		height: '20%',
		width: '100%'
	});
	win.add(descriptionView);
	
	descriptionView.add(Ti.UI.createLabel({
		text: 'Description',
		left : '5%',
		top: 0,
		width:'30%',
		color: 'black'
	}));
	
	descriptionView.add(Ti.UI.createTextArea({
		value: _expenseObj.description,
		left:'35%',
		top: 0,
		width:'60%',
		height:'100%',
		color: 'black',
		editable: false
	}));
	
	var addressView = Ti.UI.createView({
		top : 0,
		width : '100%',
		height : '10%',
		layout : 'horizantal'
	});
	win.add(addressView);
	
	addressView.add(Ti.UI.createLabel({
		text:'Location',
		left:'5%',
		top: 0,
		width:'40%',
		color:'black'
	}));
	
	addressView.add(Ti.UI.createLabel({
		text: _expenseObj.address,
		left:'45%',
		top: 0,
	}));
	
	var mediaView = Ti.UI.createView({
		top : 0,
		width : '100%',
		height : '20%',
		layout : 'horizantal'
	});
	win.add(mediaView);
	
	var imgView = Ti.UI.createImageView({
		image:_expenseObj.photoUrl==''?'http://www.maynardiowa.org/No%20Photo%20Available.jpg':_expenseObj.photoUrl,
		top:0,
		left:'5%',
		width:'45%',
		height:'100%'
	});
	mediaView.add(imgView);
	
	var audioPlayer = Ti.Media.createAudioPlayer({ 
    url: _expenseObj.voiceNoteUrl,
    allowBackground: true
	});
	
	var playStop = Ti.UI.createButton({
		top:0,
		width: '45%',
		left:'50%',
		height:'100%',
		title:_expenseObj.voiceNoteUrl==''?'No voice note':'Play'
	});
	mediaView.add(playStop);
	// mediaView.add(player);
	
	return win;

};
module.exports = ExpenseDetails; 