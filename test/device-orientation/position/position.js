let angles = {
      alpha: 0,
      beta: 0,
      gamma: 0
};

class Bola {
  constructor(x,y,tamanho,retorno,aceleracao) {
    this.x = x;
    this.y = y;
    this.xspeed=
    this.yspeed = 0;

    this.tam = tamanho;
    this.retorno = retorno;
    this.aceleracao = aceleracao;
    Object.defineProperty(this,'tamh',{
      get(){return this.tam/2}
    });
  }

  update(){
    background(0);
    stroke(255,255,255);
    ellipse(this.x,this.y,this.tam,this.tam);

    this.xac=map(angles.gamma,-45,45,-this.aceleracao,this.aceleracao);
    this.yac=map(angles.beta,-45,45,-this.aceleracao,this.aceleracao);

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
      this.yac = 0;
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
  let params = getURLParams(),
      retorno = (params.r)? float(params.r) : 0.25,
      tamanho = (params.t)? float(params.t) : 50,
      aceleracao = (params.a)? float(params.a) : 0.5;

  bolas.push(new Bola(width/2,height/2,tamanho,retorno,aceleracao));
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
