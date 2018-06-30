var pi = 3.14159265359;

var yOffset = 300;
var xOffset = 300;

var x = 0;
var y = 0;

var a = 30;  //Circle radius
var b = 30;  //Position radius
var deg = 0;
var rad = 0;

var points = [[0, 0], [840, 840]];
var pointToBeDrawn = 0;

var xA = 0;
var xB = 0;
var yA = 0;
var yB = 0;
var r = 0;

var hasBeenCleared = 0;  //Set if the canvas has been cleared.

var width;
var height;

function setup() {
  width = 840;//window.innerWidth;
  height = 840;//window.innerHeight;
  createCanvas(width, height);
  background(200);
}

function draw() {
	if (hasBeenCleared) {
		background(200);
		points.forEach(function(i) {
			ellipse(i[0], i[1], 5, 5);
		});
		hasBeenCleared = 0;
	}
	printCoords("coords");
}

function mousePressed() {
	clear();
	hasBeenCleared = 1;
/*
	if (pointToBeDrawn == 1) {
		if (mouseX > points[0][0] && mouseY > points[0][1]) {
			points[pointToBeDrawn] = [mouseX, mouseY];
			pointToBeDrawn = 0;
		}
	}
	else {
		if (mouseX > points[1][0] || mouseY > points[1][1]) {
			points[0] = points[1];
			points[1] = [mouseX, mouseY];
		}
		else {
			points[pointToBeDrawn] = [mouseX, mouseY];
		}
		pointToBeDrawn = 1;
	}
*/
	if (pointToBeDrawn == 1) {
		if (mouseX > points[0][0] && mouseY > points[0][1]) {
			points[pointToBeDrawn] = [mouseX, mouseY];
			pointToBeDrawn = 0;
		}
		else {
			pointToBeDrawn = 0;
			points = [[0, 0], [840, 840]];
		}
	}
	else if (pointToBeDrawn == 0) {
		if (mouseX < points[1][0] && mouseY < points[1][1]) {
			points[pointToBeDrawn] = [mouseX, mouseY];
			pointToBeDrawn = 1;
		}
		else {
			pointToBeDrawn = 0;
			points = [[0, 0], [840, 840]];
		}
	}
}

function keyPressed() {
	//If space bar has been pressed.
	if (keyCode == 32) {
		xA = points[0][0];
		yA = points[0][1];
		xB = points[1][0];
		yB = points[1][1];
		calculate();
	}
	else if (keyCode == 8) {
		xA = 0;
		xB = 0;
		yA = 0;
		yB = 0;
		r  = 0;
		points = [[0, 0], [840, 840]];
		pointToBeDrawn = 0;
		hasBeenCleared = 1;
	}
}

var lineX;
var lineY;

function calculate() {
	var precision = 1;
	var deg = 0;
	var rad = 0;
	r = abs(xA - xB) / pi;
	var step = 2;
	
	background_color = 100;

	do {
		while (deg < 360 && x < xB) {
			rad = degToRad(deg);
			x = r * (rad - sin(rad)) + xA;
			y = r * (1 - cos(rad)) + yA;
			deg += step;
			//point(x, y);
		}
			
		if (y > yB) {
			r -= (y- yB) * 0.1;
		}
		else if (y < yB) {
			r += (yB - y) * 0.1;	
		}
		
		x = 0;
		deg = 0;
		rad = 0;

		if (abs(yB - y) > 300) {
			step = 2;
		}
		else if (abs(yB - y) > 100) {
			step = 1;
		}
		else if (abs(yB - y) > 1.5) {
			step = 0.1;
		}
		else /* if (abs(yB - y) > 1)*/{
			step = 0.001
		}
	}
	while (abs(yB - y) > precision);

	var lineX = xA;
	var lineY = yA;
	step = 0.1;

	while (xB - lineX > 0.1) {
		rad = degToRad(deg);
		lineX = r * (rad - sin(rad)) + xA;
		lineY = r * (1 - cos(rad)) + yA;
		deg += step;
		point(lineX, lineY);
	}
	console.log(r);
	console.log(deg);
}

function solver() {
	var AB = xB - xA;
	var AC = trigDistance(points[0], points[1]);
	var teta = radToDeg(acos(AB/AC));
	
	//a = r(teta - sin(teta))
	var ap = xB - xA;
	var r_ = ap / (teta - sin(teta));
	return r_;
}

/* Returns the distance between pointA and pointB using Pythagore's theorem.*/
function trigDistance(pointA, pointB) {
	xA = pointA[0];
	xB = pointB[0];
	yA = pointA[1];
	yB = pointB[1];
	return sqrt((xB-xA)**2 + (yB-yA)**2);
}

/* Convert rad to degrees */
function radToDeg(rad) {
	return rad * 180/pi;
}

/* Convert deg to radians. */
function degToRad(deg) {
	return deg * 3.14 / 180;
}

/* Prints the current coordinates of the cycloid curve to the element with elementID. */
function printCoords(elementID) {
	var coords = document.getElementById(elementID);
	coords.innerHTML  = "xA:" + xA + " yA:" + yA + " rel x:" + (xB - xA) + "<br/>";
	coords.innerHTML += "xB:" + xB + " yB:" + yB + " rel y:" + (yB - yA) + "<br/>";
	coords.innerHTML += "r:" + r;
}