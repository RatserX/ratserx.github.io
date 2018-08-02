var href = window.location.href;
var baseUrlIndex = href.indexOf("/web");
var baseUrl = href.substr(0, baseUrlIndex);

var layout = {
    load: function () {
        $("#head").load(baseUrl + "/web/layout/head/head.html");

        $("header").load(baseUrl + "/web/layout/body/header.html");
        //$("#main").load(baseUrl + "/web/layout/body/main.html");
        $("footer").load(baseUrl + "/web/layout/body/footer.html");
    }
}

$(document).ready(function () {
    var random = Math.random() * (10 - 2.5) + 2.5;
    
    setTimeout(function () {
        if (Math.floor(Math.random() * Math.floor(2))) {
            layout.load();
        } else {
            $("#head").html("Error 402");
            $("#header").html("Error 402");
            $("#footer").html("Error 402");
            throw new Error("402 Payment Required");
        }
    }, random * 1000);
});
