/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Math.degToRad = function(deg) {
    return deg * (Math.PI / 180);
}

Math.leastCommonMultiple = function() {
    if (arguments.length <= 0) {
        return null;
    }
    
    var firstAbs = Math.abs(arguments[0]);
    for (var i = 1; i < arguments.length; i++) {
        var valueAbs = Math.abs(arguments[i]);
        var tmpFirstAbs = firstAbs;

        while (firstAbs && valueAbs) {
            firstAbs > valueAbs ? firstAbs %= valueAbs : valueAbs %= firstAbs;
        }

        firstAbs = Math.abs(tmpFirstAbs * arguments[i]) / (firstAbs + valueAbs);
    }
    
    return firstAbs;
}

Math.radToDeg = function(rad) {
    return rad * (180 / Math.PI);
}

function toolSwitch(toolName = "") {
    if (toolName == "") {
        var href = window.location.href;
        var hrefParams = href.split("#");
        toolName = hrefParams[1];
    }
    
    var tool = document.getElementById(toolName + "-tool");
    if (tool !== null) {
        var headerTexts = document.getElementsByClassName("header-text");
        for (var i = 0; i < headerTexts.length; i++) {
            var headerTextAnchors = headerTexts[i].getElementsByTagName("a");

            for (var j = 0; j < headerTextAnchors.length; j++) {
                headerTextAnchors[j].className = "";
            }
        }
        
        var tools = document.getElementsByClassName("tool");
        for (var i = 0; i < tools.length; i++) {
            var toolChilds = tools[i].getElementsByTagName("div");
            var toolChild = toolChilds[0];
            toolChild.className = "hidden";
        }
        
        var toolText = document.getElementById(toolName + "-tool-text");
        toolText.className = "selected";
        tool.className = "";
    } else {
        console.log("The hell did you do, fam. Go reload the page or sum shit before I call a rain of bees upon you.");
        console.log("          __         .' '.");
        console.log("        _/__)        .   .       .");
        console.log("       (8|)_}}- .      .        .");
        console.log("        `\__)    '. . ' ' .  . '");
    }
}

/*function toolSwitch(element) {
    var headerText = document.getElementsByClassName("header-text");
    for (var i = 0; i < headerText.length; i++) {
        var headerTextChilds = headerText[i].getElementsByTagName("a");
        
        for (var j = 0; j < headerTextChilds.length; j++) {
            headerTextChilds[j].className = "";
        }
    }
    
    element.className = "selected";
    
    var tools = document.getElementsByClassName("tool");
    for (var i = 0; i < tools.length; i++) {
        var toolChilds = tools[i].getElementsByTagName("div");
        var toolChild = toolChilds[0];
        toolChild.className = "hidden";
    }
    
    var href = element.getAttribute("href").substring(1);
    var tool = document.getElementById(href);
    if (tool !== null) {
        tool.className = "";
    } else {
        console.log("The hell did you do, fam. Go reload the page or sum shit before I call a rain of bees upon you.");
        console.log("          __         .' '.");
        console.log("        _/__)        .   .       .");
        console.log("       (8|)_}}- .      .        .");
        console.log("        `\__)    '. . ' ' .  . '");
    }
}*/

function tipHandler(element, reset = false) {
    var elementClass = element.className;
    var tips = document.getElementsByClassName(elementClass);
    for (var i = 0; i < tips.length; i++) {
        var tip = tips[i];
        if (reset) {
            tip.style.color = "";
        } else {
            tip.style.color = "red";
        }
    }
}

function tipListener(className) {
    var tips = document.getElementsByClassName(className);

    for (var i = 0; i < tips.length; i++) {
        var tip = tips[i];
        tip.addEventListener("mouseover", function() {
            tipHandler(this);
        }, false);
        tip.addEventListener("mouseout", function() {
            tipHandler(this, true);
        }, false);
    }
}

function defaults() {
    document.getElementById("mouse-tool-reswidth").value = screen.width;
    document.getElementById("mouse-tool-resheight").value = screen.height;
}

