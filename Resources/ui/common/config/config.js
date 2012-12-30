function configTime(_title, _container) {
	var win = Ti.UI.createWindow({
		title:_title,
		height:"100%",
		backgroundColor:"#ffffff",
		top:0
	});
	
	var self = Ti.UI.createView({
		top:0,
		left:0,
		height:"100%"
	});
	
	var monthLabel = Ti.UI.createLabel({
		text:"Month",
		left:5,
		top:90,
		color:"#000000",
	});
	
	var weekLabel = Ti.UI.createLabel({
		text:"Week",
		left:5,
		top:120,
		color:"#000000",
	});
	
	var customLabel = Ti.UI.createLabel({
		text:"Custom",
		left:5,
		top:150,
		color:"#000000",
	});
	
	var monthSwitch = Ti.UI.createSwitch({
	  style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	  value:false,
	  top:80
	});
	
	var weekSwitch = Ti.UI.createSwitch({
	  style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	  value:false,
	  top:110
	});
	
	
	var customSwitch = Ti.UI.createSwitch({
	  style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	  value:false,
	  top:140
	});
	
	var customFeild = Ti.UI.createTextField({
		top:140,
		width:140,
		hintText:'dd-mm-yyyy',
		enabled:false,
		left:200
	});
	
	var saveBtn = Ti.UI.createButton({
		title:"save",
		top:300
	});
	
	var timeStartLabel = Ti.UI.createLabel({
		text:'Time Start',
		top:180,
		left:5,
		color:'#000000'
	});
	
	var timeEndLabel = Ti.UI.createLabel({
		text:'Time End',
		top:210,
		left:5,
		color:'#000000'
	});
	
	var timeStartSwitch = Ti.UI.createSwitch({
	  style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	  value:true,
	  top:170
	});
	
	var timeEndSwitch = Ti.UI.createSwitch({
	  style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
	  value:true,
	  top:210
	});
	
	var checkValue = function(){
		if(Ti.App.Properties.hasProperty('Time span')){
			var timeStatus = Ti.App.Properties.getString('Time span');
			switch(timeStatus){
				case 'month':monthSwitch.value = true;break;
				case 'week':weekSwitch.value = true;break;
				case 'custom':customSwitch.value = true; customFeild.enabled = true; 
				customFeild.value=Ti.App.Properties.getString('Custom Time span');
				break;
			}
		}else{
			Ti.App.Properties.setString('Time span', 'month');
			monthSwitch.value = true;
		}
		
		if(Ti.App.Properties.hasProperty('TimeStartBool')||Ti.App.Properties.hasProperty('TimeEndBool')){
			var TimeStartBool = Ti.App.Properties.getBool('TimeStartBool');
			var TimeEndBool = Ti.App.Properties.getBool('TimeEndBool');
			
			if(TimeStartBool){
				timeStartSwitch.value = true;
			}else{
				timeStartSwitch.value = false;
			}
			
			if(TimeEndBool){
				timeEndSwitch.value = true;
			}else{
				timeEndSwitch.value = false;
			}
			
		}else{
			Ti.App.Properties.setBool('TimeStartBool',true);
			Ti.App.Properties.setBool('TimeEndBool',true);
		}
		
	};
	checkValue();
	
	
	
	saveBtn.addEventListener('click',function(){
		if(monthSwitch.value){
			Ti.App.Properties.setString('Time span', 'month');
		}
		if(weekSwitch.value){
			Ti.App.Properties.setString('Time span', 'week');
		}
		if(customSwitch.value){
			Ti.App.Properties.setString('Time span', 'custom');
			Ti.App.Properties.setString('Custom Time span', customFeild.value);
		}
		
		if(timeStartSwitch.value){
			Ti.App.Properties.setBool('TimeStartBool',true);
		}else{
			Ti.App.Properties.setBool('TimeStartBool',false);
		}
		
		if(timeEndSwitch.value){
			Ti.App.Properties.setBool('TimeEndBool',true);
		}else{
			Ti.App.Properties.setBool('TimeEndBool',false);
		}
		
		var type;
		if(monthSwitch.value){
			type = "month";
		}else if(weekSwitch.value){
			type = "week";
		}else{
			type = "custom";
		}
		
		Ti.App.fireEvent('configTimeSpan', {timeSpanType:type,timeStart:timeStartSwitch.value,timeEnd:timeEndSwitch.value});
	});
	
	customSwitch.addEventListener('change',function(){
		if(this.value){
			weekSwitch.value = false;
			monthSwitch.value = false;
			customFeild.enabled = true;
		}else{
			customFeild.enabled = false;
		}
	});
	
	weekSwitch.addEventListener('change',function(){
		if(this.value){
			customSwitch.value = false;
			monthSwitch.value = false;
			customFeild.enabled = false;
		}
	});
	
	monthSwitch.addEventListener('change',function(){
		if(this.value){
			customSwitch.value = false;
			weekSwitch.value = false;
			customFeild.enabled = false;
		}
	});
	
	
	self.add(timeStartSwitch);
	self.add(timeEndSwitch);
	self.add(timeStartLabel);
	self.add(timeEndLabel);
	self.add(customFeild);
	self.add(saveBtn);
	self.add(monthLabel);
	self.add(weekLabel);
	self.add(customLabel);
	self.add(monthSwitch);
	self.add(weekSwitch);
	self.add(customSwitch);
	
	win.add(self);
	
	return win;
}
module.exports = configTime;