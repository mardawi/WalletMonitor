function ApplicationTabGroup() {
	var self = Ti.UI.createTabGroup({
		// backgroundColor:'red'
	});
	var MainWindow = require('ui/common/MainWindow');
	var ReportWindow = require('ui/common/ReportWindow');
	// var ConfigWin = require('ui/common/ConfigWindow');
	var AboutWin = require('ui/common/AboutWindow');
// 	
	var mainWin = new MainWindow('main');
	var reportWindow = new ReportWindow('Report');
		// //configWin = new ConfigWin('Config'),
	var aboutWin = new AboutWin('About');
// 	
	var tab1 = Ti.UI.createTab({
		title: ('Main'),
		window: mainWin
	});
	mainWin.containingTab = tab1;
// 	
	var tab2 = Ti.UI.createTab({
		title: ('Report'),
		window: reportWindow
	});
	reportWindow.containingTab = tab2;
	
// 	
	var tab3 = Ti.UI.createTab({
		title: ('Config')
		//window: configWin
	});
	
	var tab4 = Ti.UI.createTab({
		title: ('About'),
		window: aboutWin
	});
// 	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	self.addTab(tab4);
	
	
	return self;
};

module.exports = ApplicationTabGroup;