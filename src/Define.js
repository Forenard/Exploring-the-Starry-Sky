//Groval変数の宣言
var width;
var height;
var canvas;
var ctx;
var grid;

//cellのstatus
const none = 0;
const way = 1;
const wall = 2;
const start = 3;
const goal = 4;
const goaled=5;

//cellのcolor
const cellColor = ["white","white", "slategray", "gold", "hotpink","red"];
//cellのデフォルトカラーと枠線
const cellDefaultColor="midnightblue";
const borderDefaultColor="skyblue";
//cellの倍率
const cellSizePersent=0.95;

//debug用
var statusType = ["none","way", "wall", "start", "goal","goaled"];

//cellのfillTime
const fillTime = 5;
//cellのサイズ
const cellSize = 10;
//gridの縦横サイズ
var rowCells;
var lineCells;

//どのbuttonが押されているかの判断
var nowPushing = none;
var nowEdit=true;
//buttonの要素を取得
var button = document.getElementsByName("button");
var startButton = document.getElementById("playDisplay");
var distance=document.getElementById("distance");
//現在のマウスがcanvas中かどうか
var isMouseIn = false;
//現在はクリック中か(canvas中)
var isClickDown = false;
//現在のマウス位置
var mouseX = 0;
var mouseY = 0;

//現在の経過時間
var nowTime=0;
var algoSpan=5;

//algoSolver用
var dx = [0, 1, 0, -1];
var dy = [1, 0, -1, 0];
var activeCellNum=0;