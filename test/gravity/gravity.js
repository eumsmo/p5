let grav = 0.25,
    grau = 90;

class Bola {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.xspeed=
    this.yspeed=
    this.xac=0;
    this.yac=grav;

    this.retorno = 0.9;

    this.tam = 50;
    Object.defineProperty(this,'tamh',{
      get(){return this.tam/2}
    });
  }

  update(){
    background(0);
    stroke(255,255,255);
    ellipse(this.x,this.y,this.tam,this.tam);

    this.yac = grav*sin(grau);
    this.xac = grav*cos(grau);

    this.xspeed+=this.xac;
    this.yspeed+=this.yac;

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
  bolas.push(new Bola(width/2,height/2));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  angleMode(DEGREES);
  bolas.forEach(bola=>bola.update());
}

window.addEventListener("deviceorientation",function(evt){
  if(evt.alpha) grau = evt.alpha;
});
