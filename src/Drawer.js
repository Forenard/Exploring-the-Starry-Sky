//ソルバを分ける
function solver() {
    if(nowEdit){
        //画像差し替え
        startButton.setAttribute('src', '../images/play.png');
        editSolver();
    }else{
        //画像差し替え
        startButton.setAttribute('src', '../images/stop.png');
        algoSolver();
    }
}

setInterval(solver, 15);



/**
 * grid配列を編集
 * @param {int(Cellの状態)} status 
 */
function editGrid(status) {
    //gridのindexへ変換
    let indexX = Math.floor(mouseX / cellSize);
    let indexY = Math.floor(mouseY / cellSize);
    
    //error検知
    if(0<=indexX && indexX<lineCells && 0<=indexY && indexY<rowCells){
        //正常
    }else{
        debug("グリッドの範囲外アクセス");
    }

    //編集済みかどうか
    if (grid[indexY][indexX].isActive) {
        //wayの場合に消す
        if (status === way) {
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

        return;
    }
}
//色の四角形書くよ
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
            //セルの初期化
            let y = i * cellSize;
            let x = j * cellSize;
            let d=cellSize*(1-cellSizePersent)/2;
            drawRect(y, x, cellSize, borderDefaultColor);
            drawRect(y+d, x+d, cellSize * cellSizePersent, cellDefaultColor);
            if (grid[i][j].isActive) {
                //時間を経過させる
                grid[i][j].elapseTime();
                //四角形を書くよ(canvas座標に変換)

                let size = (grid[i][j].fillTime / fillTime) * cellSize * cellSizePersent;
                let color = cellColor[grid[i][j].status];
                d=(cellSize-size)/2;

                drawRect(y+d, x+d, size, color);
                
            }
        }
    }
}

//編集用
function editSolver() {
    //canvasの初期化
    ctx.clearRect(0, 0, width, height);
    
    //現在クリックダウン中で、座標からいろいろ変更する
    if (isClickDown && nowPushing !== none) {
        editGrid(nowPushing);
    }
    //描画
    drawGrid();
}

//アルゴ用
function algoSolver() {
    //ゆっくり進める
    if(nowTime%algoSpan===0){
        //生きてるセルの検出
        let que=[];
        //Goalの検出
        let goalQue=[];
        for(let i=0;i<rowCells;i++){
            for(let j=0;j<lineCells;j++){
                if(grid[i][j].isActive && (grid[i][j].status===way || grid[i][j].status===start || grid[i][j].status===goaled)){
                    que.push([i,j]);
                }
                if(grid[i][j].isActive && grid[i][j].status===goal){
                    goalQue.push([i,j]);
                }
            }
        }
        //goal、若しくは誕生するセルが無かったら、また、生きてるセルに変化なしなら終わり
        if(goalQue.length===0||que.length===0||activeCellNum==que.length){
            debug("Done");
            nowEdit = true;
            nowPushing=none;
            nowTime=0;
            return;
        }
        //生きてるセルのカウントを保持
        activeCellNum=que.length;

        while (que.length!==0) {
            let p=que[que.length-1];
            que.pop();
            for(let i = 0; i < 4; i++) {
                let ny = p[0] + dy[i], nx = p[1] + dx[i];
                if(nx < 0 || ny < 0 || nx >= lineCells || ny >= rowCells) continue;
                if(grid[ny][nx].status===wall) continue;
                if(grid[ny][nx].status===goal){
                    grid[ny][nx].status=goaled;
                    continue;
                }
                if(grid[ny][nx].isActive)continue;
                grid[ny][nx].isActive=true;
            }
        }
        debug("AlgoDraw");
        drawGrid();
    }
    nowTime++;
}

function pathFinder(){

}