// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
  DoorBase.apply(this, arguments);

  var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var button = this.popup.querySelector('.door-riddle__button_non-active');
    var counter = this.popup.querySelector('.door-riddle__block_1');

    this.popup.addEventListener('pointermove', _onPopupPointerMove.bind(this));
    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));

    function getAngle(el, event) {
        var center_x = (el.offsetLeft) + (el.offsetWidth / 2);
        var center_y = (el.offsetTop) + (el.offsetHeight / 2);
        var radians = Math.atan2(event.pageX - center_x, event.pageY - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 100;

        el.style.transform = 'rotate(' + degree + 'deg)';

        if (degree < 190 && degree > 170) {
          button.classList.remove("door-riddle__button_non-active");
          button.classList.add("door-riddle__button_1");
        }
    };

    function _onPopupPointerMove(e){ getAngle(this.popup, e); }

    var tt = 0;
    var cnt = 0;
    var timerId;

    function _onButtonPointerDown(e) {
      if (timerId) clearInterval(timerId);
      var s = new Date();
      var start = s.getTime();
      (start - tt) < 300 ? cnt++ : cnt--;
      counter.style.height = cnt * 20 + "px";
      tt = start;
      checkCondition.apply(this);
    };

    function _onButtonPointerUp() {
      if (cnt > 0 ){
        timerId = setInterval(function() {
            cnt--;
            counter.style.height = cnt * 20 + "px";
        }, 90);
      }
      else if (cnt == 0) clearInterval(timerId);
    };

    function checkCondition() { if (cnt > 10) this.unlock(); }

   }

Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var pointerEventsChords = [0, 0, 0, 0];
    var alert = this.popup.querySelector(".door-riddle__alert");
    var button = this.popup.querySelector(".door-riddle__button_2");

    button.addEventListener('dblclick', _onButtonPointerDblClick.bind(this));
    window.addEventListener('devicemotion', _onMotionChange, true);

    this.popup.addEventListener('pointerdown', function(event) {
      pointerEventsChords[0] = event.screenX;
      pointerEventsChords[1] = event.screenY;
    }, false);

    this.popup.addEventListener('pointerup', function(event) {
      pointerEventsChords[2] = event.screenX;
      pointerEventsChords[3] = event.screenY;
      swipe();
    }, false);

    function swipe() {
      if (pointerEventsChords[2] < pointerEventsChords[0]) {
        alert.classList.add('door-riddle__alert_two');
      };
    }

    function _onButtonPointerDblClick(e) { this.unlock(); };

    function _onMotionChange(e) {
      var ag = e.accelerationIncludingGravity;
      (ag.z > ag.x && ag.z > ag.y) ? button.classList.remove("door-riddle__button_non-active") :
                                     button.classList.add("door-riddle__button_non-active");
    }
}

Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var block = this.popup.querySelector('.door-riddle__block_3');
    var button = this.popup.querySelector('.door-riddle__button_3');
    var button2 = this.popup.querySelector('.door-riddle__button_non-active');

    button.style.top = block.getBoundingClientRect().top + 2 + 'px';
    button.style.left = block.getBoundingClientRect().left - 5 + 'px';

    this.popup.addEventListener('pointermove', _onPopupPointerMove.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));
    button2.addEventListener('pointerdown', _onButtonPointerDown.bind(this));

    function _onButtonPointerUp(e) { button2.classList.add("door-riddle__button_non-active"); };

    function _onButtonPointerDown(e) {
        if (!button2.classList.contains("door-riddle__button_non-active")) {
          e.target.classList.add('door-riddle__button_pressed');
          this.showCongratulations();
        };
    };

    function _onPopupPointerMove(e) {
      if (event.clientY > button.getBoundingClientRect().top-5 && event.clientY < button.getBoundingClientRect().bottom + 5 &&
          event.clientX > button.getBoundingClientRect().left-5 && event.clientX < button.getBoundingClientRect().right + 5) {
            checkCondition.apply(this);
            button.style.top = event.clientY - 10 + 'px';
            button.style.left = event.clientX - 20 + 'px';

            if (!(event.clientY > block.getBoundingClientRect().top-5 && event.clientY < block.getBoundingClientRect().bottom + 5)
            || event.clientX < block.getBoundingClientRect().left - 10)  {
              button.style.top = block.getBoundingClientRect().top + 2 + 'px';
              button.style.left = block.getBoundingClientRect().left - 5 + 'px';
            }

            if ((event.clientY > block.getBoundingClientRect().top - 5
              && event.clientY < block.getBoundingClientRect().bottom + 5)
              && event.clientX > block.getBoundingClientRect().right) {
                button.style.top = block.getBoundingClientRect().top + 2 + 'px';
                button.style.left = block.getBoundingClientRect().right - 25 + 'px';
            };
       }
    };

    function checkCondition() {
      if ((event.clientY > block.getBoundingClientRect().top-5
        && event.clientY < block.getBoundingClientRect().bottom+5)
        && event.clientX > block.getBoundingClientRect().right) {
          button.style.top = block.getBoundingClientRect().top + 2 + 'px';
          button.style.left = block.getBoundingClientRect().right + 5 + 'px';
          button2.classList.remove("door-riddle__button_non-active");
      };
    }

    this.showCongratulations = function() { alert('Поздравляю! Игра пройдена!'); };
}

Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
