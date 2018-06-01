var services = {
    tab: {
        load: function () {
            var anchor = window.location.hash;
            $("a[href='" + anchor + "']").tab('show');
        }
    }
}


$(document).ready(function () {
    var random = Math.random() * (10 - 2.5) + 2.5;
    
    setTimeout(function () {
        services.tab.load();
    }, random * 1000);
});
