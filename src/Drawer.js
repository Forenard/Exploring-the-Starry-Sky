/**
 * grid配列を編集
 * @param {int(Cellの状態)} status 
 */
function editGrid(status) {
    //gridのindexへ変換
    let indexX = Math.floor(mouseX / cellSize);
    let indexY = Math.floor(mouseY / cellSize);
    debug(indexX);
    //編集済みかどうか
    if (grid[indexY][indexX].isActive) {
        //wayの場合に消す
        if(status===way){
            grid[indexY][indexX].status = status;
            grid[indexY][indexX].fillTime = 0;
            grid[indexY][indexX].isActive = false;
        }
        return;
    }
    //編集
    if (status !== way) {
        grid[indexY][indexX].status = status;
        grid[indexY][indexX].fillTime = fillTime;
        grid[indexY][indexX].isActive = true;
    }
}

function drawRect(y, x, size, color) {
    ctx.fillStyle = color;

    ctx.fillRect(x, y, size, size);
}

/**
 * grid配列のcellをcanvasに描画
 */
function drawGrid() {
    for (let i = 0; i < rowCells; i++) {
        for (let j = 0; j < lineCells; j++) {
            if (grid[i][j].isActive) {
                //四角形を書くよ(canvas座標に変換)
                let y = i * cellSize;
                let x = j * cellSize;
                let size = (grid[i][j].fillTime / fillTime) * cellSize;
                let color = cellColor[grid[i][j].status];
                drawRect(y, x, size, color);
            }
        }
    }
}

function solver() {
    //canvasの初期化
    ctx.clearRect(0, 0, width, height);
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
    //現在クリックダウン中で、座標からいろいろ変更する
    if (isClickDown && nowPushing !== none) {
        editGrid(nowPushing);
    }

    //描画
    drawGrid();
}

setInterval(solver, 100);