// とりあえず後でユーザー入力にする
var wassrId = 'koba04';

Ti.include('wassr.js');
var wassr = new Wassr('koba04');

var win = Ti.UI.currentWindow;
win.barColor = '#277100';
var searchBar = Ti.UI.createSearchBar({
    barColor: '#CFFDB6',
    showCancel: false
});

(function showTimeline () {
    var rowData = [];
    if (Ti.Network.online == false ) {
        return;
    }
    var tableView;
    wassr.friendsTimeline(function(timeline) {
        var rowData = [];
        var max;
        for ( var i=0, max = timeline.length; i < max; ++i ) {
            var row = Ti.UI.createTableViewRow( { layout: 'vertical', height: 'auto', width: 'auto'} );
            row.add( Ti.UI.createImageView( { left: 10, width: 30, height: 50, image: timeline[i].user.profile_image_url } ) );
            row.add( Ti.UI.createLabel( { left: 50, top:-45, height: 'auto',  right:10, text: timeline[i].text, font: { fontSize : 12 } } ) );
            row.add( Ti.UI.createLabel( { left: 50, top:5,   height: 20, text: 'by:' + timeline[i].user.screen_name, font: { fontSize : 10 } } ) );
            row.add( Ti.UI.createLabel( { left: 220,top:-20, height: 20, text: timeline[i].date, font: { fontSize : 10 } } ) );
            rowData.push(row);
        }
        tableView = Ti.UI.createTableView({
            data: rowData,
            search: searchBar
        });

        var reloadHeader = Ti.UI.createView({
            backgroundColor: "#CFFDB0",
            height:55
        });

        var actInd = Ti.UI.createActivityIndicator({
            left:20, width:30, height:40, bottom:20
        });
        reloadHeader.add(actInd);
        var reloadLabel = Ti.UI.createLabel({
            text:"ひっぱって！！",
            font:{ fontSize:13, fontWeight:"bold" },
            height: "auto",
            left:55,
            width:200,
            bottom:30
        });
        reloadHeader.add(reloadLabel);
        tableView.headerPullView = reloadHeader;

        var pulling = false;
        var reloading = false;
        tableView.addEventListener('scroll', function(e) {
            var offset = e.contentOffset.y;
            if (offset <= -100.0 && !pulling ) {
                pulling = true;
                reloadLabel.text = "はなして！";
            } else if ( pulling && offset > -100.0 && offset < 0 ) {
                pulling = false;
                reloadLabel.text = "ひっぱって！";
            }
        });

        tableView.addEventListener('scrollEnd', function(e) {
            if ( pulling && !reloading && e.contentOffset.y <= -100.0 ) {
                reloading = true;
                pulling = false;
                actInd.show();
                reloadLabel.text = "Loading...";
                tableView.setContentInsets({ top:60}, {animated:true});
                showTimeline();
            }
        });
        tableView.setContentInsets({ top:0, animated:false});
        win.add(tableView);
    });
}());
