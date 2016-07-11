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
      /*  buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });*/

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

    var button = this.popup.querySelector('.door-riddle__button_1');
    var counter = this.popup.querySelector('.door-riddle__block_1');

    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
    button.addEventListener('pointerup', _onButtonPointerUp.bind(this));

    var tt = 0;
    var cnt = 0;
    var start =  0;
    var timerId;
    function _onButtonPointerDown(e) {
      if (timerId) clearInterval(timerId);
      var s = new Date();
      var start = s.getTime();
      (start - tt) < 300 ? cnt++ : cnt--;
      counter.style.height = cnt*20 + "px";
      tt = start;
      checkCondition.apply(this);
    };

    function _onButtonPointerUp() {
      timerId = setInterval(function() {
        if (cnt == 0) clearInterval(timerId);
          cnt--;
          counter.style.height = cnt*20 + "px";
      }, 90);

    };

    function checkCondition() {
      var isOpened = false;
      isOpened = (cnt > 10) ? true : false;

      if (isOpened) {
          this.unlock();
      }
     }
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

    var button = this.popup.querySelector(".door-riddle__button_2");


    //button.addEventListener('dblclick', _dblclick.bind(this)); //todo: point!



    button.addEventListener('pointerdown', _onButtonPointerDown.bind(this));

    function _onButtonPointerDown(e) {
      //  e.target.classList.add('door-riddle__button_pressed');
      //  checkCondition.apply(this);
    };

    function onMotionChange(e) {
      var ag = e.accelerationIncludingGravity;
      if (ag.z > ag.x && ag.z > ag.y){
        alert('На столе!');
          this.unlock();
      }
      }
    window.addEventListener('devicemotion', onMotionChange, true);

    function checkCondition() {
        var isOpened = true;


        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
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

    block.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    block.addEventListener('pointerleave', _onButtonPointerLeave.bind(this));
    button2.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
  //  block.addEventListener('pointerup', _onButtonPointerUp.bind(this));

    function _onButtonPointerDown(e) {
        if (!button2.classList.contains("door-riddle__button_non-active")) {
          e.target.classList.add('door-riddle__button_pressed');
          this.unlock();
          this.showCongratulations();
        };
    };


    function _onButtonPointerMove(e) {
        checkCondition.apply(this);
        button.style.display = "block";
        button.style.top = event.clientY+'px';
        button.style.left = event.clientX-300+'px';
        console.log('move!')
    };

    function _onButtonPointerLeave(e) {
      button.style.display = "none";
      alert('ouch!');
    };


    function checkCondition() {
      if ((event.clientY < block.getBoundingClientRect().top
        && event.clientY < block.getBoundingClientRect().bottom)
        && event.clientX > block.getBoundingClientRect().right) {
          button2.classList.remove("door-riddle__button_non-active");
          //this.unlock(); //тип доступной сделать
      };
    }

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
