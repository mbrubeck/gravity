"use strict";

var planets = [
  {
    mass: 200,
    x: 200,
    y: 350,
    vx: -2,
    vy: 0,
    radius: 15
  },
  {
    mass: 80,
    x: 250,
    y: 350,
    vx: -2,
    vy: 0,
    radius: 8
  },
  {
    mass: 100,
    x: 250,
    y: 50,
    vx: 2,
    vy: 0,
    radius: 10
  },
  {
    mass: 1000,
    x: 250,
    y: 250,
    vx: 0,
    vy: 0,
    radius: 30
  }
];

var dir = 1;

function start() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                          window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  function step() {
    if (dir == 0) return;
    drawFrame();
    advance();
    requestAnimationFrame(step);
  }
  step();
}

start();

function pause()  { dir =  0; }
function play()   { dir =  1; start(); }
function rewind() { dir = -1; start(); }

function drawFrame() {
  var ctx = document.getElementById("c").getContext('2d');
  ctx.clearRect(0, 0, 500, 500);

  var len = planets.length;
  for (var i = 0; i < len; i++) {
    var planet = planets[i];
    draw(ctx, planet);
  }
}

function draw(ctx, planet) {
  ctx.fillStyle = "rgb(200, 200, 200)";
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
}


// d0 = f(p0)
// p1 = p0 + v0
// v1 = v0 + d0



function advance() {
  var len = planets.length;
  for (var i = 0; i < len; i++) {
    var p0 = planets[i];
    p0.x += p0.vx;
    p0.y += p0.vy;

    for (var j = 0; j < len; j++) {
      if (i == j) continue;
      var p1 = planets[j];
      var massRatio = p1.mass / p0.mass;

      var dx = p1.x - p0.x;
      var dy = p1.y - p0.y;
      var d2 = dx*dx + dy*dy;

      p0.vx += dx / d2 * massRatio;
      p0.vy += dy / d2 * massRatio;
    }
  }
}

function distance(p0, p1) {
  return Math.sqrt(dx*dx + dy*dy);
}

function status(msg) {
  document.getElementById("status").textContent = msg;
}
