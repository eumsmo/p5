let grav = 10,
    grau = 90;

let angles={
  alpha: 0,
  beta: 90,
  gamma: 180,
  t_alpha:0,
  t_beta:0,
  t_gamma:0
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
  bolas.push(new Bola(width/2,height/2,[255,0,255],'alpha'));
  bolas.push(new Bola(width/2,height/2,[255,255,0],'beta'));
  bolas.push(new Bola(width/2,height/2,[0,255,255],'gamma'));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  angleMode(DEGREES);
  bolas.forEach((bola,i)=>{
    bola.update();
    fill(bola.color);
    textAlign(LEFT);
    text(bola.name+":"+angles[bola.name] ,0,(i+1)*45);
    text(bola.name+"(sem ajuste):"+angles['t_'+bola.name] ,0,(i+1)*45+15);
  });
}

window.addEventListener("deviceorientation",function(evt){
  if(evt.alpha) angles.alpha = (angles.t_alpha = evt.alpha);
  if(evt.beta) angles.beta = (angles.t_beta = evt.beta)+180;
  if(evt.gamma) angles.gamma = (angles.t_beta = evt.gamma)*2+180;
});
