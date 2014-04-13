var TARGET_FRAMERATE=10,
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

function drawCharacter(outfit, position){
    var c=document.getElementById("character_"+position);
    var ctx=c.getContext("2d");
	
    var body=document.getElementById("body");
    ctx.drawImage(body,0,0);
	
    for (var key in outfit){
        var object = document.getElementById(key+"_"+outfit[key]);
        ctx.drawImage(object, 0, 0);
    }
}

function clearChoice(position){
	var c=document.getElementById("chooseCanvas_"+position);
	var ctx=c.getContext("2d");
	ctx.clear();
}

function clearCharacter(position){
	var c=document.getElementById("character_"+position);
	var ctx=c.getContext("2d");
	ctx.clear();
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

var lastlevel = 0;
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
	
	// if the level has changed, clear all people
	if (currentLevel != lastlevel){
		people = [];
		lastlevel = currentLevel;
	}

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
        var new_person = levels[currentLevel].generator();
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
var correct = [];

function selectChoice(id){
	$("#chooseCanvas_"+id).addClass('selected');
	
	// if building up selection
	if (selected.length < 2){
		selected.push(id);
		drawCharacter(choices[id], selected.length);
	// if already selected 2 characters
	} else {
		deselectChoice(selected[1]);
		
		selected[1] = id;
		drawCharacter(choices[id], selected.length);
	}
	
	// Red rectangle
	var c=document.getElementById("chooseCanvas_"+id);
	var ctx=c.getContext("2d");
	
	ctx.beginPath();
	ctx.lineWidth="5";
	ctx.strokeStyle="red";
	ctx.rect(5,5,160,190);
	ctx.stroke();
	
	if (selected.length == 2){
		$("#next").removeClass("ui-state-disabled");
	}
}

function deselectChoice(id){
	
	// remove selection
	var index = selected.indexOf(id);
	
	
	if (index > -1) {
		selected.splice(index, 1);
	}
	
	$("#chooseCanvas_"+id).removeClass('selected');
	
	// clear choice selection
	var c=document.getElementById("chooseCanvas_"+id);
	var ctx=c.getContext("2d");
	ctx.clear();
	drawChoice(choices[id], id);
	
	// redraw characters
	for (var x = 1; x < 3; x++){
		// clear choice selection
		var c=document.getElementById("character_"+x);
		var ctx=c.getContext("2d");
		ctx.clear();
	}
	for (var x = 0; x < selected.length; x++){
		drawCharacter(choices[selected[x]], x+1);
	}
	
	$("#next").addClass("ui-state-disabled");
}

var frameDrawer;
var currentLevel = 8;
var setupinfo = false
var protagonist = escape(window.location.hash.replace("#", ""));
var storyTime = true;
var finishedLevel = false;
var currentContainer = "storyscreen";

function setUpGameScreen(){
	choices = [];
	correct = [];
	selected = [];
	
	for (var x=0; x<10; x++){
		clearChoice(x);
	}
	for (var x=1; x<3; x++){
		clearCharacter(x);
	}

	level = levels[currentLevel];
	
	correct.push(getRandom(10));
	correct.push(getRandom(10));
	console.log(correct[0] +" and " + correct[1] + " are correct");
	while (correct[0] == correct[1]){
		correct[1] = getRandom(10)+1;
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
}

function setUpStoryScreen(){
	story = stories[currentLevel].replace("%PROT%", protagonist);
	failure = failures[0].replace("%PROT%", protagonist);
	success = successes[currentLevel].replace("%PROT%", protagonist);
	
	$('#storyscreen').html(story);
	$('#failurescreen').html(failure);
	$('#successscreen').html(success);
}

function endTheGame(){
	clearInterval(framesDrawer);
	$('#'+currentContainer).slideUp(function(){
		$('#successscreen').slideDown(function(){
			$('#successscreen').html("That's the last level so far. You're good at this!");
			$("#next").addClass("ui-state-disabled");
			$("#back").addClass("ui-state-disabled");
		});
	});
}

$(document).ready(function(){
	
	// Selection code for choices
	$('.chooseCanvas').click(function(){
		var id = $(this).attr('choice');
		
		if ($(this).hasClass('selected')){
			deselectChoice(id);
		} else {
			selectChoice(id);
		}
	});
	
	$('#next').click(function(){
		console.log("I got clicked "+storyTime+selected.length);
		if (storyTime){
			$('#'+currentContainer).slideUp(function(){
				currentContainer = 'gamescreen';
				
				// redraw game screen to fix up Chrome
				for (var x=0; x<10; x++){
					drawChoice(choices[x], x);
				}
				$('#gamescreen').slideDown();
			});
			storyTime = false;
			$('#back').css('display', 'inline');
			$('#nexttext').text('Walk in the door');
			$("#next").addClass("ui-state-disabled");
		// We successfully finished the level
		} else if (finishedLevel){
			
			if (currentLevel+1 >= levels.length){
				endTheGame();
				return;
			}
			// Set up info for next level
			if (levels[currentLevel+1].setup){
				setupinfo = levels[currentLevel+1].setup();
			}
			
			// Progress to next level
			currentLevel++;
			
			
			$('#successscreen').slideUp(function(){
				setUpStoryScreen();
				setUpGameScreen();
				currentContainer = 'storyscreen';
				storyTime = true;
				$('#back').hide();
				$('#storyscreen').slideDown(function(){
					$('#nexttext').text('Go to the costume store');
				});
			});
			finishedLevel = false;
		// Clicked to walk in the door
		} else {
			if (selected.length != 2){
				return 0;
			}
			if (correct.indexOf(parseInt(selected[0])) != -1 && correct.indexOf(parseInt(selected[1])) != -1){
				
				$('#gamescreen').slideUp(function(){
					currentContainer = 'successscreen';
					finishedLevel = true;
					$('#back').hide();
					$('#successscreen').slideDown(function(){
						$('#nexttext').text('Leave the building');
					});
				});
				
				
			} else {
				// Player got the costumes wrong
				$('#gamescreen').slideUp(function(){
					setUpGameScreen();
					currentContainer = 'failurescreen';
					$('#failurescreen').slideDown(function(){
						storyTime = true;
						$('#nexttext').text('Go to the costume store');
					});
				});
			}
		}
	});
	
	$('#back').click(function(){
		if (!storyTime){
			$('#'+currentContainer).slideUp(function(){
				$('#storyscreen').slideDown(function(){
					currentContainer = 'storyscreen';
				});
			});
			storyTime = true;
			$('#back').hide();
			$("#next").removeClass("ui-state-disabled");
		} else {
			console.log("clicked back when it was story time");
		}
	});
	
	// Handle navigations a bit nicer
	$(window).unload(function() {
		clearInterval(framesDrawer);
	}); 
	
	$('#protagonist').text(protagonist);
	
	if (levels[currentLevel].setup){
		setupinfo = levels[currentLevel].setup();
	}
	
	setUpStoryScreen();
	setUpGameScreen();
	
	// Animation initialisation
	var elem = document.querySelector('#gamecanvas');
	var ctx = elem.getContext('2d');

	on_resize = on_resize_wrapper(ctx, elem);
	on_resize();
	var resizeListener = window.addEventListener('resize', on_resize, false);

	framesDrawer = window.setInterval(draw_frame_wrapper(ctx, elem), 1000 / TARGET_FRAMERATE);
	
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
