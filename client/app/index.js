var $ = require('jquery');

// Debug
window.$ = $;
window._ = require('lodash');

/**
 * Basically a partial application. Fixes the radix to ten so that parseInt can
 * be used as a callback.
 */
function _parseInt(int) { return parseInt(int, 10); }

/**
 * Return integer values representing the time taken from a string of the form:
 * MM:SS:ss (Where 's' means milisecond). The reutrned object will be of the
 * form { minutes, seconds, miliseconds }
 * @param object $container jQuery object
 * @return object
 */
function _getTime($container) {
  var initial = $container.text().split(':').map(_parseInt);
  return {
    minutes: initial[0],
    seconds: initial[1],
    miliseconds: initial[2]
  };
}

/**
 * Given a time object return a string that can be displayed to the user.
 * @param object Plain JS obj
 * @return string
 */
function _formatTime(obj) {
  var normalizedObject = _.map(obj, function(time) {
    if (time < 10) return '0' + time;
    return '' + time;
  });
  return _.values(normalizedObject).join(':');
}

/**
 * Tick the clock
 */
function tick() {
  var $time = $('#time'),
      clock = _getTime($time);

  setInterval(function() {

    if (clock.miliseconds === 99) {
      clock.miliseconds = 0;
      clock.seconds += 1;
    } else if (clock.seconds === 59) {
      clock.miliseconds = 0;
      clock.seconds = 0;
      clock.minutes += 1;
    } else {
      clock.miliseconds += 1;
    }

    $time.text(_formatTime(clock));
  }, 10);
}

function startTimer(e) {
  $(this).parents('.controls')
    .removeClass('stopped')
    .addClass('running');
  tick();
}

function stopTimer(e) {
  $(this).parents('.controls')
    .removeClass('running')
    .addClass('stopped');
  console.log('timer stopped');
}

function resetTimer(e) {
  console.log('reset that timer');
}

function recordLap(e) {
  if ($(this).hasClass('disabled')) return false;
  console.log('You just did a lap.');
}

module.exports = {

  initialize: function() {
    $('.start').on('click', startTimer);
    $('.stop').on('click', stopTimer);
    $('.reset').on('click', resetTimer);
    $('.lap').on('click', recordLap);
  }

};
