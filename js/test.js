/*var b = document.getElementById("butt");
b.addEventListener('mousedown', _onButtonPointerDown.bind(this));

var tt = 0;
var cnt = 0;
var start =  0;
function _onButtonPointerDown(e) {
    //e.target.classList.add('door-riddle__button_pressed');
    var s = new Date();
    var start = s.getTime();
    (start - tt) < 300 ? cnt ++ : cnt--;
    console.log((start - tt) + ' ' + cnt);
    tt = start;
    checkCondition.apply(this);
}

function checkCondition() {
    var isOpened = false;
    isOpened = (cnt > 5) ? true : false;

    // Если все три кнопки зажаты одновременно, то откроем эту дверь
    if (isOpened) {
        //this.unlock();
        alert('vualia!')
    }
}
*/


/*var b = document.getElementById("butt");
b.addEventListener('mousedown', _onButtonPointerDown.bind(this));

function _onButtonPointerDown(e) {
    //e.target.classList.add('door-riddle__button_pressed');
    checkCondition.apply(this);
}

function checkCondition() {
    var isOpened = false;

    // Если все три кнопки зажаты одновременно, то откроем эту дверь
    if (isOpened) {
        //this.unlock();
        alert('!')
    }
}*/
2
// module aliases
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
    element: document.body,
    engine: engine
});

mouseConstraint = MouseConstraint.create(engine, {
            element: render.canvas
        });

        // pass mouse to renderer to enable showMousePosition
      //  demo.render.mouse = demo.mouseConstraint.mouse;

// create two boxes and a ground
var boxA = Bodies.circle(200, 200, 10);
var boxB = Bodies.circle(350, 150, 20, { isStatic: true, density: 0.1 });
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

var group = Body.nextGroup(true),
            particleOptions = { friction: 0.00001, collisionFilter: { group: group }, render: { visible: false }, density: 1},
            cloth = Composites.softBody(200, 200, 10, 2, 5, 5, false, 8, particleOptions);
            cloth.bodies[0].isStatic = true;
            cloth.bodies[9].isStatic = true;


//var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });


            var elastic = Constraint.create({
                pointA: cloth,
                bodyB: boxA,
                stiffness: 0.05,
                render: {
                    lineWidth: 5,
                    strokeStyle: '#dfa417'
                }});


// add all of the bodies to the world
World.add(engine.world, mouseConstraint, [elastic]);
World.add(engine.world, [boxA, boxB, cloth, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

var b = document.getElementById("butt");
b.addEventListener('dblclick', _dblclick.bind(this));
function _dblclick(e) {
  // run the engine
  World.add(engine.world, [Bodies.circle(200, 200, 10)]);
};


document.addEventListener('mousedown', _onMousedown.bind(this));
function _onMousedown(e) {

};
console.log(boxA.position.x==boxB.position.x && boxA.position.y==boxB.position.y);




/*
3/

function onMotionChange(e) {
  // покажем значения параметров в реальном времени
  var ag = e.accelerationIncludingGravity;
  if(ag.z > ag.x && ag.z > ag.y){ nodeAG.innerHTML += '<span>На столе</span>';}
  }
window.addEventListener('devicemotion', onMotionChange, true);


  //if(ag.x > ag.y && ag.x > ag.z){ nodeAG.innerHTML += '<span>Горизонтально перед собой</span>';}
  //if(ag.y > ag.x && ag.y > ag.z){ nodeAG.innerHTML += '<span>Вертикально перед собой</span>';}
  //if(ag.z > ag.x && ag.z > ag.y){ nodeAG.innerHTML += '<span>На столе</span>';}
  //http://html5.by/blog/devicemotion-javascript-in-browser/



var b = document.getElementById("butt");
b.addEventListener('mousemove', _onButtonPointerMove.bind(this));
b.addEventListener('mouseleave', _onButtonPointerLeave.bind(this));
function _onButtonPointerMove(e) {
    checkCondition.apply(this);

};

function _onButtonPointerLeave(e) {
    //if ((event.clientY => b.getBoundingClientRect().top-5 && event.clientY < b.getBoundingClientRect().bottom+5) && event.clientX > b.getBoundingClientRect().right) console.log('WIN');
    //    //if (isOpened) {
          //  this.unlock();
      //  } else isOpened = false;
};


function checkCondition() {
    var isOpened = true;
}
*/
