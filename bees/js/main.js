/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Bee() {
    var _bee = document.createElement("img");
    var _windowWidth = window.innerWidth;
    var _windowHeight = window.innerHeight;
    var _deltaX = Math.round(Math.random()) ? -1 : 1;
    var _deltaY = Math.round(Math.random()) ? -1 : 1;
    
    var _width = 0;
    var _height = 0;
    var _positionX = 0;
    var _positionY = 0;
    var _movementLoop = null;

    var _offsetX = 3;
    var _offsetY = 3;
    var _speedX = 3;
    var _speedY = 3;
    var _movementInterval = 30;
    
    var _imagesLocal = [
        "img/bee-0.png",
        "img/bee-1.png",
        "img/bee-2.png",
        "img/bee-3.png",
        "img/bee-4.png",
        "img/bee-5.png",
        "img/bee-6.png",
        "img/bee-7.png",
        "img/bee-8.png",
        "img/bee-9.png",
        "img/bee-10.png",
        "img/bee-11.png",
        "img/bee-12.png",
        "img/bee-13.png"
    ];
    var _imagesCloud = [
        "http://i.imgur.com/UI0S5fK.png",
        "http://i.imgur.com/EpV67CS.png",
        "http://i.imgur.com/VCfV4cO.png",
        "http://i.imgur.com/VqBqOsz.png",
        "http://i.imgur.com/6lplIEs.png",
        "http://i.imgur.com/AZQeZvl.png",
        "http://i.imgur.com/1lm0Hj4.png",
        "http://i.imgur.com/WFzBoGl.png",
        "http://i.imgur.com/4JYwBb8.png",
        "http://i.imgur.com/A3KwnlV.png",
        "http://i.imgur.com/wy09NRG.png",
        "http://i.imgur.com/Ov0j1lT.png",
        "http://i.imgur.com/ggLgN1Y.jpg",
        "http://i.imgur.com/EomumZx.jpg"
    ];

    var self = {
        movement: function() {
            _windowWidth = window.innerWidth;
            _windowHeight = window.innerHeight;
            _width = _bee.offsetWidth;
            _height = _bee.offsetHeight;

            var newPositionX = _positionX + (_deltaX * _speedX);
            if (newPositionX < 0 || newPositionX >= _windowWidth - _width - _offsetX) {
                _deltaX *= -1;
            }

            var newPositionY = _positionY + (_deltaY * _speedY);
            if (newPositionY < 0 || newPositionY >= _windowHeight - _height - _offsetY) {
                _deltaY *= -1;
            }

            _positionX = newPositionX;
            _positionY = newPositionY;

            _bee.style.left = _positionX + "px";
            _bee.style.top = _positionY + "px";
        },
        movementStart: function() {
            _movementLoop = setInterval(this.movement, _movementInterval);
        },
        movementStop: function() {
            clearInterval(_movementLoop);
        },
        spawn: function() {
            document.body.appendChild(_bee);
            _bee.className = "bee";
            _bee.setAttribute("alt", "");
            _bee.setAttribute("src", _imagesCloud[Math.floor(Math.random() * _imagesCloud.length)]);
            
            _width = _bee.offsetWidth;
            _height = _bee.offsetHeight;
            _positionX = Math.round(Math.random() * (_windowWidth - _width - _offsetX));
            _positionY = Math.round(Math.random() * (_windowHeight - _height - _offsetY));
            
            _bee.style.position = "absolute";
            _bee.style.left = _positionX + "px";
            _bee.style.top = _positionY + "px";
        }
    }
    
    return self;
}

function Bees() {
    var _bees = [];
    var _spawnLoop = null;

    var _spawnLimit = -1;
    var _spawnInterval = 10000;

    var self = {
        spawn: function() {
            var bee = new Bee();
            bee.spawn();
            bee.movementStart();
            _bees.push(bee);
            
            var beesLength = _bees.length;
            document.getElementById("bees-fucked-count").innerHTML = beesLength + (beesLength == 1 ? " BEE" : " BEES");
        },
        spawnStart: function() {
            if (_spawnLimit >= 0 && _bees.length >= _spawnLimit) {
                return;
            }

            _spawnLoop = setInterval(this.spawn, _spawnInterval);
        },
        spawnStop: function() {
            clearInterval(_spawnLoop);
        }
    }

    return self;
}

