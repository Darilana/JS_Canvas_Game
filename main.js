document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var animation = null;
    var blocks = [];
    var minWait = 1000;
    var lastTime = +new Date();
    var FPS = 60;

    var startBtn = document.body.getElementsByClassName('btn-start')[0];
    startBtn.addEventListener('click', function () {
        if (!animation) {
            blocks = [];
            animation = animate();
        }
    });

    var stopBtn = document.body.getElementsByClassName('btn-stop')[0];
    stopBtn.addEventListener('click', function () {
        clearInterval(animation);
        animation = null;
        resetCounter();
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    });

    canvas.addEventListener('click', function (e) {
        const pos = {
            x: e.clientX,
            y: e.clientY
        };

        blocks.forEach(function(block, index, arr) {
            if (isIntersect(pos, block)) {
                arr.splice(index, 1);
                incrementCounter();
            }
        });
    });

    function Block(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = getRndColor();
        this.speed = getRandomArbitrary(0.5, 3);
    }

    Block.prototype.update = function () {
        if (this.y < canvas.clientHeight) {
            this.y += this.speed
        } else {
            this.y = 0;
        }
    };

    Block.prototype.render = function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };

    function animate() {
        return setInterval(function () {
            draw();
        }, 1000/FPS);
    }

    function draw() {
        if (+new Date() > lastTime + minWait){
            lastTime = +new Date();
            blocks.push(new Block(Math.random() * canvas.clientWidth, 0, 20, 20));
        }

        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        blocks.forEach(function(e){
            e.update();
            e.render();
        });
    }

    function getRndColor() {
        var r = 255 * Math.random() | 0;
        var g = 255 * Math.random() | 0;
        var b = 255 * Math.random() | 0;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function isIntersect(point, block) {

        return ((block.x + block.width) >= point.x)
            && (block.x <= point.x)
            && ((block.y + block.height*4) >= point.y)
            && (block.y <= point.y);
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function incrementCounter() {
        var score = document.getElementById('score');
        score.innerText = +score.innerText + 1;
    }

    function resetCounter() {
        var score = document.getElementById('score');
        score.innerText = 0;
    }
}, false);
