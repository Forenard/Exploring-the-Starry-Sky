/**
 * Groval一覧
 * width 横
 * height 縦
 * canvas Canvas
 * ctx Context2d
 * Grid [[]]
 */

//Groval変数の宣言
let width;
let height;
let canvas;
let ctx;
let grid;

//cellのstatus
const none=-1;
const way = 0;
const wall = 1;
const start = 2;
const goal = 3;

//debug用
let statusType=["way","wall","start","goal"];

//cellのfillTime
const fillTime=100;
//cellのサイズ
const cellSize=10;
//gridの縦横サイズ
let rowCells=height/cellSize;
let lineCells=width/cellSize;

//どのbuttonが押されているかの判断
let nowPushing=none;
//buttonの要素を取得
let button=document.getElementsByName("button");

//現在のマウスがcanvas中かどうか
let isMouseIn=false;
//現在はクリック中か(canvas中)
let isClickDown=false;

//マウス系の関数を登録
function onDown(e) {
    console.log("down");
    isClickDown=true;
}

function onUp(e) {
    console.log("up");
    isClickDown=false;
}
//いろいろここでやっちゃ～お
function onClick(e) {
    console.log("click");
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    if(nowPushing!==none){
        debug("x:"+x);
        debug("y:"+y);
    }
    //
}

function onOver(e) {
    console.log("mouseover");
    isMouseIn=true;
}

function onOut() {
    console.log("mouseout");
    isMouseIn=false;
    isClickDown=false;
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

    width = canvas.width;
    height = canvas.height;
    //gridの宣言と初期化
    grid = [[]];
    for (let i = 0; i < rowCells; i++) {
        let gridline=[]
        for (let j = 0; j < lineCells; j++) {
            gridline.push(new Cell(way,fillTime));
        }
        grid.push(gridline);
    }
}



