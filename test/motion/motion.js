let grav = 10,
    grau = 90;

let angles={
  alpha: 0,
  beta: 90,
  gamma: 180
};

class Bola {
  constructor(x,y,color=[255,255,255],angle) {
    this.x = x;
    this.y = y;
    this.xspeed=
    this.yspeed= 0;

    this.retorno = 0.9;

    this.color = color;
    this.name = angle;
    this.tam = 50;
    Object.defineProperty(this,'tamh',{
      get(){return this.tam/2}
    });
  }

  update(){

    fill(...this.color);
    ellipse(this.x,this.y,this.tam,this.tam);
    fill(0,0,0);
    textAlign(CENTER);
    text(this.name,this.x,this.y);

    this.xspeed=grav*cos(angles[this.name]);
    this.yspeed=grav*sin(angles[this.name]);

    this.x+=this.xspeed;
    this.y+=this.yspeed;

    if(this.x>width-this.tamh){
      this.xspeed*=-this.retorno;
      this.x=width-this.tamh;
    }
    else if(this.x<=this.tamh){
      this.xspeed*=-this.retorno;
      this.x=this.tamh;
    }

    if(this.y>height-this.tamh){
      this.yspeed*=-this.retorno;
      this.y=height-this.tamh;
    }
    else if(this.y<=this.tamh){
      this.yspeed*=-this.retorno;
      this.y=this.tamh;
    }
  }
}

let bolas = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  bolas.push(new Bola(width/2,height/2,[255,0,0],'alpha'));
  bolas.push(new Bola(width/2,height/2,[0,255,0],'beta'));
  bolas.push(new Bola(width/2,height/2,[0,0,255],'gamma'));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  angleMode(DEGREES);
  bolas.forEach(bola=>bola.update());
}

window.addEventListener("deviceorientation",function(evt){
  if(evt.alpha) angles.alpha = evt.alpha;
  if(evt.beta) angles.beta = evt.beta+180;
  if(evt.gamma) angles.gamma = evt.gamma*2+180;
});
