var hackerImages = [
    "pzw4C8l.gif",
    "sombra_by_witchtaunter-danekeh.gif",
    "source.gif",
    "vu8uzzl.gif"
]

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

function loadHackerImage() {
    var hackerImagesLength = hackerImages.length;
    var index = Math.floor((Math.random() * hackerImagesLength) + 0);
    var main_steps_hacker = "<img src=\"img/" + hackerImages[index] + "\">";

    document.getElementById("main-steps-hacker").innerHTML = main_steps_hacker;
}

window.onload = function() {
    //TODO: Give a Pineapple Pizza to Katie
}

loadHackerImage();