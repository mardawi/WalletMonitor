function record(_title, _containerWin,containerTab) {
	var win = Titanium.UI.createWindow({
		title:_title,
		backgroundColor:'#ccc'
	});
	var currentSessionMode = Titanium.Media.audioSessionMode;
	
	// Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
	var recording = Ti.Media.createAudioRecorder();
	
	recording.compression = Ti.Media.AUDIO_FORMAT_ULAW;
	recording.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;
	
	// Ti.Media.addEventListener('recordinginput', function(e) {
		// Ti.API.info('Input availability changed: '+e.available);
		// if (!e.available && recording.recording) {
			// b1.fireEvent('click', {});
		// }
	// });
	
	var file;
	var timer;
	var sound;
		
	
	var durationLBL = Titanium.UI.createLabel({
		text:'',
		top:'50',
		color:'#999',
		textAlign:'center',
		width:'auto',
		height:'auto'
	});
	
	win.add(durationLBL);
	
	var duration = 0;
	
	function showLevels()
	{
		duration++;
		durationLBL.text = duration;
	}
	
	var b1 = Titanium.UI.createButton({
		title:'Start Recording',
		width:'60%',
		height:'15%',
		top:'10%'
	});
	b1.addEventListener('click', function()
	{
		if (recording.recording)
		{
			file = recording.stop();
			b1.title = "Start Recording";
			b2.show();
			pause.hide();
			clearInterval(timer);
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
			b1.title = "Stop Recording";
			Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAY_AND_RECORD;
			recording.start();
			pause.show();
			Ti.Media.startMicrophoneMonitor();
			duration = 0;
		}
	});
	win.add(b1);
	
	var pause = Titanium.UI.createButton({
		title:'Pause recording',
		width:'60%',
		height:'15%',
		top:'30%'
	});
	win.add(pause);
	pause.hide();
	
	pause.addEventListener('click', function() {
		if (recording.paused) {
			pause.title = 'Pause recording';
			recording.resume();
			timer = setInterval(showLevels,1000);
		}
		else {
			pause.title = 'Unpause recording';
			recording.pause();
			clearInterval(timer);
		}
	});
	
	var b2 = Titanium.UI.createButton({
		title:'Playback Recording',
		width:'60%',
		height:'15%',
		top:'30%'
	});
	
	win.add(b2);
	b2.hide();
	b2.addEventListener('click', function(e)
	{
		if (sound && sound.playing)
		{
			sound.stop();
			sound.release();
			sound = null;
			b2.title = 'Playback Recording';
		}
		else
		{
			Ti.API.info("recording file size: "+file.size);
			sound = Titanium.Media.createSound({url:file});
			
			sound.addEventListener('complete', function()
			{
				b2.title = 'Playback Recording';
			});
			Titanium.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
			sound.play();
			b2.title = 'Stop Playback';
		}
	});

	
	var saveBTN = Titanium.UI.createButton({
		title:'Save Record',
		width:'60%',
		height:'15%',
		top:'70%'
	});
	win.add(saveBTN);
	
	saveBTN.addEventListener('click', function(e){
			var getTime = new Date();
			var record = (Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'/records/' + getTime.getHours() + ':' + getTime.getMinutes() + ':' + getTime.getMilliseconds() + '.wav'));
			record.write(file);
			_containerWin.Record = file;
			win.close();
	});
	
	return win;
};

module.exports = record;
