function Wassr(id) {
    this.id = id;
}
Wassr.prototype.friendsTimeline = function (callback) {
    var id = this.id;
    var timeline = [];
    var xhr = Ti.Network.createHTTPClient();
    xhr.open('GET', 'http://api.wassr.jp/statuses/friends_timeline.json');
    xhr.onload = function() {
        var rs = JSON.parse(this.responseText);
        for (var i=0; i < rs.length; i++) {
            var row = rs[i];
            var date = new Date();
            date.setTime(row.epoch * 1000);
            row.date = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
            timeline.push(row);
        }
        callback(timeline);
    };
    xhr.send({
          id: id
    });
};
