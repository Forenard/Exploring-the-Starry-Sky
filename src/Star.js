function starMaker(n) {
    var star = document.createElement("div");
    star.className = "star";
    star.textContent = "★";
    for(var i = 0; i < n; i++) {
        starSet(star);
    }
}

function starSet(clone) {
    var starClone = clone.cloneNode(true);
    var starStyle = starClone.style;
    if(Math.random()>=0.5){
        starStyle.left = 100 * Math.random() + "%";
    }else{
        starStyle.top = 100 * Math.random() + "%";
        starStyle.left = -1 + "%";
    }
    let randomColor = "#";
    for (var i = 0; i < 6; i++) {
        randomColor += (16 * Math.random() | 0).toString(16);
    }
    starStyle.color=randomColor;
    starStyle.animationDelay = 8 * Math.random() + "s";
    starStyle.fontSize = ~~(10 * Math.random() + 2) + "px";
    document.body.appendChild(starClone);

    starClone.addEventListener("animationend", function() {
        this.parentNode.removeChild(this);
        var star = document.createElement("div");
        star.className = "star";
        star.textContent = "★";
        starSet(star);
    }, false)
}

//使用例。星を50個ふらせます。
starMaker(20)