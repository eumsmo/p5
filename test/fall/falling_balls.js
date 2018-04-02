let rain = [],length=0,is_background = (location.search=="?background");
const negative = num=> num>=0?-num:num;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  for (let i = 0; i < windowWidth/5; i++)
    RainParticle.new(i);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  if(!is_background)
    background(0);

  fill(255);

  for (let id in rain) {
    rain[id].display();
    rain[id].update();
  }
}

class RainParticle{
  constructor(id,x=random(width)){
      this.x = x;
      this.y = random(-100,0);
      this.yspeed = random(3,7);

      this.color = [random(255),random(255),random(255)];//[156,39,176];
      this.size = random(7.5,15);
      this.id = id;
  }

  die(){
    RainParticle.new(this.id);
  }

  update(){
    this.y += this.yspeed;

    stroke(255);
    fill(255);


    if(this.y>height+this.size) this.die();
  }

  display(){
    stroke(...this.color);
    fill(...this.color);

    ellipse(this.x,this.y,this.size,this.size);

  }

  static new(id){
    rain[id]= new RainParticle(id);
  }
}
