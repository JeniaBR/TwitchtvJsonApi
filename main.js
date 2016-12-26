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

function getFccFollowers() {

    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels",
        headers: {
            'Client-ID': 'vc32dqo0ywu1pyrb7xglzrth88q87o'
        },
        dataType: "json",
        success: function (response) {
            for (let i = 0; i < response.follows.length; i++) {
                var displayName = response.follows[i].channel.name;

                var logo = response.follows[i].channel.logo;
                if (logo === null) {
                    logo = "http://underscoopfire.com/wp-content/uploads/2012/08/xmen-logo.jpg";
                }

                var status = response.follows[i].channel.status;
                if (status === null) {
                    status = "There is no status";
                }

                var item  = '<div class = "col-md-4"><img src="' + logo +'"></div>';
                item += '<div class = "col-md-4">' + displayName +'</div>';
                item += '<div class = "col-md-4">' + status +'</div>';

                //$('#follower-info').append('<div class="row">' + item + '</div>');
                $('#app-container').append('<div class="row">' + item + '</div>');                
            }
        }

    });
}


$(document).ready(function () {

    checkFCCIsOnline();
    getFccFollowers();


});