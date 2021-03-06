var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

var tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');
function removeTags(html) {
  var oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
}

//http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

var TARGET_FRAMERATE=25;
var SPEED = 80;
var WALK_WIDTH = null;

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
	
	if (position == 1){
		name = protagonist;
	} else {
		name = "Jed";
	}
	
	var charSpan = $();
	body = $("#body").attr("src");
	
	var img = $('<img>');
	img.attr('src', body);
	img.attr('class', 'clothabsolute');
	img.css('left', 175*(position-1));
	img.appendTo("#characterhtml_"+position);
	
	var charname = $('<span>'+name+'</span>');
	charname.attr('class', 'clothabsolute textrotate');
	
	// -18 offset is because for some reason the text rotation means the names look different distances
	charname.css('left', 175*(position-1)-28*(2-position));
	charname.appendTo("#characterhtml_"+position);
	
    for (var key in outfit){		
        var object = $("#"+key+"_"+outfit[key]).attr("src");
        img = $('<img>');
		img.attr('src', object);
		img.attr('class', 'clothabsolute');
		img.css('left', 175*(position-1));
		img.appendTo("#characterhtml_"+position);
    }
	
}

function clearChoice(position){
	var c=document.getElementById("chooseCanvas_"+position);
	var ctx=c.getContext("2d");
	ctx.clear();
	
}

function clearCharacter(position){
	
	$("#characterhtml_"+position).empty();
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
  }
var lastlevel = 0;
function draw_frame() {
	
	// Do the HTML version
	
	if ($(".walkingCharacter").length == 0){
		drawNewPerson();
	}
	
	$(".walkingCharacter").each(function(){
		offset = $(this).offset();
		currentLeft = offset.left;
		newLeft = currentLeft - SPEED / TARGET_FRAMERATE
		
		// NOT SURE WHY THIS HACK IS NEEDED TO PASS EXACTLY 400
		if (newLeft < 403 && newLeft > 400){
			newLeft = 399;
		}
		
		if (newLeft < 225){
			// Delete if necessary
			$(this).remove();
		} else {
			// Move otherwise			
			$(this).offset({ top: offset.top, left: newLeft});
		}
		
		// Create new character if necessary
		if (newLeft < WALK_WIDTH-175 && $(this).hasClass('endCharacter')){
			$(this).removeClass('endCharacter');
			
			drawNewPerson();
		}
	});
	// Create character if necessary
}

function drawNewPerson(){
	personhtml = $("<div></div>");
	personhtml.attr('class', 'walkingCharacter endCharacter');
	personhtml.css('left', WALK_WIDTH);
	personhtml.appendTo("#walkingscreen");
	var new_person = levels[currentLevel].generator();
	while (equalPeople(new_person, choices[correct[0]]) || equalPeople(new_person, choices[correct[1]])) {
		new_person = levels[currentLevel].generator();			
	}
	
	var img = $('<img>');
	img.attr('src', body);
	img.attr('class', 'clothabsolute');
	img.appendTo(personhtml);
	
    for (var key in person){		
        var object = $("#"+key+"_"+person[key]).attr("src");
        img = $('<img>');
		img.attr('src', object);
		img.attr('class', 'clothabsolute');
		img.appendTo(personhtml);
    }
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
	for (var x = 0; x < 2; x++){
		if (characters[x] != -1){
			clearCharacter(x+1);
			drawCharacter(choices[characters[x]], x+1);
		}
	}
	for (var x = 0; x < 2; x++){
		if (characters[x] == -1){
			clearCharacter(x+1);
			drawCharacter([], x+1);
		}
	}
	
	if (characters[0] == -1 || characters[1] == -1)
		$("#next").addClass("ui-state-disabled");
}

var frameDrawer;
var currentLevel = 0;
var setupinfo = false;
if (window.location.hash){
	var protagonist = removeTags(window.location.hash.replace("#", ""));
} else {
	var protagonist = null;
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
	
	$("#walkingscreen").empty();
}

