const randomColor = () => [random(255),random(255),random(255)];
let points= [],
    is_background = (location.search=="?background");

/* Define Classe */
class Point{
  constructor(x=100,y=200){
    // Define posição inicial
    this.x = x;
    this.y = y;

    // Define cor da partícula
    this.color = randomColor();

    // Define tamanho da "cabeça"
    this.size = 5;

    // Define history e a quantidade maxima de posições salvas
    this.history = [];
    this.history_max = 50;
  }

  show(){
    // Coloca cor
    fill(...this.color);
    stroke(...this.color);

    // Cria cabeça
    ellipse(this.x,this.y,this.size,this.size);

    // Cauda movimenta
    for (let i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-2,2);
      this.history[i].y += random(-2,2);
    }

    // Cria cauda
    noFill();
    beginShape();
    this.history.forEach(pos=>{
      vertex(pos.x,pos.y);
    });
    endShape();
  }

  update(){
    // Movimenta cabeça
    this.x += random(-15,15);
    this.y += random(-15,15);

    // Compara se passou do limite
    if(this.x>width) this.x=width;
    else if(this.x<0) this.x=0;

    if(this.y>height) this.y=height;
    else if(this.y<0) this.y = 0;

    // Armazena posição atual para cauda
    let v = createVector(this.x,this.y);
    this.history.push(v);

    // Elimina excesso de posições salvas
    if(this.history.length>this.history_max)
      this.history.shift();
  }

  static create(x,y){
    points.push(new Point(x,y));
  }
}

/* Ajusta canvas */
function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  // Se houver "?background" nos parametros, atualizar fundo
  if(is_background) background(0);

  // Atualizar e mostrar todos pontos
  points.forEach(point=>{
    point.update();
    point.show();
  });
}

function mousePressed(){
  Point.create(mouseX,mouseY);
}
