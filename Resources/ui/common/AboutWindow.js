function AboutWindow(_title) {
	var About = Ti.UI.createWindow({
		title:_title
	});
	
	var webView = Ti.UI.createWebView({
		url:'../../about.html'
	});
	
	About.add(webView);
	return About;
};
module.exports = AboutWindow; 
