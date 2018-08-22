let grav = 0.25,
    angles = {
      alpha: 0,
      beta: 0,
      gamma: 0
    };

class Bola {
  constructor(x,y) {
    this.x = x;
    this.y = y;

    this.tam = 50;
    Object.defineProperty(this,'tamh',{
      get(){return this.tam/2}
    });
  }

  update(){
    background(0);
    stroke(255,255,255);
    ellipse(this.x,this.y,this.tam,this.tam);

    this.x=map(angles.gamma,-45,45,0,width);
    this.y=map(angles.beta,-45,45,0,height);

    if(this.x>width-this.tamh)this.x=width-this.tamh;
    else if(this.x<=this.tamh)this.x=this.tamh;

    if(this.y>height-this.tamh)this.y=height-this.tamh;
    else if(this.y<=this.tamh)this.y=this.tamh;

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
  if(evt.alpha) angles.alpha = evt.alpha;
  if(evt.beta) angles.beta = (evt.beta>45)? 45: ((evt.beta<-45)? -45 : evt.beta);
  if(evt.gamma) angles.gamma = (evt.gamma>45)? 45: ((evt.gamma<-45)? -45 : evt.gamma);

});
