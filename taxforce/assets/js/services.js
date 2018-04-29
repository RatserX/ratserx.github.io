var services = {
    tab: {
        load: function () {
            var anchor = window.location.hash;
            $("a[href='" + anchor + "']").tab('show');
        }
    }
}


$(document).ready(function () {
    services.tab.load();
});