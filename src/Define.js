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

//cellのcolor
const cellColor = ["white","pink", "black", "darkblue", "darkred"];

//debug用
var statusType = ["none","way", "wall", "start", "goal"];

//cellのfillTime
const fillTime = 100;
//cellのサイズ
const cellSize = 10;
//gridの縦横サイズ
var rowCells;
var lineCells;

//どのbuttonが押されているかの判断
var nowPushing = none;
//buttonの要素を取得
var button = document.getElementsByName("button");

//現在のマウスがcanvas中かどうか
var isMouseIn = false;
//現在はクリック中か(canvas中)
var isClickDown = false;
//現在のマウス位置
var mouseX = 0;
var mouseY = 0;