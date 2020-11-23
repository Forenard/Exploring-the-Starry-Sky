function DrawGrid() {
    //現在の押されているボタンの取得
    button[0].onclick=()=>{
        debug("none");
        nowPushing=none;
    }
    for (let i = 1; i < button.length; i++) {
        button[i].onclick=()=>{
            debug(statusType[i]);
            nowPushing=i;
        }
    }
    
    

}

setInterval(DrawGrid,100);