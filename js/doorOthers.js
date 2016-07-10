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
    function _onButtonPointerDown(e) {
      var s = new Date();
      var start = s.getTime();
      (start - tt) < 300 ? cnt++ : cnt--;
      counter.style.height = cnt*20 + "px";
      console.log((start - tt) + ' ' + cnt);
      tt = start;
      checkCondition.apply(this);
    };

    function _onButtonPointerUp() {
        //  cnt--;
        //  counter.style.height = cnt*20 + "px";
    };

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
      var isOpened = false;
      isOpened = (cnt > 5) ? true : false;

      // Если все три кнопки зажаты одновременно, то откроем эту дверь
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
    var canvas = this.popup.querySelector(".door-riddle__canvas");
    button.addEventListener('dblclick', _dblclick.bind(this)); //todo: point!
    function _dblclick(e) {
      //  World.add(engine.world, [Bodies.circle(200, 200, 10)]);
      var Engine = Matter.Engine,
          Render = Matter.Render,
          World = Matter.World,
          Body = Matter.Body,
          Composites = Matter.Composites,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Constraint = Matter.Constraint;

      // create an engine
      var engine = Engine.create();

      // create a renderer
      var render = Render.create({
          element: canvas,
          engine: engine
      });

      mouseConstraint = MouseConstraint.create(engine, {
          element: render.canvas
      });

              // pass mouse to renderer to enable showMousePosition
            //  demo.render.mouse = demo.mouseConstraint.mouse;

      // create two boxes and a ground
      var target = Bodies.circle(200, 200, 10);
      var ball = Bodies.circle(350, 150, 20, { isStatic: true, density: 0.1 });
      var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

      var group = Body.nextGroup(true),
                  particleOptions = { friction: 0.00001, collisionFilter: { group: group }, render: { visible: false }, density: 1},
                  cloth = Composites.softBody(200, 200, 10, 2, 5, 5, false, 8, particleOptions);
                  cloth.bodies[0].isStatic = true;
                  cloth.bodies[9].isStatic = true;


      /*var elastic = Constraint.create({
                      pointA: cloth,
                      bodyB: target,
                      stiffness: 0.05,
                      render: {
                          lineWidth: 5,
                          strokeStyle: '#dfa417'
                      }});*/


      // add all of the bodies to the world
      World.add(engine.world, mouseConstraint);
      World.add(engine.world, [target, ball, cloth, ground]);

      // run the engine
      Engine.run(engine);

      // run the renderer
      Render.run(render);
    };


    document.addEventListener('pointerdown', _onButtonPointerDown.bind(this));

    function _onButtonPointerDown(e) {

    };
    //console.log(target.position.x==ball.position.x && target.position.y==ball.position.y);
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

    /*function onMotionChange(e) {
      var ag = e.accelerationIncludingGravity;
      if (ag.z > ag.x && ag.z > ag.y){ nodeAG.innerHTML += '<span>На столе</span>';}
      }
    window.addEventListener('devicemotion', onMotionChange, true);*/

    var block = this.popup.querySelector('.door-riddle__block_3');

    block.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    block.addEventListener('pointerleave', _onButtonPointerLeave.bind(this));
  //  block.addEventListener('pointerup', _onButtonPointerUp.bind(this));

    function _onButtonPointerMove(e) {
        checkCondition.apply(this);
        console.log('move!')
    };

    function _onButtonPointerLeave(e) {
      alert('ouch!');
    };


    function checkCondition() {
      if ((event.clientY < block.getBoundingClientRect().top
        && event.clientY < block.getBoundingClientRect().bottom)
        && event.clientX > block.getBoundingClientRect().right) {
          this.unlock();
      };
    }

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
