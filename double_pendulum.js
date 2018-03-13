const g = 9.8;        // meters per second
const pixels_per_meter = 100;

var canvas_width = 800;
var canvas_height = 500;

var framerate = 60;   // frames per second
var delta_t = 1.0;    // time scale
var th_1 = 3.0;       // our first generalized coordinate
var th_1_dot = 0.0;   // and its velocity
var th_2 = 0;         // our second generalized coordinate
var th_2_dot = 0;     // and its velocity

var l_1 = 1.0;        // meters
var l_2 = 1.0;        // meters
var m_1 = 4;          // kilograms
var m_2 = 4;          // kilograms

var pivot_x = canvas_width / 2; // pixels
var pivot_y = canvas_height / 2; // pixels

function setup() {
  createCanvas(canvas_width, canvas_height);
  frameRate(framerate);
  background(48, 47, 57);
}

function draw() {
  // clear();
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
  fill(20, 80, 180);
  // first pendulum bob
  ellipse(first_pendulum_x, first_pendulum_y, 15, 15)
  // second pendulum bob
  ellipse(second_pendulum_x, second_pendulum_y, 15, 15)
  time_step();
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
