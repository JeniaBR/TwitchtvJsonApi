function getChannelInfo(user) {
    var urlString = "https://wind-bow.gomix.me/twitch-api/channels/" + user;
    return $.ajax({
        type: "GET",
        url: urlString,
        dataType: "json"
    });
}

function getStreamInfo(user) {
    var urlString = "https://wind-bow.gomix.me/twitch-api/streams/" + user;
    return $.ajax({
        type: "GET",
        url: urlString,
        dataType: "json",
    });
}

function showData(channelInfo, streamInfo) {
    console.log(streamInfo);

    var logo, displayName, status;

    logo = channelInfo[0].logo;
    displayName = channelInfo[0].display_name;
    status = channelInfo[0].status;

    if (channelInfo[0].status === 404) {
        logo = "https://dinolover1314.files.wordpress.com/2012/07/pagenotfound_icon.png"
        displayName = channelInfo[0].error;
        status = channelInfo[0].message;
    }

    var item = '<div class = "col-xs-4"><img src="' + logo + '"class="img-responsive img-circle" width="150" height="150"></div>';
    item += '<div class = "col-xs-4">' + displayName + '</div>';
    item += '<div class = "col-xs-4">' + status + '</div>';

    $('#app-container').append('<div class="row">' + item + '</div>');

}

function getFccFollowers(users) {

    for (let i = 0; i < users.length; i++) {
        $.when(getChannelInfo(users[i]), getStreamInfo(users[i])).then(showData);
    }

}


$(document).ready(function () {
    var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
    getFccFollowers(twitchUsers);

});