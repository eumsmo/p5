
const positive = num=> num>=0? num : -num;
const negative = num=> num<0? num: -num;
const randomColor = () => [random(255),random(255),random(255)];
let points= [],is_background = (location.search=="?background"); 

/* Define Class */
class Point{
  constructor(x=100,y=200){
    this.x = x;
    this.y = y;
    this.color = randomColor();
    this.size = 5;
    this.history = [];
    this.history_max = 50;
  }

  show(){
    fill(...this.color);
    stroke(...this.color);
    ellipse(this.x,this.y,this.size,this.size);

    noFill();
    for (let i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-2,2);
      this.history[i].y += random(-2,2);
    }

    beginShape();
    this.history.forEach(pos=>{
      vertex(pos.x,pos.y);
    });
    endShape();
  }

  update(){
    this.x += random(-15,15);
    this.y += random(-15,15);

    if(this.x>width) this.x=width;
    else if(this.x<0) this.x=0;

    if(this.y>height) this.y=height;
    else if(this.y<0) this.y = 0;

    let v = createVector(this.x,this.y);
    this.history.push(v);

    if(this.history.length>this.history_max)
      this.history.shift();
  }

  dir(x,y){
    this.xspeed = this.speedRate*x;
    this.yspeed = this.speedRate*y;
  }

  static create(x,y){
    points.push(new Point(x,y));
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  if(is_background) background(0);
  points.forEach(point=>{
    point.update();
    point.show();
  });
}

function mousePressed(){
  Point.create(mouseX,mouseY);
}