function mouseToolEngine() {
    var engine = Number(document.getElementById("mouse-tool-engine").value);
    if (engine == 0) {
        document.getElementById("mouse-tool-fov").value = 90;
        //document.getElementById("mouse-tool-yaw").value = 0.022;

        var source = document.getElementsByClassName("mouse-tool-source");
        for (var i = 0; i < source.length; i++) {
            var sourceChilds = source[i].getElementsByTagName("span");
            var sourceChild = sourceChilds[0];
            sourceChild.className = "";
        }

        var overwatch = document.getElementsByClassName("mouse-tool-overwatch");
        for (var i = 0; i < overwatch.length; i++) {
            var overwatchChilds = overwatch[i].getElementsByTagName("span");
            var overwatchChild = overwatchChilds[0];
            overwatchChild.className = "hidden";
        }
    } else {
        document.getElementById("mouse-tool-fov").value = 103;
        //document.getElementById("mouse-tool-yaw").value = 0.0066;

        var source = document.getElementsByClassName("mouse-tool-source");
        for (var i = 0; i < source.length; i++) {
            var sourceChilds = source[i].getElementsByTagName("span");
            var sourceChild = sourceChilds[0];
            sourceChild.className = "hidden";
        }

        var overwatch = document.getElementsByClassName("mouse-tool-overwatch");
        for (var i = 0; i < overwatch.length; i++) {
            var overwatchChilds = overwatch[i].getElementsByTagName("span");
            var overwatchChild = overwatchChilds[0];
            overwatchChild.className = "";
        }
    }
}

function mouseToolCalculate() {
    var engine = Number(document.getElementById("mouse-tool-engine").value);
    var reswidth = Number(document.getElementById("mouse-tool-reswidth").value);
    var resheight = Number(document.getElementById("mouse-tool-resheight").value);
    var multiplier = Number(document.getElementById("mouse-tool-multiplier").value);
    var dpi = Number(document.getElementById("mouse-tool-dpi").value);
    var sensitivity = Number(document.getElementById("mouse-tool-sensitivity").value);
    var fov = Number(document.getElementById("mouse-tool-fov").value);
    var yaw = Number(document.getElementById("mouse-tool-yaw").value);
    var accel = Number(document.getElementById("mouse-tool-accel").value);
    var fps = Number(document.getElementById("mouse-tool-fps").value);

    var inches360;
    if (engine == 0) {
        inches360 = 360 / (yaw * dpi * multiplier * sensitivity)
    } else {
        inches360 = (360 * 10 / 3) / (yaw * dpi * multiplier * sensitivity)
    }

    var cm360 = inches360 * 2.54;
    var usefulDPI = (Math.PI * reswidth) / (inches360 * Math.tan((fov * Math.PI / 180) / 2));
    var realAccel = ((((dpi * multiplier) / 2.54) ^ 2) * yaw * accel) / 1000;
    var maxSpeed = (reswidth * fps) / (2 * ((dpi * multiplier) / 0.0254));
    
    var maxSensitivity;
    if (engine == 0) {
        maxSensitivity = (360 * Math.tan(fov / 2)) / (Math.PI * reswidth * yaw);
    } else {
        maxSensitivity = ((360 * 10 / 3) * Math.tan(fov / 2)) / (Math.PI * reswidth * yaw);
    }
    
    var maxYaw;
    if (engine == 0) {
        maxYaw = (360 * Math.tan(fov / 2)) / (Math.PI * reswidth * sensitivity);
    } else {
        maxYaw = ((360 * 10 / 3) * Math.tan(fov / 2)) / (Math.PI * reswidth * sensitivity);
    }
    
    var rawDotDegree = dpi * inches360 / 360;
    var dotDegree = rawDotDegree / 2
    var aspectRatioMultiple = Math.leastCommonMultiple(reswidth, resheight);
    var aspectRatioWidth = aspectRatioMultiple / reswidth;
    var aspectRatioHeight = aspectRatioMultiple / resheight;
    var aspectRatio = aspectRatioHeight + ":" + aspectRatioWidth;
    var pixelDegree = (aspectRatioHeight / aspectRatioWidth * resheight) / fov;
    var pixelDegree2 = (reswidth / resheight * resheight) / fov;

    document.getElementById("mouse-tool-inches360").value = inches360;
    document.getElementById("mouse-tool-cm360").value = cm360;
    document.getElementById("mouse-tool-usefuldpi").value = usefulDPI;
    document.getElementById("mouse-tool-realaccel").value = realAccel;
    document.getElementById("mouse-tool-maxspeed").value = maxSpeed;
    document.getElementById("mouse-tool-maxsensitivity").value = maxSensitivity;
    document.getElementById("mouse-tool-maxyaw").value = maxYaw;
    document.getElementById("mouse-tool-rawdotdegree").value = rawDotDegree;
    document.getElementById("mouse-tool-dotdegree").value = dotDegree;
    document.getElementById("mouse-tool-aspectratio").value = aspectRatio;
    document.getElementById("mouse-tool-pixeldegree").value = pixelDegree;
    
    document.getElementById("mouse-tool-maxsensitivity").className = sensitivity > maxSensitivity ? "wrong" : "correct";
    document.getElementById("mouse-tool-maxyaw").className = yaw > maxYaw ? "wrong" : "correct";
    document.getElementById("mouse-tool-pixeldegree").className = dotDegree < pixelDegree ? "wrong" : "correct";
}

