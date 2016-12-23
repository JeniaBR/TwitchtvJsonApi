function checkFCCIsOnline() {
    $.ajax({
        type: "GET",
        url: "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp",
        dataType: "json",
        success: function (data) {
            if (data.stream === null) {
                $('#fcc-status').html("Free Code Camp is OFFLINE");
            }else{
                $('#fcc-status').html("Free Code Camp is ONLINE");                
            }
        }
    });
}


$(document).ready(function () {
    checkFCCIsOnline();
});