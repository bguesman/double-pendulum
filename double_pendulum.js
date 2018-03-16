const g = 9.8;        // meters per second
const pixels_per_meter = 100;

var canvas_width = (2 / 3) * window.innerWidth;
var canvas_height = window.innerHeight + 1;

var framerate = 60;   // frames per second
var delta_t = 1.0;    // time scale

var th_1_0 = 3.0;     // initial conditions
var th_1_dot_0 = 0.0;
var th_2_0 = 0.7;
var th_2_dot_0 = 0;

var th_1 = th_1_0;            // our first generalized coordinate
var th_1_dot = th_1_dot_0;    // and its velocity
var th_2 = th_2_0;            // our second generalized coordinate
var th_2_dot = th_2_dot_0;    // and its velocity

var l_1 = 0.8;        // meters
var l_2 = 0.8;        // meters
var m_1 = 9;          // kilograms
var m_2 = 9;          // kilograms

var pivot_x = canvas_width / 2;   // pixels
var pivot_y = canvas_height / 2;  // pixels

var show_path = false;            // do we display the paths?
var stopped = false;

var canvas;           // p5 canvas

function setup() {
  canvas = createCanvas(canvas_width, canvas_height);
  canvas.parent('p5-container');
  frameRate(framerate);
  background(48, 47, 57);
}

function draw() {
  if (!show_path && !stopped) {
    clear();
    background(48, 47, 57);
  }

  first_pendulum_x = pivot_x + meters_to_pixels(l_1 * Math.sin(th_1));
  first_pendulum_y = pivot_y + meters_to_pixels(l_1 * Math.cos(th_1));
  second_pendulum_x = first_pendulum_x +
                        meters_to_pixels(l_2 * Math.sin(th_2));
  second_pendulum_y = first_pendulum_y +
                        meters_to_pixels(l_2 * Math.cos(th_2));
  // first pendulum
  stroke(45, 255, 59);
  line(pivot_x, pivot_y, first_pendulum_x, first_pendulum_y);
  // second pendulum
  line(first_pendulum_x, first_pendulum_y,
        second_pendulum_x, second_pendulum_y)
  noStroke();
  // first pendulum bob
  fill(30, 90, 200);
  ellipse(first_pendulum_x, first_pendulum_y, m_1 * 3, m_1 * 3)
  // second pendulum bob
  fill(201, 36, 118);
  ellipse(second_pendulum_x, second_pendulum_y, m_2 * 3, m_2 * 3)

  if (!stopped) {
    time_step();
  }
}

function time_step() {
  th_1 += th_1_dot * delta_t / framerate;
  th_2 += th_2_dot * delta_t / framerate;
  th_1_dot += theta_1_double_dot() * delta_t / framerate;
  th_2_dot += theta_2_double_dot() * delta_t / framerate;
}

function theta_1_double_dot() {
  return ((-g * (2 * m_1 + m_2) * Math.sin(th_1))
            - (m_2 * g * Math.sin(th_1 - 2 * th_2))
            - ((2 * m_2 * Math.sin(th_1 - th_2))
                  * (th_2_dot * th_2_dot * l_2
                    + th_1_dot * th_1_dot * l_1 * Math.cos(th_1 - th_2))))
          / (l_1 * (2 * m_1 + m_2 - m_2 * Math.cos(2 * th_1 - 2 * th_2)))
}

function theta_2_double_dot() {
  return (2 * Math.sin(th_1 - th_2) *
          ((th_1_dot * th_1_dot * l_1 * (m_1 + m_2))
            + (g * (m_1 + m_2)* Math.cos(th_1))
            + (th_1_dot * th_1_dot * l_2 * m_2 * Math.cos(th_1 - th_2))))
          / (l_2 * (2 * m_1 + m_2 - m_2 * Math.cos(2 * th_1 - 2 * th_2)))
}

function meters_to_pixels(meters) {
  return meters * pixels_per_meter;
}

function set_l1() {
  if (stopped) {
    clear();
    background(48, 47, 57);
  }
  l_1 = (document.getElementById("l1").value / 100.0) * 2 + 0.8
}

function set_l2() {
  if (stopped) {
    clear();
    background(48, 47, 57);
  }
  l_2 = (document.getElementById("l2").value / 100.0) * 2 + 0.8
}

function set_m1() {
  if (stopped) {
    clear();
    background(48, 47, 57);
  }
  m_1 = (document.getElementById("m1").value / 100.0) * 10 + 4
}

function set_m2() {
  if (stopped) {
    clear();
    background(48, 47, 57);
  }
  m_2 = (document.getElementById("m2").value / 100.0) * 10 + 4
}

function set_th_1() {
  if (stopped) {
    clear();
    background(48, 47, 57);
  }
  th_1 = (document.getElementById("th1").value / 100.0) * 6.26
}

function set_th_2() {
  if (stopped) {
    clear();
  }
  th_2 = (document.getElementById("th2").value / 100.0) * 6.26
}

function set_delta_t() {
  delta_t = (document.getElementById("delta_t").value / 100.0) * 1.8 + 0.1
}

function stop() {
  stopped = true;
}

function go() {
  stopped = false;
}

function reset() {
  if (stopped) {
    clear();
    background(48, 47, 57);
  }
  th_1 = th_1_0;
  th_1_dot = th_1_dot_0;
  th_2 = th_2_0;
  th_2_dot = th_2_dot_0;
}

function show_paths() {
  show_path = !show_path;
  if (!show_path) {
    document.getElementById("show_paths").style.backgroundColor = "rgb(37, 78, 223)";
  } else {
    document.getElementById("show_paths").style.backgroundColor = "rgb(176, 59, 240)";
  }
}

function go_to_steam() {
  window.location = "http://steamwith.us/BrownSTEAM.html";
}
