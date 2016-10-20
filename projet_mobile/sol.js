function sol(canvas) {

        var canvas = canvas;
        var context = canvas.getContext('2d');
        var looping = false;
        var totalSeconds = 0;

        var img = new Image();
        img.onload = imageLoaded;
        img.src = 'sol.png';

        function imageLoaded() {
            draw(0); // MODIF

                startStop();
        }

        var lastFrameTime = 0;

        function startStop() {
            looping = !looping;

            if (looping) {
                lastFrameTime = Date.now();
                requestAnimationFrame(loop);
            }
        }

        function loop() {
            if (!looping) {
                return;
            }

            requestAnimationFrame(loop);

            var now = Date.now();
            var deltaSeconds = (now - lastFrameTime) / 500;
            lastFrameTime = now;
            draw(deltaSeconds);
        }

        function draw(delta) {
            totalSeconds += delta;

            var vx = 100; // the background scrolls with a speed of 100 pixels/sec
            var numImages = Math.ceil(canvas.width / img.width) + 1;
            var xpos = totalSeconds * vx % img.width;

            context.save();
            context.translate(-xpos, 33);
            for (var i = 0; i < numImages; i++) {
                context.drawImage(img, i * img.width, canvas.height - img.height -5);
            }
            context.restore();
        }
};