function setUpStoryScreen(){
	
	if (stories[currentLevel] == null){
		
		// Put up correct backdrop
		$('#groundfloor').attr('src', $('#'+buildings[9][0]).attr('src'));
		$('#windows').attr('src', $('#'+buildings[9][1]).attr('src'));
		
		title = "Chapter "+(currentLevel+1)
		story = "<p>You've saved the world, but you're itching to break into some more buildings! Can you crack the code?</p>";
	} else {
		// Put up correct backdrop
		$('#groundfloor').attr('src', $('#'+buildings[currentLevel][0]).attr('src'));
		$('#windows').attr('src', $('#'+buildings[currentLevel][1]).attr('src'));
		
		titleAndStory = stories[currentLevel];
		title = titleAndStory[0];
		story = titleAndStory[1];
		
	}
	story = story.replace("%PROT%", protagonist);
	$("#backtext").html(title);
	$('#storyscreen').html("<h1>"+title+"</h1>"+story);
	failure = failures[0].replace("%PROT%", protagonist);
	$('#failurescreen').html(failure);
	if (successes[currentLevel] == null){
		$('#successscreen').html("<h1>Success!</h1><p>You solved the puzzle!</p>");
	} else {
		success = successes[currentLevel].replace("%PROT%", protagonist);
		$('#successscreen').html(success);
	}
}

function boot_up_level(){
	if (levels[currentLevel] == null){
		endTheGame();
	}
	
	// Set up info for the level
	if (levels[currentLevel].setup){
		setupinfo = levels[currentLevel].setup();
	}
	setUpStoryScreen();
	setUpGameScreen();
}

var scenes = {"story":0, "store":1, "hint":2, "failure":3, "success":4};
var sceneIDs = {"name": '#namescreen', "story":'#storyscreen', "store":'#gamescreen', "hint":'#hintscreen', "failure":'#failurescreen', "success":'#successscreen', "endgame":'#endscreen'};
currentScene = null;
chromeFirstRedraw = true;
function transitionScene(nextScene){
	switch(currentScene){
		case scenes.name:
			protagonist = removeTags($('#username').val());
			
			// Check they haven't just entered nothing
			if (protagonist == ''){
				$("#next").removeClass("ui-state-disabled");
				break;
			}
			
			if (getCookie(protagonist) != ""){
				currentLevel = parseInt(getCookie(protagonist));
			} 
			
			$('#namescreen').slideUp(function(){
				boot_up_level();
				transitionSceneTo(nextScene);
				framesDrawer = window.setInterval(draw_frame, 1000 / TARGET_FRAMERATE);
			});
			break;
		case scenes.story:
			$('#storyscreen').slideUp(function(){
				
				// redraw game screen to fix up Chrome
				if (chromeFirstRedraw){
					for (var x=0; x<10; x++){
						drawChoice(choices[x], x);
					}
					chromeFirstRedraw = false;
				}
				$('#back').removeClass("ui-state-disabled");
				transitionSceneTo(nextScene);
			});
			
			
			break;
		case scenes.store:
			// Various events happening from the store: all hide the game screen.
			$('#gamescreen').slideUp(function(){
				transitionSceneTo(nextScene);
			});
			break;
		case scenes.hint:
			$('#hintscreen').slideUp(function(){
				transitionSceneTo(nextScene);
			});
			break;
		case scenes.failure:
			$('#failurescreen').slideUp(function(){
				transitionSceneTo(nextScene);
			});
			break;
		case scenes.success:
			// From success can only transition to next story
			
			// Prevent double clicking
			$("#next").addClass("ui-state-disabled");
			
			// Progress to next level
			currentLevel++;
			
			$('#successscreen').slideUp(function(){
				boot_up_level();
				transitionSceneTo(nextScene);
			});
			break;
		default:
			console.log('default case hit in from scenes');
			transitionSceneTo(nextScene);
			break;
	}
	
}

