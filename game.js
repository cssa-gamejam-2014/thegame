var TARGET_FRAMERATE=0.5,
    camera = {
        // distances in metres
        // "top" and "right" are both screen edge locations in world form
        left: -1,
        top: 1,
        // pixels per metre
        zoom: 150,
        // width and height in pixels
        width: 0,
        height: 0,
    }

function draw_person(ctx, outfit) {
    var body=document.getElementById("body");
    ctx.drawImage(body,0,0);

    for (var key in outfit){
        console.log(key+"_"+outfit[key]);
        var object = document.getElementById(key+"_"+outfit[key])
        ctx.drawImage(object,0,0);
    }
}

function draw_frame_wrapper(ctx, elem) {
    var prev_time = Date.now() / 1000
    function inner() {
        ct = Date.now() / 1000
        dt = ct - prev_time
        draw_frame(ctx, elem, dt)
        prev_time = ct
    }
    return inner
}

function draw_frame(ctx, elem, dt) {
    function to_screen(xy) {
        // convert world coordinates into screen coordiantes
        return [
            (xy[0] - camera.left) * camera.zoom,
            (camera.top - xy[1]) * camera.zoom
        ]
    }

    // this code from
    // https://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
    // everything except the clearRect call is unnecessary unless we have
    // uncleared transforms, in which case clearrect's arguments will get
    // transformed according to those transforms which we have applied (and we
    // thus need to make a new "reset" transform)
    // Store the current transformation matrix
    // ctx.save()

    // Use the identity matrix while clearing the canvas
    // ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, camera.width, camera.height)
    ctx.fillStyle = "#FF0000"
    ctx.fillRect(0, 0, 100, 100)
    draw_person(ctx, levels[4].generator())

    // Restore the transform
    // ctx.restore()
}

function on_resize_wrapper(ctx, elem) {
    // I am a serious closure abuser
    return function() {
        // resize code
        // make the canvas the right size
        var elem = document.querySelector('canvas')
        elem.width = elem.offsetWidth
        elem.height = elem.offsetHeight
        camera.width = elem.width
        camera.height = elem.height

        // make it so that y = 0 is always in the middle of the screen
        camera.top = camera.height / camera.zoom / 2
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // initialisation code
    var elem = document.querySelector('#gamecanvas')
    var ctx = elem.getContext('2d')

    on_resize = on_resize_wrapper(ctx, elem)
    on_resize()
    window.addEventListener('resize', on_resize, false)

    window.setInterval(draw_frame_wrapper(ctx, elem), 1000 / TARGET_FRAMERATE)
});
/*
$(document).ready(function(){
    // Draw a person
    function drawPerson(outfit, position){
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        var posOffset = (position-1)*200+12
        
        var body=document.getElementById("body");
        ctx.drawImage(body,posOffset,10);
        
        for (var key in outfit){
            console.log(key+"_"+outfit[key]);
            var object = document.getElementById(key+"_"+outfit[key])
            ctx.drawImage(object,posOffset,10);
        }
    }
    // Draw a person
    function drawChoice(outfit, position){
        var c=document.getElementById("chooseCanvas");
        var ctx=c.getContext("2d");
        var posOffset = (position-1)*200+12
        
        for (var key in outfit){
            console.log(key+"_"+outfit[key]);
            var object = document.getElementById(key+"_"+outfit[key])
            ctx.drawImage(object,posOffset,10);
        }
    }

    
    var level = level4

    for (var x=1; x<11; x++){
        drawPerson(level.generator(), x);
    }
    
    
    valid1 = getRandom(10)+1;
    valid2 = getRandom(10)+1;
    while (valid2 == valid1){
        valid2 = getRandom(10)+1;
    }
    for (var x=1; x<11; x++){
        if (x == valid1 || x == valid2){
            drawChoice(level.generator(), x);
        } else {
            var invalid = level.randgen();
            while (level.validator(invalid)){
                invalid = level.randgen();
            }
            drawChoice(level.randgen(), x);
        }
    }
});*/
