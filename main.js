function checkFCCIsOnline() {
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/freecodecamp",
        headers: {
            'Client-ID': 'vc32dqo0ywu1pyrb7xglzrth88q87o'
        },
        dataType: "json",
        success: function (data) {
            if (data.stream === null) {
                $('#fcc-status').html("Free Code Camp is OFFLINE");
            } else {
                $('#fcc-status').html("Free Code Camp is ONLINE");
            }
        }
    });
}

function getFollowers() {
    var following = [];
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels",
        headers: {
            'Client-ID': 'vc32dqo0ywu1pyrb7xglzrth88q87o'
        },
        dataType: "json",
        success: function (response) {
            for (let i = 0; i < response.follows.length; i++) {
                following.push(response.follows[i].channel.name); //These are the users that follows freecodecamp.
            }
        }
    });

    following = following.concat(["ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "notexist404"]);
    return following;
}


$(document).ready(function () {

    checkFCCIsOnline();
    console.log(getFollowers());






});