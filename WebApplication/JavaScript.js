var canvas = document.getElementById('canvasID');
var context = canvas.getContext('2d');
var ypos = 0;
var xpos = 0;
var elements = [];

$(document).ready(function () {
    call();

    //canvas.width = 1000;
    //canvas.height = 1000;

    //canvas.addEventListener("click", doKeyDown, false);

    //for (i = 0; i < 12; i++) {
    //    if (i < 4) {

    //    }
    //    else if (i % 4 == 0) {
    //        ypos += 250;
    //        xpos = 0;
    //    }

    //    var image = new Image();
    //    var address = window.location.href;
    //    var indexOfSt = address.indexOf("st:");
    //    var substringHref = address.substring(indexOfSt + 3, indexOfSt + 8);

    //    image.id = "img_" + i;
    //    image.src = "https://localhost:" + substringHref + "/Images/SeatOpen.png";
    //    elements.push(image);
    //    image.clientLeft = xpos;
    //    image.clientTop = ypos;
    //    context.drawImage(image, xpos, ypos, 250, 250)
    //    xpos += 250;
    //} 

});

//function doKeyDown(e) {
//    var mousePos = getMousePos(canvas, e);
//    var MouseClick = { X: mousePos.x, Y: mousePos.y };
//    for (var i = 0; i < elements.length; i++) {
//        var PointFromList = { X: elements[i].x, Y: elements[i].y };
//        if (Collision(MouseClick, PointFromList, 1000, 1000)) {
//            console.log(elements)
//        }
//    }
//}

//function Collision(a, b, width, height)
//{
//    var svar = false;
//    if (a.X - b.X > 0 && a.X - b.X < width) {
//        if (a.Y - b.Y > 0 && a.Y - b.Y < height) {
//            svar = true;
//        }
//    }
//    return svar; 
//}

//function getMousePos(canvas, evt) {
//    var rect = canvas.getBoundingClientRect();
//    return {
//        x: evt.clientX - rect.left,
//        y: evt.clientY - rect.top
//    };
//}



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

    if (document.getElementById('img_' + id)) {
        var element = document.getElementById('img_' + id);
    } else {
        var element = document.getElementById(id)
    }

    var boole = source.substring(source.indexOf("Images")) == "Images/SeatOpen.png";

    var address = window.location.href;
    var indexOfSt = address.indexOf("st:");
    var substringHref = address.substring(indexOfSt + 3, indexOfSt + 8);
    $(element).attr('src', "https://localhost:" + substringHref + (boole ? "/Images/SeatClose.png" : "/Images/SeatOpen.png"));

    var json = '{ "state": ' + (boole ? 1 : 0) + ', "id": ' + id + '}';
    $.ajax({
        type: "POST",
        url: "WebForm.aspx/SetSeatState",
        data: json,
        contentType: "application/json; charset=utf-8",
        //success: (function (response) {
        //    console.log(response)
        //}),
        //error: (function (errorThrown) {
        //    console.log(errorThrown)
        //}),
        //failure: (function (response) {
        //    console.log("FAILURE")
        //})
    })
}