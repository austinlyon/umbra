var alphaBox = document.getElementById('alpha');
var betaBox  = document.getElementById('beta');
var gammaBox = document.getElementById('gamma');
var content  = document.getElementById('content');
var zero = {
  alpha: 0,
  beta: 0,
  gamma: 0,
};
var orient = {
  alpha: 0,
  beta: 0,
  gamma: 0,
};
var actual = {};

imperio.mobileRoomSetup(imperio.socket, imperio.room, function(socket) {
  var rooms = socket.rooms || 'no rooms';
  console.log('ROOMS AFTER MOBILE ROOM SETUP: ', rooms);
});

document.body.addEventListener('touchend', function() {
  if (orient.alpha > 180) orient.alpha = orient.alpha - 360;
  console.log('touch!', orient.alpha, orient.beta, orient.gamma);
  zero.alpha = orient.alpha;
  zero.beta = orient.beta;
  zero.gamma = orient.gamma;
  console.log('zero!', zero.alpha, zero.beta, zero.gamma);
  imperio.mobileTapShare(imperio.socket, imperio.room, tapFeedback, zero);
});

imperio.mobileGyroShare(imperio.socket, imperio.room, printGyroData);

function printGyroData(gyroObj) {
  // store orientation in global object to help capture zero orientation
  orient.alpha = gyroObj.alpha;
  orient.beta = gyroObj.beta;
  orient.gamma = gyroObj.gamma;

  // alpha raw is 0->360; This will set it to -180->180
  if (orient.alpha > 180) orient.alpha = orient.alpha - 360;

  // correct raw angles by offsetting by zero orientation
  actual.alpha = orient.alpha - zero.alpha;
  actual.beta = orient.beta - zero.beta;
  actual.gamma = orient.gamma - zero.gamma;

  alphaBox.innerHTML = `${actual.alpha}`;
  betaBox.innerHTML = `${actual.beta}`;
  gammaBox.innerHTML = `${actual.gamma}`;
}

function tapFeedback() {
  document.body.style.backgroundColor = 'lightblue';
  setTimeout(function() {
    document.body.style.backgroundColor = 'lightgreen';
  }, 200);

}