function sensitivityToolConversion() {
    var conversion = Number(document.getElementById("sensitivity-tool-conversion").value);
    var source = document.getElementsByClassName("sensitivity-tool-source");
    var overwatch = document.getElementsByClassName("sensitivity-tool-overwatch");
    if (conversion == 0) {
        for (var i = 0; i < source.length; i++) {
            source[i].disabled = true;
            source[i].readOnly = true;
        }
        
        for (var i = 0; i < overwatch.length; i++) {
            overwatch[i].disabled = false;
            overwatch[i].readOnly = false;
        }
    } else {
        for (var i = 0; i < source.length; i++) {
            source[i].disabled = false;
            source[i].readOnly = false;
        }

        for (var i = 0; i < overwatch.length; i++) {
            overwatch[i].disabled = true;
            overwatch[i].readOnly = true;
        }
    }
}

function sensitivityToolCalculate() {
    var conversion = Number(document.getElementById("sensitivity-tool-conversion").value);
    if (conversion == 0) {
        var overwatchDPI = Number(document.getElementById("sensitivity-tool-overwatch-dpi").value);
        var overwatchScopeCSGO = Number(document.getElementById("sensitivity-tool-overwatch-scope-csgo").value);
        var overwatchScopeTF2 = Number(document.getElementById("sensitivity-tool-overwatch-scope-tf2").value);
        
        var sourceDPI = overwatchDPI / (10 / 3);
        var sourceScopeCSGO = overwatchScopeCSGO / (400 / 9);
        var sourceScopeTF2 = overwatchScopeTF2 / (200 / 9);

        document.getElementById("sensitivity-tool-source-dpi").value = sourceDPI;
        document.getElementById("sensitivity-tool-source-scope-csgo").value = sourceScopeCSGO;
        document.getElementById("sensitivity-tool-source-scope-tf2").value = sourceScopeTF2;
    } else {
        var sourceDPI = Number(document.getElementById("sensitivity-tool-source-dpi").value);
        var sourceScopeCSGO = Number(document.getElementById("sensitivity-tool-source-scope-csgo").value);
        var sourceScopeTF2 = Number(document.getElementById("sensitivity-tool-source-scope-tf2").value);
        
        var overwatchDPI = sourceDPI * (10 / 3);
        var overwatchScopeCSGO = sourceScopeCSGO * (100 * 40 / 90);
        var overwatchScopeTF2 = sourceScopeTF2 * (100 * 20 / 90);

        document.getElementById("sensitivity-tool-overwatch-dpi").value = overwatchDPI;
        document.getElementById("sensitivity-tool-overwatch-scope-csgo").value = overwatchScopeCSGO;
        document.getElementById("sensitivity-tool-overwatch-scope-tf2").value = overwatchScopeTF2;
    }
}

window.onload = function() {
    defaults();
    mouseToolCalculate();
    sensitivityToolCalculate();
    tipListener("tip");
    tipListener("tip-2");
    tipListener("tip-3");
    tipListener("tip-4");
    tipListener("tip-5");
    tipListener("tip-6");
    tipListener("tip-7");
    tipListener("tip-8");
    tipListener("tip-9");
    tipListener("tip-10");
    tipListener("tip-11");
    tipListener("tip-12");
    toolSwitch();
}


