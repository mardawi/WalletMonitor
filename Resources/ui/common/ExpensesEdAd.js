function ExpensesEdAd(_title,_container) {
	var expensesWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		backgroundColor:'#fff'
	});

	var expAmountView = Ti.UI.createView({
		top : '0%',
		left : '0%',
		width:'100%',
		height : '15%',
		layout:'horizantal'
	});
	
	var amountLBL = Ti.UI.createLabel({
		text : 'Amount:',
		left : '5%'
	});
	
	var amountTF = Ti.UI.createTextField({
		left:'25%',
		width:'70%',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	expAmountView.add(amountLBL);
	expAmountView.add(amountTF);
	
	var expDateView = Ti.UI.createView({
		top : '15%',
		left : '0%',
		width:'100%',
		height : '15%',
		layout:'horizantal'
	});
	
	var dateLBL = Ti.UI.createLabel({
		text : 'Date:',
		left : '5%'
	});
	
	var setDate = Ti.UI.createButton({
		left:'25%',
		title:'Set'
	});
	
	expDateView.add(dateLBL);
	expDateView.add(setDate);
	
	var expCatgView = Ti.UI.createView({
		top : '30%',
		left : '0%',
		width:'100%',
		height : '15%',
		layout:'horizantal'
	});
	
	var categoryLBL = Ti.UI.createLabel({
		text : 'Category:',
		left : '5%'
	});
	
	var setCatgBTN = Ti.UI.createButton({
		title:'Set Category',
		left:'35%'
	});
	
	setCatgBTN.addEventListener('click', function(e){
		var categoryWin = require('ui/common/categoryWin');
		var CategoryWin = new categoryWin('Categories',_container);
		_container.open(CategoryWin);
	});
	
	expCatgView.add(categoryLBL);
	expCatgView.add(setCatgBTN);
////////////////////////////////////////////////////////////////////////	

	
	var expDescView = Ti.UI.createView({
		top : '45%',
		left : '0%',
		width:'100%',
		height : '15%',
		layout:'horizantal'
	});
	
	var descriptionLBL = Ti.UI.createLabel({
		text : 'Description:',
		top : '5%',
		left : '5%'
	});
	
	var descriptionTA = Ti.UI.createTextArea({
		left:'35%',
		width:'60%',
		height:'80%'
	});
	
	expDescView.add(descriptionLBL);
	expDescView.add(descriptionTA);
	
	var bottomView = Ti.UI.createView({
		top : '60%',
		width : '100%',
		height : '40%',
		layout : 'horizantal'
	});
	
	var addPhoto = Ti.UI.createButton({
		title:'Add Photo',
		top:'5%',
		left:'5%',
		width:'40%',
		height:'35%'
	});
	
	var recVoice = Ti.UI.createButton({
		title:'Rec Voice',
		top:'5%',
		left:'55%',
		width:'40%',
		height:'35%'
	});
	
	var locLBL = Ti.UI.createLabel({
		text:'Location',
		top:'50%',
		left:'55%',
		width:'40%'
	});
	
	var locSW = Ti.UI.createSwitch({
		value:false,
		top:'50%',
		left:'5%'
	});
	
	var saveBTN = Ti.UI.createButton({
		title:'Save',
		top:'70%',
		width:'50%'
		
	});
	
	bottomView.add(addPhoto);
	bottomView.add(recVoice);
	bottomView.add(locSW);
	bottomView.add(locLBL);
	bottomView.add(saveBTN);


	expensesWin.add(expAmountView);
	expensesWin.add(expDateView);
	expensesWin.add(expCatgView);
	expensesWin.add(expDescView);
	expensesWin.add(bottomView);
	return expensesWin;

};
module.exports = ExpensesEdAd; 
 