$(document).ready(function () {
    call();
});

function call() {
    $.ajax({
        type: "POST",
        url: 'WebForm.aspx/GetData',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: (function (data) { 
            $.each(JSON.parse(data.d), function (key, value) {
                $('<button/>', {
                    text: value.Name,
                    id: 'btn_' + key,
                    click: function () { window.open("http://" + value.Url) }
                }).appendTo("#Main");
            });        
        }),
        error: (function (r) {
            alert(r.d)
        })
    })
}

function SwapOccupancy(source, id) {
    var element = document.getElementById(id);

    var substringHref = window.location.href.substring(window.location.href.indexOf("st:") + 3, window.location.href.indexOf("st:") + 8);
    var boole = source.substring(source.indexOf("Images")) == "Images/SeatOpen.png";
    var imagestring = boole ? "/Images/SeatClose.png" : "/Images/SeatOpen.png";
    var state = boole ? 1 : 0;
    var json = '{ "state": ' + state + ', "id": ' + id + '}';

    var obj = new Object();
    obj.state = state;
    obj.id = id;



    $(element).attr('src', "https://localhost:" + substringHref + imagestring);

    $.ajax({
        type: "POST",
        url: "WebForm.aspx/SetSeatState",
        data: json,
        contentType: "application/json; charset=utf-8",
        success: (function (response) {
            console.log(response)
        }),
        error: (function (errorThrown) {
            console.log(errorThrown)
        }),
        failure: (function (response) {
            console.log("FAILURE")
        })
    })
}