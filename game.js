function drawChoice(e,t,n){var r=document.getElementById("chooseCanvas_"+t);var i=r.getContext("2d");i.clear();for(var s in e){var o=document.getElementById(s+"_"+e[s]);i.drawImage(o,0,0)}i.rotate(-Math.PI/2);i.textAlign="center";i.font="20px Helvetica";if(getRandom(2)==0){ypos=25}else{ypos=145}i.fillText(possibletexts[getRandom(possibletexts.length)],-85,ypos);i.rotate(Math.PI/2)}function drawCharacter(e,t){var n=document.getElementById("character_"+t);var r=n.getContext("2d");r.clear();var i=document.getElementById("body");r.drawImage(i,0,0);for(var s in e){var o=document.getElementById(s+"_"+e[s]);r.drawImage(o,0,0)}r.rotate(-Math.PI/2);r.textAlign="center";r.font="20px Helvetica";if(t==1){name=protagonist}else{name="Jed"}r.fillText(name,-105,25);r.rotate(Math.PI/2)}function clearChoice(e){var t=document.getElementById("chooseCanvas_"+e);var n=t.getContext("2d");n.clear()}function clearCharacter(e){var t=document.getElementById("character_"+e);var n=t.getContext("2d");n.clear()}function equalPeople(e,t){return e.hat==t.hat&&e.shirt==t.shirt&&e.pants==t.pants&&e.shoes==t.shoes}function draw_person(e,t){var n=document.getElementById("body");e.drawImage(n,0,0);for(var r in t){if(r=="left")continue;var i=document.getElementById(r+"_"+t[r]);e.drawImage(i,0,0)}}function draw_frame_wrapper(e,t){function r(){ct=Date.now()/1e3;dt=ct-n;draw_frame(e,t,dt);n=ct}var n=Date.now()/1e3;return r}function draw_frame(e,t,n){function r(e){return[(e[0]-camera.left)*camera.zoom,(camera.top-e[1])*camera.zoom]}e.clearRect(0,0,camera.width,camera.height);if(currentLevel!=lastlevel){people=[];lastlevel=currentLevel}for(var i=0;i<people.length;i++){people[i].left-=maximum_speed*n;if(people[i].left<0){people.splice(i,1)}}var s=Date.now()/1e3;if(s-last_person_spawn_time>1/spawn_rate){last_person_spawn_time=s;var o=levels[currentLevel].generator();while(equalPeople(o,choices[correct[0]])||equalPeople(o,choices[correct[1]])){o=levels[currentLevel].generator()}o.left=t.width;people.push(o)}for(var i=0;i<people.length;i++){e.save();e.translate(people[i].left,t.height-200);draw_person(e,people[i]);e.restore()}var u=document.getElementById(buildings[currentLevel][0]);var a=document.getElementById(buildings[currentLevel][1]);for(var f=t.height-a.height;f>-a.height;f-=a.height){e.drawImage(a,0,f)}e.drawImage(u,0,t.height-u.height)}function on_resize_wrapper(e,t){return function(){t.width=t.offsetWidth;t.height=t.offsetHeight;camera.width=t.width;camera.height=t.height;camera.top=camera.height/camera.zoom}}function selectChoice(e){$("#chooseCanvas_"+e).addClass("selected");if(characters[0]==-1){characters[0]=e;nextdressed=(0+1)%2;drawCharacter(choices[e],1)}else if(characters[1]==-1){characters[1]=e;nextdressed=(1+1)%2;drawCharacter(choices[e],2)}else{deselectChoice(characters[nextdressed]);characters[nextdressed]=e;drawCharacter(choices[e],nextdressed+1);nextdressed=(nextdressed+1)%2}var t=document.getElementById("chooseCanvas_"+e);var n=t.getContext("2d");n.beginPath();n.lineWidth="5";n.strokeStyle="red";n.rect(5,5,160,190);n.stroke();if(characters[0]!=-1&&characters[1]!=-1){$("#next").removeClass("ui-state-disabled")}}function deselectChoice(e){var t=characters.indexOf(e);if(t>-1){characters[t]=-1}$("#chooseCanvas_"+e).removeClass("selected");var n=document.getElementById("chooseCanvas_"+e);var r=n.getContext("2d");r.clear();drawChoice(choices[e],e);for(var i=1;i<3;i++){var n=document.getElementById("character_"+i);var r=n.getContext("2d");r.clear()}for(var i=0;i<2;i++){if(characters[i]!=-1)drawCharacter(choices[characters[i]],i+1)}for(var i=0;i<2;i++){if(characters[i]==-1)drawCharacter([],i+1)}if(characters[0]==-1||characters[1]==-1)$("#next").addClass("ui-state-disabled")}function setUpGameScreen(){choices=[];correct=[];characters=[-1,-1];for(var e=0;e<10;e++){clearChoice(e)}for(var e=1;e<3;e++){clearCharacter(e);drawCharacter([],e)}level=levels[currentLevel];correct[0]=getRandom(10);correct[1]=getRandom(10);while(correct[0]==correct[1]){correct[1]=getRandom(10)}if(correct[0]>correct[1]){var t=correct[0];correct[0]=correct[1];correct[1]=t}for(var e=0;e<10;e++){$("#chooseCanvas_"+e).removeClass("selected");if(e==correct[0]||e==correct[1]){newperson=level.generator();if(e==correct[1]){while(equalPeople(newperson,choices[correct[0]])){newperson=level.generator()}}choices.push(newperson);drawChoice(newperson,e)}else{var n;var r=true;while(r){r=false;n=level.randgen();while(level.validator(n)){n=level.randgen()}choices.forEach(function(e){if(equalPeople(n,e)){r=true}})}choices.push(n);drawChoice(n,e)}}}function setUpStoryScreen(){titleAndStory=stories[currentLevel];title=titleAndStory[0];story=titleAndStory[1];story=story.replace("%PROT%",protagonist);failure=failures[0].replace("%PROT%",protagonist);success=successes[currentLevel].replace("%PROT%",protagonist);$("#backtext").html(title);$("#storyscreen").html("<h1>"+title+"</h1>"+story);$("#failurescreen").html(failure);$("#successscreen").html(success)}function transitionScene(e){switch(currentScene){case scenes.story:$("#storyscreen").slideUp(function(){if(chromeFirstRedraw)for(var t=0;t<10;t++){drawChoice(choices[t],t)}$("#back").removeClass("ui-state-disabled");transitionSceneTo(e)});break;case scenes.store:$("#gamescreen").slideUp(function(){transitionSceneTo(e)});break;case scenes.hint:$("#hintscreen").slideUp(function(){transitionSceneTo(e)});break;case scenes.failure:$("#failurescreen").slideUp(function(){transitionSceneTo(e)});break;case scenes.success:$("#next").addClass("ui-state-disabled");if(levels[currentLevel+1].setup){setupinfo=levels[currentLevel+1].setup()}currentLevel++;$("#successscreen").slideUp(function(){setUpStoryScreen();setUpGameScreen();transitionSceneTo(e)});break;default:console.log("default case hit in from scenes");transitionSceneTo(e);break}}function transitionSceneTo(e){switch(e){case scenes.story:$("#back").addClass("ui-state-disabled");$("#nexttext").text("Go to the costume store");$("#storyscreen").slideDown(function(){$("#next").removeClass("ui-state-disabled")});break;case scenes.store:$("#nexttext").text("Walk in the door");if(characters[0]==-1||characters[1]==-1)$("#next").addClass("ui-state-disabled");if(!hint1timer)hint1timer=setTimeout("showHintButton(1)",15e3);$("#gamescreen").slideDown(function(){$("#back").removeClass("ui-state-disabled")});break;case scenes.hint:$("#nexttext").text("Go to the costume store");$("#hintscreen").slideDown(function(){$("#next").removeClass("ui-state-disabled")});break;case scenes.failure:setUpGameScreen();$("#nexttext").text("Go to the costume store");$("#failurescreen").slideDown(function(){$("#next").removeClass("ui-state-disabled")});break;case scenes.success:clearTimeout(hint1timer);clearTimeout(hint2timer);hint1timer=0;hint2timer=0;$("#hint1").hide();$("#hint2").hide();$("#back").addClass("ui-state-disabled");$("#nexttext").text("Next chapter");$("#successscreen").slideDown(function(){$("#next").removeClass("ui-state-disabled")});if(currentLevel>=levels.length){endTheGame();return}break;default:console.log("Switch case reached the end, something is badly broken!");break}currentScene=e}function endTheGame(){clearInterval(framesDrawer);$("#next").addClass("ui-state-disabled");$("#nexttext").text("You won the game!")}function showHintButton(e){$("#hint"+e).slideDown()}var TARGET_FRAMERATE=25;camera={left:-1,top:1,zoom:150,width:0,height:0};people=[];last_person_spawn_time=0;spawn_rate=.5;maximum_speed=80;possibletexts=["buy me!","50% off!","only 99.95!","while stocks last!","click me!","you deserve it!","put me on!","99% fat free","be yourself!"];CanvasRenderingContext2D.prototype.clear=CanvasRenderingContext2D.prototype.clear||function(e){if(e){this.save();this.setTransform(1,0,0,1,0,0)}this.clearRect(0,0,this.canvas.width,this.canvas.height);if(e){this.restore()}};var lastlevel=0;var characters=[-1,-1];var choices=[];var correct=[];nextdressed=0;var frameDrawer;var currentLevel=0;var setupinfo=false;if(window.location.hash){var protagonist=escape(window.location.hash.replace("#",""))}else{var protagonist="Alex"}if(protagonist=="Katie"){currentLevel=11}var storyTime=true;var finishedLevel=false;var currentContainer="storyscreen";var hint1timer;var hint2timer;var scenes={story:0,store:1,hint:2,failure:3,success:4};var sceneIDs={story:"#storyscreen",store:"#gamescreen",hint:"#hintscreen",failure:"#failurescreen",success:"#successscreen"};currentScene=scenes.story;chromeFirstRedraw=true;$(document).ready(function(){$(".chooseCanvas").click(function(){var e=$(this).attr("choice");if($(this).hasClass("selected")){deselectChoice(e)}else{selectChoice(e)}});$(".characterCanvas").click(function(){var e=$(this).attr("choice");deselectChoice(characters[e])});$("#next").click(function(){if($(this).hasClass("ui-state-disabled"))return true;$("#next").addClass("ui-state-disabled");$("#heading").slideUp();if(currentScene==scenes.success){transitionScene(scenes.story)}else if(currentScene==scenes.store){if(characters[0]==-1||characters[1]==-1){return 0}if(correct.indexOf(parseInt(characters[0]))!=-1&&correct.indexOf(parseInt(characters[1]))!=-1){transitionScene(scenes.success)}else{transitionScene(scenes.failure)}}else{transitionScene(scenes.store)}});$("#back").click(function(){if($(this).hasClass("ui-state-disabled"))return true;transitionScene(scenes.story)});$("#hint1").click(function(){$("#hintscreen").slideUp(function(){$("#hintscreen").html(hints[currentLevel][0]);transitionScene(scenes.hint)});hint2timer=setTimeout("showHintButton(2)",3e4)});$("#hint2").click(function(){$("#hintscreen").slideUp(function(){$("#hintscreen").html(hints[currentLevel][1])});transitionScene(scenes.hint)});$(window).unload(function(){clearInterval(framesDrawer)});if(levels[currentLevel].setup){setupinfo=levels[currentLevel].setup()}setUpStoryScreen();setUpGameScreen();var e=document.querySelector("#gamecanvas");var t=e.getContext("2d");on_resize=on_resize_wrapper(t,e);on_resize();var n=window.addEventListener("resize",on_resize,false);framesDrawer=window.setInterval(draw_frame_wrapper(t,e),1e3/TARGET_FRAMERATE);inSelection=true})