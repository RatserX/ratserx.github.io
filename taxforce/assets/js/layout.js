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

window.onload = function () {
    layout.load();
}