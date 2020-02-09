let FpsLoopHelper = function (updateFn, FPS) {
    let fpsInterval, startTime, now, then, elapsed, init = false;
    function start() {
        if(!init) {
            fpsInterval = 1000 / (FPS || 30);
            then = Date.now();
            startTime = then;
            init = true;
        }
    }

    let self = this;
    this.run = function () {
        start();
        requestAnimationFrame(self.run);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            updateFn();
        }
    }
};

export { FpsLoopHelper }