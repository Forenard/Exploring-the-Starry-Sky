//マウス系の関数を登録
function onDown(e) {

    isClickDown = true;
}

function onUp(e) {

    isClickDown = false;
}

function onClick(e) {

}

function onOver(e) {

    isMouseIn = true;
}

function onOut() {

    isMouseIn = false;
    isClickDown = false;
}
//動いてるときに検出
function getMousePoint(e) {
    mouseX = e.clientX - canvas.getBoundingClientRect().left;
    mouseY = e.clientY - canvas.getBoundingClientRect().top;
}

//Onloadで初めに呼ばれる。
function init() {
    //キャンバスの定義
    canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        //
        ctx = canvas.getContext('2d');
    } else {
        console.log("ブラウザがCanvasに対応していません");
    }

    //イベントリスナーの登録
    canvas.addEventListener('mousedown', onDown, false);
    canvas.addEventListener('mouseup', onUp, false);
    canvas.addEventListener('click', onClick, false);
    canvas.addEventListener('mouseover', onOver, false);
    canvas.addEventListener('mouseout', onOut, false);
    canvas.addEventListener('mousemove', getMousePoint, false);
    //gridの縦横サイズ
    width = canvas.width;
    height = canvas.height;
    rowCells = Math.floor(height / cellSize);
    lineCells = Math.floor(width / cellSize);


    //gridの宣言と初期化
    grid = new Array(rowCells);
    for (let i = 0; i < rowCells; i++) {
        grid[i] = new Array(lineCells);
        for (let j = 0; j < lineCells; j++) {
            grid[i][j] = new Cell(way, 0, false);
        }
    }

    //現在の押されているボタンの取得
    button[0].onclick = () => {
        debug("none");
        nowPushing = none;
    }
    for (let i = 1; i < button.length; i++) {
        button[i].onclick = () => {
            debug(statusType[i]);
            nowPushing = i;
        }
    }
    //モードの切り替え
    startButton.onclick = () => {
        debug("Swith");
        nowEdit = !nowEdit;
        nowPushing=none;
        nowTime=0;
        //Todo:startButtonの画像の切り替え
    }
}



//便利なfunctionたち

/**
 * dataをコンソールに表示
 * @param {any} data 
 */
function debug(data) {
    console.log(data);
}


//classたち
/**
 * statusで色を変更したいね
 * filltimeを一回ずつ減らすelapseTime()
 * isActiveのCellのみ大きくしていく
 */
class Cell {
    constructor(status, fill, active) {
        this.status = status;
        this.fillTime = fill;
        this.isActive = active;
    }
    elapseTime() {
        if (this.fillTime < fillTime) {
            this.fillTime++;
        }
    }
}

