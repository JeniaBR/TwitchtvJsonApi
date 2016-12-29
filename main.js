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

    var logo, displayName, onlineUserStatus, userConnectivity, userLink,openInNewTab;

    streamInfo[0].stream != null ? userConnectivity = "online" : userConnectivity = "offline";

    logo = channelInfo[0].logo;
    displayName = channelInfo[0].display_name;
    userConnectivity === 'online' ? onlineUserStatus = channelInfo[0].status : onlineUserStatus = "Offline";
    userConnectivity === 'online' ? userLink = channelInfo[0].url : userLink = "#";
    userConnectivity === 'online' ? openInNewTab = "_blank" : openInNewTab = "";

    if (channelInfo[0].status === 404) {
        logo = "https://dinolover1314.files.wordpress.com/2012/07/pagenotfound_icon.png";
        displayName = channelInfo[0].error;
        onlineUserStatus = channelInfo[0].message;
        userConnectivity = "not-exist"
        userLink = "#";
    }

    var item = '<div class = "col-xs-2 col-sm-1"><img src="' + logo + '"class="img-responsive img-circle logo-style"></div>';
    item += '<div class = "col-xs-10 col-sm-3 display-name"><a href="' + userLink + '" target="' + openInNewTab +'" >' + displayName + '</a></div>';
    item += '<div class = "col-xs-10 col-sm-8 user-status">' + onlineUserStatus + '</div>';

    var element = '<div class="row ' + userConnectivity + '" style="display: none;">' + item + '</div>';

    userConnectivity === 'online' ? $('#fcc-users').prepend(element) : $('#fcc-users').append(element);
    $('.row').slideDown('fast');

}

function getDataFromTwitchAPI(users) {

    for (let i = 0; i < users.length; i++) {
        $.when(getChannelInfo(users[i]), getStreamInfo(users[i])).then(showData);
    }

}


$(document).ready(function () {
    var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
    getDataFromTwitchAPI(twitchUsers);

    $('#online-btn').click(function () {
        $('.offline').addClass('hidden');
        $('.not-exist').addClass('hidden');
        $('.online').removeClass('hidden');

    });

    $('#offline-btn').click(function () {
        $('.online').addClass('hidden');
        $('.not-exist').addClass('hidden');
        $('.offline').removeClass('hidden');

    });

    $('#all-btn').click(function () {
        $('.offline').removeClass('hidden');
        $('.not-exist').removeClass('hidden');
        $('.online').removeClass('hidden');

    });

});