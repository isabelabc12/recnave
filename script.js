
    window.onload = function() {
        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");

        var naveImg = new Image();
        naveImg.src = "nave.PNG"; // Substitua "nave.png" pelo caminho da sua imagem //
        var nave = {
            x: canvas.width / 2 - 25,
            y: canvas.height - 100,
            width: 50,
            height: 50,
            speed: 5
        };

        var tiro = {
            x: 0,
            y: 0,
            width: 5,
            height: 10,
            speed: 10,
            fired: false
        };

        function drawNave() {
            ctx.drawImage(naveImg, nave.x, nave.y, nave.width, nave.height);
        }

        function drawTiro() {
            if (tiro.fired) {
                ctx.fillStyle = "red";
                ctx.fillRect(tiro.x, tiro.y, tiro.width, tiro.height);
            }
        }

        function update() {
            drawNave();
            drawTiro();
        }

        function moveNave(event) {
            switch(event.keyCode) {
                case 90: // Tecla Z (esquerda)
                    nave.x -= nave.speed;
                    break;
                case 67: // Tecla C (direita)
                    nave.x += nave.speed;
                    break;
                case 40: // Tecla de seta para baixo (tiro)
                    if (!tiro.fired) {
                        tiro.x = nave.x + nave.width / 2 - tiro.width / 2;
                        tiro.y = nave.y;
                        tiro.fired = true;
                    }
                    break;
            }
        }

        window.addEventListener("keydown", moveNave);

        function updateTiro() {
            if (tiro.fired) {
                tiro.y -= tiro.speed;
                if (tiro.y < 0) {
                    tiro.fired = false;
                }
            }
        }

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            update();
            updateTiro();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }