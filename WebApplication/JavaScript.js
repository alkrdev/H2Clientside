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
    var boole = source.substring(source.indexOf("Images")) == "Images/SeatOpen.png";

    var address = window.location.href;
    var indexOfSt = address.indexOf("st:");
    var substringHref = address.substring(indexOfSt + 3, indexOfSt + 8);
    var element = document.getElementById(id);
    $(element).attr('src', "https://localhost:" + substringHref + (boole ? "/Images/SeatClose.png" : "/Images/SeatOpen.png"));

    var json = '{ "state": ' + (boole ? 1 : 0) + ', "id": ' + id + '}';
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