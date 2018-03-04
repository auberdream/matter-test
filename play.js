// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Vector = Matter.Vector,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create()
  world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create objects and a ground
var circle = Bodies.circle(400, 200, 80);
var box = Bodies.rectangle(450, 50, 80, 80);
var polygon = Bodies.polygon(300, 200, 9, 50);
var trapezoid = Bodies.trapezoid(200, 300, 20, 300, 4);
var irregular = Bodies.fromVertices(200, 200, [Vector.create(20, 30), Vector.create(30, -10), Vector.create(0, -70), Vector.create(-50, 0), Vector.create(0, 50)])
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [circle, box, polygon, trapezoid, irregular, ground]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: true
            }
        }
    });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