function Count() {
    var _countLoop = null;
    var _interval = -1;
    var _intervalSecond = 1000;
    var _intervalMinute = _intervalSecond * 60;
    var _intervalHour = _intervalMinute * 60;
    var _intervalDay = _intervalHour * 24;
    var _intervalWeek = _intervalDay * 7;
    var _value = 0;

    var self = {
        interval: function(interval) {
            if (interval == "seconds") {
                _interval = _intervalSecond;
            } else if (interval == "minutes") {
                _interval = _intervalMinute;
            } else if (interval == "hours") {
                _interval = _intervalHour;
            } else if (interval == "days") {
                _interval = _intervalDay;
            } else if (interval == "weeks") {
                _interval = _intervalWeek;
            } else if (typeof(interval) === "number") {
                _interval = interval;
            } else {
                _interval = 1000;
            }
        },
        get: function() {
            return _value;
        },
        reset: function() {
            _value = 0;
        },
        set: function(value) {
            _value = value;
        },
        update: function() {
            _value++;
        },
        start: function(fn = null) {
            _countLoop = setInterval(function() {
                self.update();

                if (fn != null) {
                    fn(_value);
                }
            }, _interval);
        },
        stop: function() {
            clearInterval(_countLoop);
        }
    }

    return self;
}

var _bees;
var _audio;
var _count;

function toggleAudio(element) {
    if (_audio == null) {
        return;
    }

    if (_audio.paused) {
        element.innerHTML = "(-.-) BzZzZ…";
        _audio.play();
    } else {
        element.innerHTML = "(O`w´O) BZZZZ!";
        _audio.pause();
    }
}

window.onclick = function() {
    _bees.spawn();
}

window.onload = function() {
    if (_bees == null) {
        _bees = new Bees();
    }

    _bees.spawn();
    _bees.spawnStart();
    
    if (_audio == null) {
        _audio = new Audio();
    }
    _audio.loop = true;
    //_audio.src = "audio/FUCKBEES_FULL.ogg";
    _audio.src = "https://dl.dropboxusercontent.com/s/us0zesahbde0snj/FUCKBEES_FULL.ogg?dl=0"
    _audio.play();

    _audio.addEventListener("timeupdate", function() {
        var bufferTime = 0.22;
        if (this.currentTime > this.duration - bufferTime) {
            this.currentTime = 0;
            this.play();
        }
    }, false);

    if (_count == null) {
        _count = new Count();
    }

    _count.interval("seconds");
    _count.start(function(value) {
        document.getElementById("bees-fucked-timer").innerHTML = value + (value == 1 ? " SECOND" : " SECONDS");
    });
    
    console.log("────────────────▄████▄");
    console.log("──────────────▄███░░░██▄─▄████▄");
    console.log("────────────▄██░░░░░░░░███░░░░██▄");
    console.log("──────────▄██░░░░░░░░░██░░░░░░░░█");
    console.log("──────────██░░░░░░░░░██░░░░░░░░░█");
    console.log("──────────█░░░░░░░░░██░░░░░░░░░░█");
    console.log("──────────█░░░░░░░░░█░░░░░░░░░░░█");
    console.log("──────────██░░░░░░░░█░░░░░░░░░░░█");
    console.log("───────────█░░░░░░░██░░░░░░░░░░░█");
    console.log("────────────█░░░░░░█░░░░░░░░░░░░█");
    console.log("────────────██░░░░░█░░░░░░░░░░░░█");
    console.log("─█────────█──██░░░░█░░░░░░░░░░░█");
    console.log("─█────────█───█░░░░█░░░░░░░░░██");
    console.log("──█──────█────█░░░░█░░░░░░░███");
    console.log("───█────█───▄███░░░█░░░░█████");
    console.log("─▄████████▄─█▒▒██████████▒▒▒███");
    console.log("─█░░░░░░░░███▒▒▒████▒▒▒███▒▒▒▒██");
    console.log("█░░░█░░█░░░█▒▒▒▒▒███▒▒▒▒███▒▒▒▒█▄");
    console.log("█░░░░░░░░░░█▒▒▒▒▒▒██▒▒▒▒▒██▒▒▒▒███");
    console.log("█░░█░░░░█░░█▒▒▒▒▒▒██▒▒▒▒▒██▒▒▒▒█▀");
    console.log("██░░████░░░█▒▒▒▒▒███▒▒▒▒███▒▒▒██");
    console.log("─██░░░░░░███▒▒▒▒████▒▒▒███▒▒▒██");
    console.log("──▀▀▀▀▀▀▀▀─██▒▒████▒▒▒███▒▒▒██");
    console.log("────────────▀███████████████▀");
}


