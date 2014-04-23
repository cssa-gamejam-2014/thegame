var TARGET_FRAMERATE=25;
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
};
people = [];
last_person_spawn_time = 0;
spawn_rate = 0.5;
// MAXIMUM STRENGTH
// MAXIMUM ARMOUR
maximum_speed = 80;

possibletexts = ['buy me!', '50% off!', 'only 99.95!', 'while stocks last!', 'click me!', 'you deserve it!', 'put me on!', '99% fat free', 'be yourself!'];
function drawChoice(outfit, position, text){
    var c=document.getElementById("chooseCanvas_"+position);
    var ctx=c.getContext("2d");
	ctx.clear();
	
    for (var key in outfit){
        var object = document.getElementById(key+"_"+outfit[key]);
        ctx.drawImage(object, 0, 0);
    }
	ctx.rotate(-Math.PI/2);
	ctx.textAlign = "center";
	ctx.font="20px Helvetica";
	if (getRandom(2) == 0){
		ypos = 25;
	} else {
		ypos = 145;
	}
	ctx.fillText(possibletexts[getRandom(possibletexts.length)],-85,ypos);
	ctx.rotate(Math.PI/2);
}

function drawCharacter(outfit, position){
    var c=document.getElementById("character_"+position);
    var ctx=c.getContext("2d");
	ctx.clear();
	
    var body=document.getElementById("body");
    ctx.drawImage(body,0,0);
	
    for (var key in outfit){
        var object = document.getElementById(key+"_"+outfit[key]);
        ctx.drawImage(object, 0, 0);
    }
	ctx.rotate(-Math.PI/2);
	ctx.textAlign = "center";
	ctx.font="20px Helvetica";
	
	if (position == 1){
		name = protagonist;
	} else {
		name = "Jed";
	}
	
	ctx.fillText(name,-105,25);
	ctx.rotate(Math.PI/2);
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

function equalPeople(person1, person2){
	return (person1.hat == person2.hat && person1.shirt == person2.shirt && person1.pants == person2.pants && person1.shoes == person2.shoes);
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
		while (equalPeople(new_person, choices[correct[0]]) || equalPeople(new_person, choices[correct[1]])) {
			new_person = levels[currentLevel].generator();			
		}
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

    var groundfloor = document.getElementById(buildings[currentLevel][0]);
    var windows = document.getElementById(buildings[currentLevel][1]);
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

var characters = [-1, -1];

var choices = [];
var correct = [];

nextdressed = 0;
function selectChoice(id){
	$("#chooseCanvas_"+id).addClass('selected');
	
	// if either are not dressed
	if (characters[0] == -1){
		characters[0] = id;
		nextdressed = (0+1)%2;
		drawCharacter(choices[id], 1);
	} else if (characters[1] == -1){
		characters[1] = id;
		nextdressed = (1+1)%2;
		drawCharacter(choices[id], 2);
	// Both are dressed. Dress least recently dressed one.
	} else {
		deselectChoice(characters[nextdressed]);
		characters[nextdressed] = id;
		drawCharacter(choices[id], (nextdressed+1));
		nextdressed = (nextdressed+1)%2;
	}
	
	// Red rectangle
	var c=document.getElementById("chooseCanvas_"+id);
	var ctx=c.getContext("2d");
	
	ctx.beginPath();
	ctx.lineWidth="5";
	ctx.strokeStyle="red";
	ctx.rect(5,5,160,190);
	ctx.stroke();
	
	if (characters[0] != -1 && characters[1] != -1){
		$("#next").removeClass("ui-state-disabled");
	}
}

function deselectChoice(id){
	
	// remove selection
	var index = characters.indexOf(id);
	
	if (index > -1) {
		characters[index] = -1;
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
	for (var x = 0; x < 2; x++){
		if (characters[x] != -1)
			drawCharacter(choices[characters[x]], x+1);
	}
	for (var x = 0; x < 2; x++){
		if (characters[x] == -1)
			drawCharacter([], x+1);
	}
	
	if (characters[0] == -1 || characters[1] == -1)
		$("#next").addClass("ui-state-disabled");
}

var frameDrawer;
var currentLevel = 10;
var setupinfo = false
if (window.location.hash){
	var protagonist = escape(window.location.hash.replace("#", ""));
} else {
	var protagonist = "Alex";
}
var storyTime = true;
var finishedLevel = false;
var currentContainer = "storyscreen";

var hint1timer;
var hint2timer;

function setUpGameScreen(){
	choices = [];
	correct = [];
	characters = [-1, -1];
	
	for (var x=0; x<10; x++){
		clearChoice(x);
	}
	for (var x=1; x<3; x++){
		clearCharacter(x);
		drawCharacter([], x);
	}

	level = levels[currentLevel];
	
	correct[0] = (getRandom(10));
	correct[1] = (getRandom(10));
	while (correct[0] == correct[1]){
		correct[1] = getRandom(10);
	}
	if (correct[0] > correct[1]){
		var temp = correct[0];
		correct[0] = correct[1];
		correct[1] = temp;
	}
	for (var x=0; x<10; x++){
		$("#chooseCanvas_"+x).removeClass('selected');
		if (x == correct[0] || x == correct[1]){
			newperson = level.generator();
			if (x == correct[1]){
				while (equalPeople(newperson, choices[correct[0]])){
					newperson = level.generator();
				}
			}
			choices.push(newperson);
			drawChoice(newperson, x);
		} else {
			var invalid;
			// Check not the same as anyone else
			var same = true;
			while (same){
				same = false;
				invalid = level.randgen();
				// Make sure cannot enter with this costume
				while (level.validator(invalid)){
					invalid = level.randgen();
				}
				// Check for equality with anyone else
				choices.forEach(function(person){
					if (equalPeople(invalid, person)){
						same = true;
					}
				});
			}
			choices.push(invalid);
			drawChoice(invalid, x);
		}
	}
}

function setUpStoryScreen(){
    titleAndStory = stories[currentLevel];
    title = titleAndStory[0];
    story = titleAndStory[1];
	story = story.replace("%PROT%", protagonist);
	failure = failures[0].replace("%PROT%", protagonist);
	success = successes[currentLevel].replace("%PROT%", protagonist);
	
    $("#backtext").html(title);
	$('#storyscreen').html("<h1>"+title+"</h1>"+story);
	$('#failurescreen').html(failure);
	$('#successscreen').html(success);
}

function endTheGame(){
	clearInterval(framesDrawer);
    $("#levelname").html("Done!");
	$('#'+currentContainer).slideUp(function(){
		$('#successscreen').slideDown(function(){
			$('#successscreen').html("That's the last level so far. You're good at this!");
			$("#next").addClass("ui-state-disabled");
			$("#back").addClass("ui-state-disabled");
		});
	});
}

function showHintButton(number){
	$('#hint'+number).slideDown();
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
	
	// Selection code for choices
	$('.characterCanvas').click(function(){
		var character = $(this).attr('choice');
		
		deselectChoice(characters[character]);
	});
	
	$('#next').click(function(){
		// Don't work if disabled
		if ($(this).hasClass("ui-state-disabled"))
			return true;
		$('#heading').slideUp();
		if (finishedLevel){
			console.log("finishing level off");
			$("#next").addClass("ui-state-disabled");
			
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
				$('#back').addClass("ui-state-disabled");
				$('#storyscreen').slideDown(function(){
					$('#nexttext').text('Go to the costume store');
					$("#next").removeClass("ui-state-disabled");
				});
			});
			finishedLevel = false;
			console.log("done, ready for next");
		} else if (storyTime){
			console.log("pushing past the story");
			$('#'+currentContainer).slideUp(function(){
				currentContainer = 'gamescreen';
				
				// redraw game screen to fix up Chrome
				for (var x=0; x<10; x++){
					drawChoice(choices[x], x);
				}
				$('#gamescreen').slideDown();
			});
			storyTime = false;
			$('#back').removeClass("ui-state-disabled");
			$('#nexttext').text('Walk in the door');
			$("#next").addClass("ui-state-disabled");
			
			// Set up the hint timer
			hint1timer = setTimeout("showHintButton(1)", 15000);
			
		// We successfully finished the level
		} else if (($('#gamescreen').css('display') == 'none')){
			$('#'+currentContainer).slideUp(function(){
				currentContainer = 'gamescreen';
				$('#gamescreen').slideDown();
			});
			storyTime = false;
			$('#back').removeClass("ui-state-disabled");
			$('#nexttext').text('Walk in the door');
			if (characters[0] == -1 || characters[1] == -1)
				$("#next").addClass("ui-state-disabled");
		// Clicked to walk in the door
		} else {
			if (characters[0] == -1 || characters[1] == -1){
				return 0;
			}
			if (correct.indexOf(parseInt(characters[0])) != -1 && correct.indexOf(parseInt(characters[1])) != -1){
			
				// Clear hint timers
				clearTimeout(hint1timer);
				clearTimeout(hint2timer);
				$('#hint1').hide();
				$('#hint2').hide();
				
				$('#gamescreen').slideUp(function(){
					currentContainer = 'successscreen';
					finishedLevel = true;
					$('#back').addClass("ui-state-disabled");
					$('#successscreen').slideDown(function(){
						$('#nexttext').text('Next chapter');
					});
				});
				
				
			} else {
				// Player got the costumes wrong
				$('#gamescreen').slideUp(function(){
					setUpGameScreen();
					currentContainer = 'failurescreen';
					$('#failurescreen').slideDown(function(){
						$('#nexttext').text('Go to the costume store');
					});
				});
			}
		}
	});
	
	$('#back').click(function(){
		
		// Don't work if disabled
		if ($(this).hasClass("ui-state-disabled"))
			return true;
		
		if (!storyTime){
			$('#'+currentContainer).slideUp(function(){
				$('#storyscreen').slideDown(function(){
					currentContainer = 'storyscreen';
				});
			});
			storyTime = true;
			$('#back').addClass("ui-state-disabled");
			$('#nexttext').text('Go to the costume store');
			$("#next").removeClass("ui-state-disabled");
		} else {
			console.log("clicked back when it was story time");
		}
	});
	
	$('#hint1').click(function(){
		$('#'+currentContainer).slideUp(function(){
			if (hints[currentLevel][0])
				$('#hintscreen').html(hints[currentLevel][0]);
			$('#nexttext').text('Go to the costume store');
			$("#next").removeClass("ui-state-disabled");
			$('#hintscreen').slideDown(function(){
				currentContainer = 'hintscreen';
			});
		});
		// Set up the hint timer
		hint2timer = setTimeout("showHintButton(2)", 30000);
	});
	
	$('#hint2').click(function(){
		$('#'+currentContainer).slideUp(function(){
			if (hints[currentLevel][1])
				$('#hintscreen').html(hints[currentLevel][1]);
			$('#nexttext').text('Go to the costume store');
			$("#next").removeClass("ui-state-disabled");
			$('#hintscreen').slideDown(function(){
				currentContainer = 'hintscreen';
			});
		});
	});
	
	// Handle navigations a bit nicer
	$(window).unload(function() {
		clearInterval(framesDrawer);
	}); 
	
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
