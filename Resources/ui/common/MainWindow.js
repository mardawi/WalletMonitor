function MainWindow(_title) {
	var mainWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		backgroundColor : '#ccc'
	});

	var BTNview = Ti.UI.createView({
		top : 0,
		left : 0,
		height : '40%'
	});

	var expensesBTN = Ti.UI.createButton({
		title : 'Expenses',
		top : '15%',
		width : '40%',
		height : '70%',
		left : '5%'
	});
	
	expensesBTN.addEventListener('click', function(e){
		var ExpensesEdAd = require('ui/common/transactions/addEditTrans/ExpensesEdAd');
		var ExpensesWin = new ExpensesEdAd('Expenses Add',mainWin.containingTab);
		mainWin.containingTab.open(ExpensesWin);
	});

	var depositsBTN = Ti.UI.createButton({
		title : 'Deposits',
		top : '15%',
		width : '40%',
		height : '70%',
		left : '55%'
	});
	
	depositsBTN.addEventListener('click', function(event){
		var AddEditDeposit = require('ui/common/transactions/addEditTrans/AddEditDeposit');
		var depositWin = new AddEditDeposit('Add Deposite', mainWin.containingTab);
		mainWin.containingTab.open(depositWin);
	});

	BTNview.add(expensesBTN);
	BTNview.add(depositsBTN);

	var Summaryview = Ti.UI.createView({
		top : '40%',
		width : '100%',
		height : '60%',
		layout : 'vertical'
	});

	var summaryLBL = Ti.UI.createLabel({
		text : 'Summary',
		left : '5%',
		top : '5%'
	});
	
	var row1 = Ti.UI.createTableViewRow({
	    height:'auto',
	    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});

	var balnaceLBL = Ti.UI.createLabel({
		text : 'Balance: ',
		color:'black',
		left : '10%',
		top : '5%'
	});
	var blc = 0
	var balnaceValue = Ti.UI.createLabel({
		text:blc + ' JD',
		color:'black',
		left:'70%'
	});
	row1.add(balnaceLBL);
	row1.add(balnaceValue);
	
	var row2 = Ti.UI.createTableViewRow({
	    height:'auto',
	    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var expensesLBL = Ti.UI.createLabel({
		text : 'Expenses: ',
		color:'black',
		left : '10%',
		top : '5%'
	});
	
	var exp = 0
	var expensesValue = Ti.UI.createLabel({
		text : exp + ' JD',
		color:'black',
		left : '70%'
	});
	row2.add(expensesLBL);
	row2.add(expensesValue);
	
	var row3 = Ti.UI.createTableViewRow({
	    height:'auto',
	    selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	});
	
	var depositsLBL = Ti.UI.createLabel({
		text : 'Deposits: ',
		color:'black',
		left : '10%',
		top : '5%'
	});
	
	var dep = 0
	var depositsValue = Ti.UI.createLabel({
		text : dep + ' JD',
		color:'black',
		left : '70%'
	});
	
	row3.add(depositsLBL);
	row3.add(depositsValue);
	
	var data = [row1, row2, row3];
	var table = Ti.UI.createTableView({
	    data:data,
	    scrollable:false,
	    backgroundColor:'#ccc',
	    style: Ti.UI.iPhone.TableViewStyle.GROUPED
	});

	Summaryview.add(summaryLBL);
	Summaryview.add(table);

	mainWin.add(BTNview);
	mainWin.add(Summaryview);
	return mainWin;

};
module.exports = MainWindow; 
 