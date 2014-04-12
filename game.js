var TARGET_FRAMERATE=100,
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
},
people = [
],
last_person_spawn_time = 0,
spawn_rate = 0.5,
// MAXIMUM STRENGTH
// MAXIMUM ARMOUR
maximum_speed = 80

function drawChoice(outfit, position){
    var c=document.getElementById("chooseCanvas_"+position);
    var ctx=c.getContext("2d");
	
    for (var key in outfit){
        var object = document.getElementById(key+"_"+outfit[key]);
        ctx.drawImage(object, 0, 0);
    }
}

function draw_person(ctx, outfit) {
    var body=document.getElementById("body");
    ctx.drawImage(body,0,0);

    for (var key in outfit){
        if (key == "left") continue;
        var object = document.getElementById(key+"_"+outfit[key]);
        ctx.drawImage(object,0,0);
    }
}

// Taken from http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};

function draw_frame_wrapper(ctx, elem) {
    var prev_time = Date.now() / 1000;
    function inner() {
        ct = Date.now() / 1000;
        dt = ct - prev_time;
        draw_frame(ctx, elem, dt);
        prev_time = ct;
    }
    return inner;
}

function draw_frame(ctx, elem, dt) {
    function to_screen(xy) {
        // convert world coordinates into screen coordiantes
        return [
            (xy[0] - camera.left) * camera.zoom,
            (camera.top - xy[1]) * camera.zoom
        ];
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
    ctx.clearRect(0, 0, camera.width, camera.height);

    // move everyone forward
    for (var i = 0; i < people.length; i++) {
        people[i].left -= maximum_speed * dt;
        if (people[i].left < 0) {
            people.splice(i, 1);
        }
    }
    var ct = Date.now() / 1000;
    // LETS GET THIS PARTY SPAWNED
    if ((ct - last_person_spawn_time) > 1/spawn_rate) {
        last_person_spawn_time = ct;
        var new_person = levels[4].generator();
        new_person.left = elem.width;
        people.push(new_person);
    }

    // draw the people in our queue
    for (var i = 0; i < people.length; i++) {
        ctx.save();
        ctx.translate(people[i].left, elem.height - 200);
        draw_person(ctx, people[i]);
        ctx.restore();
    }

    var groundfloor = document.getElementById("building_ground");
    var windows = document.getElementById("building_windows");
    // Draw the upper levels of the building
    for (var offset = elem.height - windows.height; offset > -windows.height; offset -= windows.height) {
        ctx.drawImage(windows, 0, offset);
    }
    // Draw the ground floor of the building
    ctx.drawImage(groundfloor, 0, elem.height - groundfloor.height);

    // Restore the transform
    // ctx.restore()
}

function on_resize_wrapper(ctx, elem) {
    // I am a serious closure abuser
    return function() {
        // resize code
        // make the canvas the right size
        elem.width = elem.offsetWidth;
        elem.height = elem.offsetHeight;
        camera.width = elem.width;
        camera.height = elem.height;

        // make it so that y = 0 is always at the bottom of the screen
        camera.top = camera.height / camera.zoom;
    }
}

var selected = [];

var choices = [];
var correct = [11, 11];
var inSelection = false;

$(document).ready(function(){
	
	// Selection code for choices
	$('.chooseCanvas').click(function(){
		var id = $(this).attr('choice');
		
		var c=document.getElementById("chooseCanvas_"+id);
		var ctx=c.getContext("2d");
		
		if ($(this).hasClass('selected')){
			// remove selection
			var index = selected.indexOf(id);
			if (index > -1) {
				selected.splice(index, 1);
			}
			
			$(this).removeClass('selected');
			
			ctx.clear();
			drawChoice(choices[id], id);
		} else {
			$(this).addClass('selected');
			selected.push(id);
			
			// Red rectangle
			ctx.beginPath();
			ctx.lineWidth="5";
			ctx.strokeStyle="red";
			ctx.rect(5,5,160,190);
			ctx.stroke();
		}
	});
	

    // Code for drawing the choices
    // XXX FIX THIS AND THE LEVEL SELECTION CODE IN THE LOOP
    
	//var c=document.getElementById("chooseCanvas");
    //c.width = c.offsetWidth
    //c.height = c.offsetHeight
    level = levels[4];

    correct[0] = getRandom(10)+1;
    correct[1] = getRandom(10)+1;
    while (correct[0] == correct[1]){
        valid2 = getRandom(10)+1;
    }
    for (var x=0; x<10; x++){
        if (x == correct[0] || x == correct[1]){
			newperson = level.generator();
			choices.push(newperson);
            drawChoice(newperson, x);
        } else {
            var invalid = level.randgen();
            while (level.validator(invalid)){
                invalid = level.randgen();
            }
			choices.push(invalid);
            drawChoice(invalid, x);
        }
    }
    
    // Animation initialisation
    var elem = document.querySelector('#gamecanvas');
    var ctx = elem.getContext('2d');

    on_resize = on_resize_wrapper(ctx, elem);
    on_resize();
    var resizeListener = window.addEventListener('resize', on_resize, false);

    var framesDrawer = window.setInterval(draw_frame_wrapper(ctx, elem), 1000 / TARGET_FRAMERATE);
    
    inSelection = true;
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
