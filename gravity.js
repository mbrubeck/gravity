"use strict";

var gPlanets = [
  {
    mass: 200,
    x: 200,
    y: 350,
    vx: -2,
    vy: 0,
    radius: 12
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
    mass: 1500,
    x: 250,
    y: 250,
    vx: 0,
    vy: 0,
    radius: 25
  }
];

var dir = 0;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var gCanvas = document.getElementById("c");
var gContext = gCanvas.getContext('2d');

function draw() {
  drawFrame(gCanvas, gContext);
  drawPaths(gContext, gPlanets);
}

function forward() {
  function step() {
    if (dir < 1) return;
    drawFrame(gCanvas, gContext);
    advance(gPlanets);
    requestAnimationFrame(step);
  }
  step();
}

function reverse() {
  function step() {
    if (dir > -1) return;
    drawFrame(gCanvas, gContext);
    retreat(gPlanets);
    requestAnimationFrame(step);
  }
  step();
}

function pause()  { dir =  0; draw(); }
function play()   { dir =  1; forward(); }
function rewind() { dir = -1; reverse(); }

function drawFrame(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlanets(ctx, gPlanets);
}

function drawPlanets(ctx, planets) {
  var len = planets.length;
  for (var i = 0; i < len; i++) {
    var planet = planets[i];
    drawPlanet(ctx, planet);
  }
}

function drawPlanet(ctx, planet) {
  ctx.fillStyle = "rgb(200, 200, 200)";
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
}

function drawPaths(ctx, planets) {
  var temp = copy(planets);
  var len = temp.length;
  for (var dot = 0; dot < 30; dot++) {
    for (var f = 0; f < 6; f++)
      advance(temp);
    for (var i = 0; i < len; i++)
      drawDot(ctx, temp[i]);
  }
}

function drawDot(ctx, planet) {
  ctx.fillStyle = "rgb(200, 200, 200)";
  ctx.beginPath();
  ctx.arc(planet.x, planet.y, 3, 0, Math.PI * 2, true);
  ctx.fill();
}

function advance(planets) {
  // p1 = p0 + v0
  // d1 = f(p1)
  // v1 = v0 + d1

  var len = planets.length;
  for (var i = 0; i < len; i++) {
    var p0 = planets[i];
    p0.x += p0.vx;
    p0.y += p0.vy;
  }

  for (var i = 0; i < len; i++) {
    var p0 = planets[i];
    p0.dx = p0.dy = 0;

    for (var j = 0; j < len; j++) {
      if (i == j) continue;
      var p1 = planets[j];

      var massRatio = p1.mass / p0.mass;
      var x = p1.x - p0.x;
      var y = p1.y - p0.y;
      var d2 = x*x + y*y;

      p0.dx += x / d2 * massRatio;
      p0.dy += y / d2 * massRatio;
    }
  }

  for (var i = 0; i < len; i++) {
    var p0 = planets[i];
    p0.vx += p0.dx;
    p0.vy += p0.dy;
  }
}

function retreat(planets) {
  // v0 = v1 - d1
  // p0 = p1 - v0
  // d0 = f(p0)

  var len = planets.length;
  for (var i = 0; i < len; i++) {
    var p0 = planets[i];
    p0.vx -= p0.dx;
    p0.vy -= p0.dy;
  }

  for (var i = 0; i < len; i++) {
    var p0 = planets[i];
    p0.x -= p0.vx;
    p0.y -= p0.vy;
  }

  for (var i = 0; i < len; i++) {
    var p0 = planets[i];
    p0.dx = p0.dy = 0;

    for (var j = 0; j < len; j++) {
      if (i == j) continue;
      var p1 = planets[j];

      var massRatio = p1.mass / p0.mass;
      var x = p1.x - p0.x;
      var y = p1.y - p0.y;
      var d2 = x*x + y*y;

      p0.dx += x / d2 * massRatio;
      p0.dy += y / d2 * massRatio;
    }
  }
}

function distance(p0, p1) {
  return Math.sqrt(dx*dx + dy*dy);
}

function status(msg) {
  document.getElementById("status").textContent = msg;
}

function copy(a) {
  if (typeof a == "object") {
    var b = a instanceof Array ? [] : {};
    for (var i in a)
      if (a.hasOwnProperty(i))
        b[i] = copy(a[i]);
    return b;
  }
  return a;
}
