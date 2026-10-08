(() => {
    const panel = document.getElementById('loading');
    const status = document.getElementById('loading-status');
    const bar = document.getElementById('loading-progress');
    const retry = document.getElementById('retry');
    let failed = false, finished = false, lastProgress = Date.now();
    function error(reason) {
        if (finished) return;
        failed = true;
        panel.hidden = false;
        status.textContent = 'Loading error: ' + (reason?.message || reason || 'Unknown error');
        bar.hidden = true;
        retry.hidden = false;
        clearInterval(watchdog);
    }
    window.fnfLoading = {
        progress(loaded, total) {
            if (failed) return;
            lastProgress = Date.now();
            if (total > 0) {
                const percent = Math.min(100, Math.round(loaded / total * 100));
                bar.value = percent;
                status.textContent = 'Loading game assets… ' + percent + '%';
            } else {
                bar.removeAttribute('value');
                status.textContent = 'Loading game assets…';
            }
        },
        starting() {
            if (failed) return;
            lastProgress = Date.now();
            bar.removeAttribute('value');
            status.textContent = 'Starting game…';
        },
        done() {
            if (failed) return;
            finished = true;
            clearInterval(watchdog);
            panel.hidden = true;
        }
    };
    const watchdog = setInterval(() => {
        if (Date.now() - lastProgress > 90000) {
            status.textContent = 'Still waiting for game files. Loading may be stalled; you can wait or reload.';
            retry.hidden = false;
        }
    }, 5000);
    window.addEventListener('error', event => {
        if (event.message) error(event.message);
    });
    window.addEventListener('unhandledrejection', event => error(event.reason));
    const script = document.createElement('script');
    script.src = './Funkin.js?v=keyboard-loading-1';
    script.onerror = () => error('Could not download Funkin.js. Check your connection and reload.');
    script.onload = () => {
        if (failed) return;
        window.fnfLoading.progress(0, 0);
        try { lime.embed('Funkin', 'openfl-content', 1280, 720, { parameters: {} }); }
        catch (reason) { error(reason); }
    };
    document.body.appendChild(script);
})();
