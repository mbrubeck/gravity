"use strict";

var planets = [
  {
    x: 50,
    y: 50,
    vx: 1,
    vy: 0,
    radius: 10
  },
  {
    x: 100,
    y: 50,
    vx: 1,
    vy: 2,
    radius: 30
  }
];

var paused = false;

function start() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                          window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  function step() {
    if (paused) return;
    drawFrame();
    advance();
    requestAnimationFrame(step);
  }
  step();
}

function pause() {
  paused = !paused;
  if (!paused)
    start();
}

start();

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
}

function advance() {
  var len = planets.length;
  for (var i = 0; i < len; i++) {
    var p0 = planets[i];
    p0.x += p0.vx;
    p0.y += p0.vy;

    for (var j = 0; j < len; j++) {
      if (i == j) break;
      var p1 = planets[j];

      var dx = p0.x - p1.x;
      var dy = p0.y - p1.y;
    }
  }
}

function distance(p0, p1) {
  return Math.sqrt(dx*dx + dy*dy);
}

function status(msg) {
  document.getElementById("status").textContent = msg;
}
