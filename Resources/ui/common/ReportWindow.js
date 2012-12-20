function ReportWindow(_title) {
	
	var reportWin = Ti.UI.createWindow({
		title:_title,
		width:'100%',
		height:'100%'
	});
	var transBtn = Ti.UI.createButton({
		title: 'Transactions',
		top: '5%',
		left: '5%',
		width: '40%',
		height: '25%'
	});
	
	reportWin.add(transBtn);
	transBtn.addEventListener('click', function(event){
		var TransactionReportWindow = require('ui/common/reports/TransactionsReport');
		reportWin.containingTab.open(new TransactionReportWindow('Transactions', reportWin.containingTab));
	});
	
	var byCategoryBtn = Ti.UI.createButton({
		title: 'By Category',
		top: '5%',
		right: '5%',
		width: '40%',
		height: '25%'
	});
	byCategoryBtn.addEventListener('click', function(event){
		var CategoryReportWindow = require('ui/common/reports/CategoryReport');
		reportWin.containingTab.open(new CategoryReportWindow('Category Report', reportWin.containingTab));
	});
	reportWin.add(byCategoryBtn);
	
	var byTagBtn = Ti.UI.createButton({
		title:'By Tag',
		left: '5%',
		top: '35%',
		width: '40%',
		height: '25%'
	});
	byTagBtn.addEventListener('click', function(event){
		var TagReportWindow = require('ui/common/reports/TagReport');
		reportWin.containingTab.open(new TagReportWindow('Tag Report', reportWin.containingTab));
	});
	reportWin.add(byTagBtn);
		
	var byTimeBtn = Ti.UI.createButton({
		title: 'By Time Spam',
		top: '35%',
		right: '5%',
		width: '40%',
		height: '25%'
	});
	byTimeBtn.addEventListener('click',function(event){
		var TimeSpanReportWindow = require('ui/common/reports/TimeSpanReport');
		reportWin.containingTab.open(new TimeSpanReportWindow('Time Span Report', reportWin.containingTab));
	});
	reportWin.add(byTimeBtn);
	
	var mapBtn = Ti.UI.createButton({
		title: 'Map',
		left: '5%',
		top: '65%',
		width: '40%',
		height: '25%'
	});
	mapBtn.addEventListener('click', function(event){
		var MapReportWindow = require('ui/common/reports/MapReport');
		reportWin.containingTab.open(new MapReportWindow('Map Report', reportWin.containingTab));
	});
	reportWin.add(mapBtn);
	
	var cashFlowBtn = Ti.UI.createButton({
		title: 'Cash Flow',
		right: '5%',
		top: '65%',
		width: '40%',
		height: '25%'
	});
	cashFlowBtn.addEventListener('click', function(event){
		var CashFlowReportWindow = require('ui/common/reports/CashFlowReport');
		reportWin.containingTab.open(new CashFlowReportWindow('Cash Flow Report', reportWin.containingTab));
	});
	reportWin.add(cashFlowBtn);
		
	return reportWin;
};
module.exports = ReportWindow;