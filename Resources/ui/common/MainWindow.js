function MainWindow(_title) {
	var mainWin = Ti.UI.createWindow({
		title : _title,
		height : '100%',
		backgroundColor:'#fff'
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
		var ExpensesEdAd = require('ui/common/ExpensesEdAd');
		var ExpensesWin = new ExpensesEdAd('Expenses Edit/Add',mainWin.containingTab);
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

	var balnaceLBL = Ti.UI.createLabel({
		text : 'Balance: 00.00JD',
		left : '10%',
		top : '5%'
	});

	var expensesLBL = Ti.UI.createLabel({
		text : 'Expenses: 00.00JD',
		left : '10%',
		top : '5%'
	});

	var depositsLBL = Ti.UI.createLabel({
		text : 'Deposits: 00.00JD',
		left : '10%',
		top : '5%'
	});

	Summaryview.add(summaryLBL);
	Summaryview.add(balnaceLBL);
	Summaryview.add(expensesLBL);
	Summaryview.add(depositsLBL);

	mainWin.add(BTNview);
	mainWin.add(Summaryview);
	return mainWin;

};
module.exports = MainWindow; 
 