//便利なfunctionたち

/**
 * dataをコンソールに表示
 * @param {any} data 
 */
function debug(data) {
    console.log(data);
}



//classたち

class Cell {
    constructor(status, fill) {
        this.status = status;
        this.fillTime = fill;
    }
    elapseTime() {
        if (this.fillTime !== 0) {
            this.fillTime--;
        }
    }
}