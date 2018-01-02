var hackerImages = [
    "pzw4C8l.gif",
    "sombra_by_witchtaunter-danekeh.gif",
    "source.gif",
    "vu8uzzl.gif"
];

var perf = {
    xhr: function(settings) {
        settings.async = settings.async || true;
        settings.user = settings.user || null;
        settings.password = settings.password || null;
        settings.mediatype = settings.mediatype || "";
        settings.charset = settings.charset || "";
        settings.boundary = settings.boundary || "";
        settings.responseType = settings.responseType || "text";
        settings.timeout = settings.timeout || 0;
        settings.withCredentials = settings.withCredentials || false;
        settings.body = settings.body || null;
        settings.promise = (typeof Promise != "undefined" ? (settings.promise || false) : false);

        var executor = function(resolve, reject) {
            var contentType = "";
            contentType += settings.mediatype;
            contentType += (contentType != "" ? ";" : "");
            contentType += (settings.charset != "" ? "charset=" + settings.charset : "");
            contentType += (contentType != "" ? ";" : "");
            contentType += (settings.boundary != "" ? "boundary=" + settings.boundary : "");

            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.open(settings.method, settings.url, settings.async, settings.user, settings.password);
            xmlHttpRequest.setRequestHeader("Content-Type", contentType);
            xmlHttpRequest.responseType = settings.responseType;
            xmlHttpRequest.timeout = settings.timeout;
            xmlHttpRequest.withCredentials = settings.withCredentials;
            
            xmlHttpRequest.onreadystatechange = function() {
                var data = {
                    xmlHttpRequest: this,
                    event: event,
                    settings: settings
                };

                if (this.readyState == 4) {
                    if (this.status == 200) {
                        if (settings.promise) {
                            resolve(data);
                        }
                        
                        if (settings.hasOwnProperty("onsuccess")) {
                            if (typeof settings.onsuccess == "function") {
                                settings.onsuccess(data);
                            }
                        }
                    } else {
                        if (settings.promise) {
                            reject(data);
                        }
                        
                        if (settings.hasOwnProperty("onerror")) {
                            if (typeof settings.onerror == "function") {
                                settings.onerror(data);
                            }
                        }
                    }
                }
            };
            
            xmlHttpRequest.ontimeout = function() {
                var data = {
                    xmlHttpRequest: this,
                    event: event,
                    settings: settings
                };

                if (Object.prototype.hasOwnProperty.call(settings, "ontimeout")) {
                    if (typeof settings.ontimeout == "function") {
                        if (settings.promise) {
                            reject(data);
                        }
                        
                        settings.ontimeout(data);
                    }
                }
            };

            xmlHttpRequest.send(settings.body);
            return true;
        };

        if (settings.promise) {
            return new Promise(executor);
        } else {
            return executor(null, null);
        }
    }
};

function copyCode(element, event) {
    event.preventDefault();

    var main_steps_code = document.getElementById("main-steps-code");
    var code = main_steps_code.innerHTML;
    selectContent(main_steps_code);

    try {
        var copy = document.execCommand("copy");

        if (copy) {
            alertMessage("Copied to clipboard");
        }
    } catch (e) {
        console.log("Could not copy the code");
    }
}

function selectContent(element) {
    var range = null;
    var selection = null;

    if (document.createRange && window.getSelection) {
        range = document.createRange();
        selection = window.getSelection();
        selection.removeAllRanges();

        if (selection.addRange) {
            try {
                range.selectNodeContents(element);
            } catch (e) {
                range.selectNode(element);
            }
            
            selection.addRange(range);
        } else {
            selection.selectAllChildren(element);
        }
    } else if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    }
}

function alertMessage(text, timeout) {
    timeout = timeout || 2000;
    
    var alert = document.getElementById("alert");
    var alert_text = "<span id=\"alert-text\">" + text + "</span>";
    
    alert.innerHTML = alert_text;
    alert.classList.add("active");

    setTimeout(function() {
        alert.classList.remove("active");
    }, timeout);
}

function loadCodeSnippet() {
    var settings = {
        mediatype: "application/x-www-form-urlencoded",
        charset: "utf-8",
        method: "GET",
        url: "https://raw.githubusercontent.com/RatserX/steam-discovery-queue-explorer/master/sdqe.js",
        onsuccess: function(data) {
            document.getElementById("main-steps-code").innerHTML = "\n" + data.xmlHttpRequest.responseText;
        },
        onerror: function(data) {
            //TODO: Take the Pineapple Pizza and $5 from Katie
        }
    };
    
    perf.xhr(settings);
}

function loadHackerImage() {
    var hackerImagesLength = hackerImages.length;
    var index = Math.floor((Math.random() * hackerImagesLength) + 0);
    var main_steps_hacker = "<img src=\"img/" + hackerImages[index] + "\">";

    document.getElementById("main-steps-hacker").innerHTML = main_steps_hacker;
}

window.onload = function() {
    //TODO: Give a Pineapple Pizza to Katie
}

loadCodeSnippet();
loadHackerImage();