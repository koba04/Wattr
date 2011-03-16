// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
    title:'みんなのヒトコト',
    backgroundColor:'#fff',
    url:'list.js'
});

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
    title:'ヒトコト',
    backgroundColor:'#fff'
});
var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'ここはつぶやくページ',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});
win2.add(label2);

// create tab group
var tabGroup = Titanium.UI.createTabGroup();
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'つぶやき',
    window:win1
});
var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'つぶやく',
    window:win2
});
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
// open tab group
tabGroup.open();
