let balls=[],max=100,ball_size;

function setup() {
  createCanvas(windowWidth,windowHeight);
  ball_size = width/25;
  BoucingBall.generate();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  //background(0);
  balls.forEach(ball=>ball.update());
}

function mousePressed(){
  BoucingBall.generate(mouseX,mouseY);
}


class BoucingBall{
  constructor(x,y,xdir,ydir,color,tam){
    this.x = x;
    this.y = y;
    this.col = color;
    this.tam = tam;
    this.half_tam = tam/2;
    this.speed = {
      x: 3*xdir,
      y: 3*ydir
    }
    this.variacao = 3;
  }

  update(){
    stroke(...this.col);
    fill(...this.col);
    ellipse(this.x,this.y,this.tam,this.tam);
    if(this.x>width-this.half_tam) this.speed.x= -this.variacao;
    else if(this.x<=this.half_tam) this.speed.x=this.variacao;

    if(this.y>height-this.half_tam) this.speed.y= -this.variacao;
    else if(this.y<=this.half_tam) this.speed.y= this.variacao;

    this.x+=this.speed.x;
    this.y+=this.speed.y;
  }

  static generate(x,y){
    /* Generate Random Start Position*/
    x = x || random(0,width);
    y = y || random(0,height);

    /* Generate Random Start Direction*/
    let xdir = random([-1,1]), ydir = random([-1,1]);

    /*Generate Random Color*/
    let rgb = [random(255),random(255),random(255)];

    /* Set Random Tam */
    let tam = random(ball_size/6,ball_size);

    /* If maximum, remove first ball */
    if(balls.length > max) balls.shift();

    /* Append to "balls" array */
    balls.push(new BoucingBall(x,y,xdir,ydir,rgb,tam));
  }
}
