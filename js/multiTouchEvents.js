function tEvents() {
  this.touchstartX = 0;
  this.touchstartY = 0;
  this.touchendX = 0;
  this.touchendY = 0;

  this.eventZone = document.querySelector('.popup__content popup__content_level_1');
  this.eventZone.addEventListener('click', onDoorClick.bind(this));

  this.eventZone.addEventListener('touchstart', function(event) {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
  }, false);

  this.eventZone.addEventListener('touchend', function(event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    swipe();
  }, false);


  function swipe() {

    if (touchendX < touchstartX) {
        alert(swiped + 'left!');
    }
  },
  function twoFingerOneTap() {

  },
  function rotate() {

  }
};
