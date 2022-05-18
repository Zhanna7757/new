let plrRaketka = document.querySelector(".player");
let comRaketka = document.querySelector(".comai");
let ballBlock = document.querySelector(".ball");
let fieldblock = document.querySelector(".playground");
let timer;
let compLevel= 0.1; 
let field = {
    w: 600,
    h: 400
}

let raketka  = {
    w : 5,
    h : 100,
    x : 0,
    y : field.h / 2 - 50,
    get left(){return this.x;},
    get top(){return this.y;},
    get right(){return this.left + this.w;},
    get bottom(){
        return this.y + this.h;
    },
    render: function(block = this.block){
        block.style.width = `${this.w}px`;
        block.style.height = `${this.h}px`;
        block.style.left = `${this.x}px`;
        block.style.top = `${this.y}px`;
    },
    
        
    }


let userRaketka = {
    x : 0,
    block: plrRaketka,
    __proto__:raketka
}

let compRaketka = {
    x : field.w -10,
    block: comRaketka,
    __proto__:raketka
}

let ball = {
    defaults:{
        x : field.w / 2,
        y : field.h / 2,
        speed:5,
    },
    x : field.w / 2,
    y : field.h / 2,
    r : 10, h : 20, w : 20,
    get top(){return this.y - this.r},
    get left(){return this.x - this.r},
    get right(){return this.x + this.r},
    get bottom(){return this.y + this.r},
    render: function(block){
        block.style.width = `${this.w}px`;
        block.style.height = `${this.h}px`;
        block.style.left = `${this.left}px`;
        block.style.top = `${this.top}px`;
    },
    speed: 5,
    velX: -5,
    velY: 5,
    reset (){
        this.x = this.defaults.x;
        this.y = this.defaults.y;
        // this.
        this.velX *= -1; 
    }
}
function render(){
    raketka.render(plrRaketka);
    compRaketka.render(comRaketka);
    ball.render(ballBlock);

}
function update(){
    //move the ball
    ball.x += ball.velX;
    ball.y += ball.velY;
    //отскок от краев
    if(ball.top < 0 || ball.bottom > field.h){
        ball.velY *= -1;
    }
    //отскок
    let player = (ball.x < field.w) ? userRaketka : compRaketka;
    if (collision(ball, compRaketka)){
        let  collPoint = (ball.y - player.top - player.h /2) / (player.h /2);
        let angleRad = collPoint *Math.PI/4;
        ball.velX = Math.cos(angleRad) * ball.speed;
        ball.velY = Math.sin(angleRad) * ball.speed;
        let dir = (ball.x < (ball.x < field.w / 2)) ? 1 : -1;


    ball.velX *= dir;
    }

    //if(collision(ball, userRaketka)|| collision(ball, compRaketka)){
       
        //let collPoint = ball.y -  
    }
    if(ball.left < 0){
        ball.reset();

    }
    if(ball.right > field.w){
        ball.reset();


    }

    // simple AI
    let newCompTop  = compRaketka.y + (ball.y - (compRaketka.y + compRaketka.h/2)) * compLevel;
    // console.log(compRaketka);
    if (newCompTop > 0 && newCompTop < (field.h - compRaketka.h/2)){
       compRaketka.y = newCompTop; 
    }
    



    ball.render(ballBlock);
    compRaketka.render(comRaketka);
}
let fps = 50;
timer  = setInterval(update,1000/fps);
fieldblock.addEventListener("mousemove", function(e){
    let rect = fieldblock.getBoundingClientRect();
    let userTop = e.y - rect.y - userRaketka.h /2;
    if (userTop < 0 || userTop > (field.h - userRaketka.h/2)) return;
    userRaketka.y = userTop;
    userRaketka.render();
    // console.log(rect, e);


});

function collision (a,b){
    console.log (a.top , b.bottom)
    //  if (a.left < 0 ) clearInterval(timer)
    return (a.left < b.right) && 
    (a.right > b.left) && 
    (a.top < b.bottom) && 
    (a.bottom > b.top);
}

render();

