var schedule = {

    getHTTPObject: function () {
        if (typeof XMLHttpRequest == "undefined")
            XMLHttpRequest = function () {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                }
                catch (e) {
                }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                }
                catch (e) {
                }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                }
                return false;
            }
        return new XMLHttpRequest();
    },

    getSchedule: function () {
        var request = schedule.getHTTPObject();
        if (request) {
            request.open("GET", "match.json", true);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    var data = JSON.parse(request.responseText);
                    var west = data.west;
                    var east = data.east;
                    for (var i in west) {
                        var westDiv = document.createElement("div");
                        if (i != 1) {
                            var eastDiv = document.createElement("div");
                            eastDiv.className = "east" + i;
                        }
                        var matchDiv = document.getElementsByClassName("match")[0];
                        westDiv.className = "west" + i;
                        if (i == 1) {
                            westDiv.innerText = west[1].ch_name + "  -  " + east[1].ch_name;
                        } else if (i == 2) {
                            westDiv.innerText = west[1].ch_name + "  -  " + west[2].ch_name;
                            eastDiv.innerText = east[1].ch_name + "  -  " + east[2].ch_name;
                        } else if (i == 3) {
                            westDiv.innerText = west[1].ch_name + "  -  " + west[5].ch_name;
                            eastDiv.innerText = east[1].ch_name + "  -  " + east[5].ch_name;
                        } else if (i == 4) {
                            westDiv.innerText = west[2].ch_name + "  -  " + west[3].ch_name;
                            eastDiv.innerText = east[2].ch_name + "  -  " + east[3].ch_name;
                        } else if (i == 5) {
                            westDiv.innerText = west[1].ch_name + "  -  " + west[8].ch_name;
                            eastDiv.innerText = east[1].ch_name + "  -  " + east[8].ch_name;
                        } else if (i == 6) {
                            westDiv.innerText = west[4].ch_name + "  -  " + west[5].ch_name;
                            eastDiv.innerText = east[4].ch_name + "  -  " + east[5].ch_name;
                        } else if (i == 7) {
                            westDiv.innerText = west[2].ch_name + "  -  " + west[7].ch_name;
                            eastDiv.innerText = east[2].ch_name + "  -  " + east[7].ch_name;
                        } else if (i == 8) {
                            westDiv.innerText = west[3].ch_name + "  -  " + west[6].ch_name;
                            eastDiv.innerText = east[3].ch_name + "  -  " + east[6].ch_name;
                        }
                        matchDiv.appendChild(westDiv);
                        if (i != 1) {
                            matchDiv.appendChild(eastDiv);
                        }
                    }
                }
            }
            request.send(null);
        } else {
            alert("Sorry, your browser doesn\'t support XMLHttpRequest");
        }
    }
}

window.onload = function () {

    function ball() {
        this.canvas;
        this.ctx;
        this.img;
        this.width = 100;
        this.height = 110;
        this.x = 0;
        this.y = 0;
        this.g = 0.4;
        this.vy = 0.8;
        this.vx = 4;
        this.vyAdjust = -15;
        this.vxAdjust = 0.25;
        this.factor = 0.65;
        this.end = false;
        this.degree = 0;

        ball.prototype.init = function () {
            var that = this;
            this.canvas = document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.img = new Image();
            this.img.onload = function () {
                that.ctx.drawImage(that.img, 0, 0);
            }
            this.img.src = "img/ball.png";
        }

        ball.prototype.clearCanvas = function () {
            var that = this;
            this.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
        }

        ball.prototype.draw = function () {
            var that = this;
            this.ctx.save();
            this.rotate();
            this.ctx.drawImage(this.img, 0, 0, 100, 110, that.x, that.y, 100, 110);
            this.ctx.restore();
            if (this.vx > 0) {
                this.degree += 1 * this.vx;
            }
        }

        ball.prototype.move = function () {
            this.y += this.vy;
            this.vy += this.g;

            if (this.vx > 0) {
                this.x += this.vx;
            }

            if ((this.y + this.height) > this.canvas.height) {
                this.hit();
                this.vyAdjust = (this.vyAdjust * this.factor);
                this.vx = this.vx - this.vxAdjust;
            }

            if (this.vx < -0.1) {
                this.end = true;
            }
        }

        ball.prototype.hit = function () {
            this.vy = this.vyAdjust;
        }

        ball.prototype.rotate = function () {
            var that = this;
            this.ctx.translate(that.x + that.width / 2, that.y + that.height / 2);
            this.ctx.rotate(Math.PI / 180 * that.degree);
            this.ctx.translate(-that.x - that.width / 2, -that.y - that.height / 2);

        }

        ball.prototype.loop = function () {
            var that = this;
            this.clearCanvas();
            this.move();
            this.draw();
            if (!this.end) {
                setTimeout(function () {
                    that.loop();
                }, 1000 / 60)
            }
        }
    }

    schedule.getSchedule();
    document.getElementById("background").className = "background background-ready";
    document.getElementById("match").className = "match match-ready";
    var basketball = new ball();
    basketball.init();
    basketball.draw();
    basketball.loop();
}