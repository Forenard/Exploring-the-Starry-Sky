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
        //pathFind中かどうか
        if(pathFound){
            pathFinder();
            return;
        }
        //生きてるセルの検出
        let que=[];
        //Goalの検出
        let goalQue=[];
        //Goaledの検出
        goaledQue=[];
        for(let i=0;i<rowCells;i++){
            for(let j=0;j<lineCells;j++){
                if(grid[i][j].isActive && (grid[i][j].status===way || grid[i][j].status===start || grid[i][j].status===goaled)){
                    que.push([i,j]);
                }
                if(grid[i][j].isActive && grid[i][j].status===goal){
                    goalQue.push([i,j]);
                }
                if(grid[i][j].isActive && grid[i][j].status===goaled){
                    goaledQue.push([i,j]);
                    debug(grid[i][j].pathDistance);
                }
                if(grid[i][j].isActive && grid[i][j].status===start){
                    grid[i][j].pathDistance=0;
                }
            }
        }
        //goal、若しくは誕生するセルが無かったら、また、生きてるセルに変化なしなら終わり
        if(goalQue.length===0||que.length===0||activeCellNum==que.length){
            //displayDistance
            {
                let hoge=0;
                displayDistance=0;
                for (let i = 0; i < goaledQue.length; i++) {
                    let ny=goaledQue[i][0],nx=goaledQue[i][1];
                    hoge=grid[ny][nx].pathDistance;
                    displayDistance=Math.max(displayDistance,hoge);
                }
            }
            //初回経路検出
            pathFinder();
            pathFound=true;
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
                    grid[ny][nx].pathDistance=grid[p[0]][p[1]].pathDistance+1;
                    continue;
                }
                if(grid[ny][nx].isActive)continue;
                grid[ny][nx].isActive=true;
                grid[ny][nx].pathDistance=grid[p[0]][p[1]].pathDistance+1;
            }
        }
        debug("AlgoDraw");
        drawGrid();
    }
    nowTime++;
}

function pathFinder(){
    if(goaledQue.length===0){
        //pathFinderの最後に置き換える
        debug("Done");
        nowPushing=none;
        nowTime=0;
        nowEdit=true;
        pathFound=false;
        //きょりを表示
        if(displayDistance===0){
            debug('きょり：なし');
            distance.innerText='きょり：なし';
        }else{
            debug(displayDistance);
            distance.innerText='きょり：'+displayDistance;
        }
        displayDistance=0;
        return;
    }
    //次のキュー
    var tmpQue=[];
    while (goaledQue.length!==0) {
        let p=goaledQue[goaledQue.length-1];
        goaledQue.pop();
        for(let i = 0; i < 4; i++) {
            let ny = p[0] + dy[i], nx = p[1] + dx[i];
            if(nx < 0 || ny < 0 || nx >= lineCells || ny >= rowCells) continue;
            if(grid[ny][nx].pathDistance===0)continue;
            if(grid[p[0]][p[1]].pathDistance-grid[ny][nx].pathDistance===1){
                grid[ny][nx].status=path;
                grid[ny][nx].fillTime=0;
                tmpQue.push([ny,nx]);
                break;
            }
        }
    }
    goaledQue=tmpQue;
    nowTime+=3;
    drawGrid();
}