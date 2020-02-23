var main = (function () {
    return {
        init: function () {
            console.log("init");
        }
    }
})();

(function () {
    main.init();
})();