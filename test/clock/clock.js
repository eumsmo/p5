/* Ideia: The Coding Train's Coding Challenge
 * URL: https://youtu.be/E4RyStef-gY
 */

function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width/2,height/2);
  rotate(-90);

  /* Get Time */
  let hr = hour(),
      mn = minute(),
      sc = second();

  /* Set line's weight*/
  strokeWeight(8);
  noFill();

  /* Create Second's Arc */
  stroke(244,67,54);
  let secondAngle = map(sc,0,60,0,360);
  arc(0,0,300,300,0,secondAngle);

  /* Create Minute's Arc */
  stroke(33,150,243);
  let minuteAngle = map(mn,0,60,0,360);
  arc(0,0,280,280,0,minuteAngle);

  /* Create Hour's Arc */
  stroke(76,175,80);
  let hourAngle = map(hr,0,24,0,360);
  arc(0,0,260,260,0,hourAngle);

  /* Create Second Hand */
  push();
  rotate(secondAngle);
  stroke(244,67,54);
  line(0,0,100,0);
  pop();

  /* Create Minute Hand */
  push();
  rotate(minuteAngle);
  stroke(33,150,243);
  line(0,0,75,0);
  pop();

  /* Create Hour Hand */
  push();
  rotate(hourAngle);
  stroke(76,175,80);
  line(0,0,50,0);
  pop();

  /* Create Clock's Center */
  stroke(255);
  point(0,0)
}