function transitionSceneTo(nextScene){
	switch(nextScene){
		case scenes.name:
			$('#nexttext').text('Let\'s play!');
			$('#namescreen').slideDown(function(){
				$('#next').show();
			});
			break;
		case scenes.story:
			// Either finished previous level, or back to reading story
			$('#back').addClass("ui-state-disabled");
			$('#nexttext').text('Go to the costume store');
			$('#storyscreen').slideDown(function(){
				$("#next").show();
				$("#next").removeClass("ui-state-disabled");
			});
			break;
		case scenes.store:
	
			$('#nexttext').text('Walk in the door');
			if (characters[0] == -1 || characters[1] == -1){
				$("#next").addClass("ui-state-disabled");
			} else {
				$("#next").removeClass("ui-state-disabled");
			}
			// Set up the hint timer
			if (!hint1timer){
				hint1timer = setTimeout("showHintButton(1)", 15000);
			} else {
				
			}
			
			$('#gamescreen').slideDown(function(){
				$("#back").removeClass("ui-state-disabled");
			});
			break;
		case scenes.hint:
			$('#nexttext').text('Go to the costume store');
			$('#hintscreen').slideDown(function(){
				$("#next").removeClass("ui-state-disabled");
			});
			break;
		case scenes.failure:
			// Player got the costumes wrong
			setUpGameScreen();
			$('#nexttext').text('Go to the costume store');
			$('#failurescreen').slideDown(function(){
				$("#next").removeClass("ui-state-disabled");
			});
			break;
		case scenes.success:
			// Got the puzzle right
			
			setCookie(protagonist,currentLevel+1,365);
			
			// Clear hint timers
			window.clearTimeout(hint1timer);
			window.clearTimeout(hint2timer);
			hint1timer = 0;
			hint2timer = 0;
			$('#hint1').hide();
			$('#hint2').hide();
			
			// Hide game screen, show success
			$('#back').addClass("ui-state-disabled");
			
			
			if (currentLevel+1 >= levels.length){
				$('#successscreen').slideDown(function(){
					console.log('current level is '+currentLevel);
					console.log(currentLevel+1 >= levels.length);
					console.log(levels.length);
					endTheGame();
				});
			} else {
				$('#nexttext').text('Next chapter');
				$('#successscreen').slideDown(function(){
					$("#next").removeClass("ui-state-disabled");
				});
			}
			
			break;
		default:
			console.log("Switch case reached the end, something is badly broken!");
			break;
	}
	
	currentScene = nextScene;
}

function endTheGame(){
	if (typeof framesDrawer !== 'undefined'){
		clearInterval(framesDrawer);
	}
	$('#nexttext').text('You won the game!');
	$('#successscreen').slideUp(function(){
		$('#successscreen').html('<h1>Well done!</h1><p>You\'ve finished all of the levels so far! You are a solid code cracker!</p>');
		$('#successscreen').slideDown();
	});
	$("#next").hide();
}

function showHintButton(number){
	$('#hint'+number).slideDown();
}

$(document).ready(function(){
	WALK_WIDTH = $('#levelscreen').width();
	
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
	$('.characterSpan').click(function(){
		var character = $(this).attr('choice');
		
		deselectChoice(characters[character]);
	});
	
	$('#next').click(function(){
		// Don't work if disabled
		if ($(this).hasClass("ui-state-disabled"))
			return true;
		
		// Prevent double clicking
		$("#next").addClass("ui-state-disabled");
		
		// Banish the heading for more space
		$('#heading').slideUp();
		
		// Success or entered name goes to Story
		if (currentScene == scenes.success || currentScene == scenes.name){
			transitionScene(scenes.story);
		// If in store, check if guesses are correct
		} else if (currentScene == scenes.store){
			if (characters[0] == -1 || characters[1] == -1){
				return 0;
			}
			if (correct.indexOf(parseInt(characters[0])) != -1 && correct.indexOf(parseInt(characters[1])) != -1){
				transitionScene(scenes.success);
			} else {
				transitionScene(scenes.failure);
			}
		// Otherwise, go to the store
		} else {
			transitionScene(scenes.store);
		}
	});
	
	$('#back').click(function(){
		
		// Don't work if disabled
		if ($(this).hasClass("ui-state-disabled"))
			return true;
		
		transitionScene(scenes.story);
	});
	
	$('#hint1').click(function(){
		$('#hintscreen').slideUp(function(){
			$('#hintscreen').html(hints[currentLevel][0]);
			transitionScene(scenes.hint);
		});
		// Set up the hint timer
		hint2timer = setTimeout("showHintButton(2)", 30000);
	});
	
	$('#hint2').click(function(){
		$('#hintscreen').slideUp(function(){
			$('#hintscreen').html(hints[currentLevel][1]);
		});
		transitionScene(scenes.hint);
	});
	
	// Handle navigations a bit nicer
	$(window).unload(function() {
		clearInterval(framesDrawer);
	}); 
	
	if (levels[currentLevel].setup){
		setupinfo = levels[currentLevel].setup();
	}
	
	
	// Ask for name if it hasn't been provided
	if (protagonist == null){
		transitionSceneTo(scenes.name);
	} else {
		transitionSceneTo(scenes.story);
		boot_up_level();
		framesDrawer = window.setInterval(draw_frame, 1000 / TARGET_FRAMERATE);
	}

	
	inSelection = true;
});
