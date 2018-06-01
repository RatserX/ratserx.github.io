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
        if (Math.floor(Math.random() * Math.floor(2))) {
            services.tab.load();
        } else {
            throw new Error("402 Payment Required")
        }
    }, random * 1000);
});
