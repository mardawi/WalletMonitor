function ExpensesEdAd(_title,_container) {
	var expensesWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		backgroundColor:'#fff'
	});
	
	var topView = Ti.UI.createView({
		top:'0%',
		left:'0%',
		width:'100%',
		height:'60%'
	});
	
	var row1 = Ti.UI.createTableViewRow({
	    height:'10%',
	    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var amountLBL = Ti.UI.createLabel({
		text : 'Amount:',
		left : '5%',
		width:'30%'
	});
	
	var amountTF = Ti.UI.createTextField({
		left:'35%',
		width:'35%',
		height:'90%',
		hintText:'Amount'
	});
	
	row1.add(amountLBL);
	row1.add(amountTF);
	
	var row2 = Ti.UI.createTableViewRow({
	    height:'10%',
	    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var dateLBL = Ti.UI.createLabel({
		text : 'Date:',
		width:'30%',
		left : '5%'
	});
	
	var dateValue = Ti.UI.createTextField({
		hintText:String.formatDate(new Date()),
		editable:false,
		left:'35%',
		width:'35%',
		height:'90%',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	
	var setDate = Ti.UI.createButton({
		width:'20%',
		left:'75%',
		title:'Set'
	});
	
	setDate.addEventListener('click', function(event){
		var DatePickerWindow = require('ui/common/transactions/addEditTrans/DatePickerWindow');
		var dateWindow = new DatePickerWindow('select date', expensesWin);
		_container.open(dateWindow);
	});
	
	Ti.App.addEventListener('DateChanged', function(e){
		dateValue.hintText = String.formatDate(expensesWin.dateValue);
	});
	
	row2.add(dateLBL);
	row2.add(dateValue);
	row2.add(setDate);
	
	var row3 = Ti.UI.createTableViewRow({
	    height:'10%',
	    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var categoryLBL = Ti.UI.createLabel({
		text : 'Category:',
		width:'30%',
		left : '5%'
	});
	
	var setCatgBTN = Ti.UI.createButton({
		title:'Set Category',
		left:'35%',
		width:'35%'
	});
	
	setCatgBTN.addEventListener('click', function(e){
		var categoryWin = require('ui/common/categoryWin');
		var CategoryWin = new categoryWin('Categories',expensesWin);
		_container.open(CategoryWin);
	});
	
	Ti.App.addEventListener('selectCategory', function(e){
		setCatgBTN.title = expensesWin.selectedCatg.title;
	});
	
	row3.add(categoryLBL);
	row3.add(setCatgBTN);
	
	var row4 = Ti.UI.createTableViewRow({
	    height:'25%',
	    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var descriptionLBL = Ti.UI.createLabel({
		text : 'Description:',
		width:'30%',
		top : '5%',
		left : '5%'
	});
	
	var descriptionTA = Ti.UI.createTextArea({
		left:'37%',
		width:'60%',
		height:'70%',
		borderColor:'black',
		borderRadius:5
	});
	
	row4.add(descriptionLBL);
	row4.add(descriptionTA);
	
	var data = [row1, row2, row3, row4];
	var table = Ti.UI.createTableView({
	    data:data,
	    style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});

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


	expensesWin.add(table);
	expensesWin.add(bottomView);
	return expensesWin;

};
module.exports = ExpensesEdAd; 
 