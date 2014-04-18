function getRandom(range){
    return Math.floor((Math.random()*range));
}

function shuffle(toshuffle) {
	array = toshuffle.slice(0);
	
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function negativeminusonemod(start, modulo){
	start = start - 1;
	if (start < 0){
		start = start+modulo;
	}
	return start;
}

colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
allclothes = ['hat', 'shirt', 'pants', 'shoes'];

levels = [
// LEVEL ONE

{
    generator : function(){
        person = []

        chanceOfWear = {}
        var clothes = ['shirt'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry] || !(entry in chanceOfWear)){
                person[entry] =  colours[getRandom(6)];
            }
        });
		
		person['pants'] = 'yellow';

        return person;
    },
    randgen : function(){
        person = []
        
        chanceOfWear = {}
        var clothes = ['shirt', 'pants'];;
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry] || !(entry in chanceOfWear)){
                person[entry] =  colours[getRandom(6)];
            }
        });

        return person;
    },
    validator : function(clothing){
        if (clothing.pants == 'yellow'){
            return true;
        } else {
            return false;
        }
    }
},
// LEVEL TWO
{
    generator : function(){
        person = []

        person['hat'] = colours[getRandom(6)];
        person['shoes'] = colours[getRandom(6)];
        if (getRandom(2) == 1){
            person['shirt'] = 'green';
            person['pants'] = 'green';
        } else {
            person['shirt'] = 'blue';
            person['pants'] = 'blue';
        }


        return person;
    },
    randgen : function(){
        person = []
        person['hat'] = colours[getRandom(6)];
        person['shirt'] = colours[getRandom(6)];
        person['pants'] = colours[getRandom(6)];
        person['shoes'] = colours[getRandom(6)];

        return person;
    },
    validator : function(clothing){
        if ((clothing.shirt == 'blue' && clothing.pants == 'blue') || (clothing.shirt == 'green' && clothing.pants == 'green')){
            return true;
        } else {
            return false;
        }
    }
},

// LEVEL THREE
{
    generator : function(){
		console.log("trying to generate");
		
        person = []

        chanceOfWear = {hat: 100, shirt: 100, pants: 100, shoes: 100}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
		
		thecolour = colours[getRandom(6)];
		
		first = clothes[getRandom(4)];
		second = clothes[getRandom(4)];
		while (first == second){
			second = clothes[getRandom(4)];
		}
		third = clothes[getRandom(4)];
		
		while (first == third || third == second){
			third = clothes[getRandom(4)];
		}
		
		person[first] = thecolour;
		person[second] = thecolour;
		person[third] = thecolour;
		
        clothes.forEach(function(entry){
            if (!(entry in person) && (getRandom(100) < chanceOfWear[entry] || !(entry in chanceOfWear))){
                person[entry] =  colours[getRandom(6)];
            }
        });

        return person;
    },
    randgen : function(){
        person = []

        chanceOfWear = {hat: 100, shirt: 100, pants: 100, shoes: 100}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

        return person;
    },
    validator : function(clothing){
		valid = false;
		colours.every(function(entry){
			occurances = 0;
			Object.keys(clothing).forEach(function(item){
				if (clothing[item] == entry){
					occurances++;
				}
			});
			if (occurances > 2){
				valid = true;
				// break
				return false;
			}
			// no break
			return true;
		});
		return valid;
    }
},

// LEVEL FOUR
{
    generator : function(){
        person = []

        chanceOfWear = {hat: 100, shirt: 80, pants: 100}
        var clothes = ['hat', 'shirt', 'pants'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

        person['shoes'] = person['hat'];

        return person;
    },
    randgen : function(){
        person = []

        chanceOfWear = {hat: 100, shirt: 80, pants: 100, shoes: 100}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

        return person;
    },
    validator : function(clothing){
        if (clothing.shoes == clothing.hat){
            return true;
        } else {
            return false;
        }
    }
},

// LEVEL FIVE

{
    generator : function(){
        person = []

        chanceOfWear = {hat: 60, shirt: 80, pants: 100}
        var clothes = ['hat', 'shirt', 'pants'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

        if (!person.hat){
            person['shoes'] = colours[getRandom(6)];
        }

        return person;
    },
    randgen : function(){
        person = []
        
        person['pants'] =  colours[getRandom(6)];
		
		if (getRandom(3) == 0){
			person['shirt'] = colours[getRandom(6)];
		} else {
			person['hat'] = colours[getRandom(6)];
			person['shoes'] = colours[getRandom(6)];
		}

        return person;
    },
    validator : function(clothing){
        if ((clothing.hat && !clothing.shoes) || (clothing.shoes && !clothing.hat)){
            return true;
        } else {
            return false;
        }
    }
},

// LEVEL SIX
{
    generator : function(){
        person = []

        var coloursUsed = colours.slice(0);
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            var index = getRandom(coloursUsed.length);
            person[entry] =  coloursUsed[index];
            coloursUsed.splice(index, 1);
        });

        if (!person.hat){
            person['shoes'] = colours[getRandom(6)];
        }

        return person;
    },
    randgen : function(){
		
        person = []

        chanceOfWear = {hat: 100, shirt: 100, pants: 100, shoes: 100}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

        return person;
    },
    validator : function(clothing){
		return clothing.hat != clothing.shirt && clothing.hat != clothing.pants && clothing.hat != clothing.shoes &&
			clothing.shirt != clothing.pants && clothing.shirt != clothing.shoes && clothing.pants != clothing.shoes;
    }
},

// LEVEL SEVEN
{
    generator : function(){
		console.log("starting up");
		
        person = []

        start = getRandom(colours.length);
		
		person.hat = colours[start];
		start = (start+1)%colours.length;
		person.shirt = colours[start];
		start = (start+1)%colours.length;
		person.pants = colours[start];
		start = (start+1)%colours.length;
		person.shoes = colours[start];

		console.log(person);
		
        return person;
    },
    randgen : function(){
		console.log("generating random");
        person = []
        chanceOfWear = {hat: 100, shirt: 100, pants: 100, shoes: 100}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
				
        var coloursUsed = colours.slice(0);
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
				var index = getRandom(coloursUsed.length);
				person[entry] =  coloursUsed[index];
				coloursUsed.splice(index, 1);
            }
        });

        return person;
    },
    validator : function(clothing){
		console.log("validating");
		return false;
		
		lastIndex = colours.indexOf(clothing.hat);
		checkClothes = ['shirt', 'pants', 'shoes'];
		checkClothes.forEach(function(entry){
			if (!clothing[entry])
				return false;
			thisIndex = colours.indexOf(clothing[entry]);
			if (!((lastIndex+1)%colours.length == thisIndex)){
				return false;
			}
			lastIndex = thisIndex;
		});
		
		return true;
    }
},

// LEVEL EIGHT
{
    generator : function(){
        person = []

        chanceOfWear = {hat: 25, shirt: 50, pants: 100, shoes: 0}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry] || !(entry in chanceOfWear)){
                person[entry] =  colours[getRandom(6)];
            }
        });
		
		if (person.shirt){
			person.shoes = 'green';
		} else {
			person.shoes = 'purple';
		}

        return person;
    },
    randgen : function(){
        person = []

        chanceOfWear = {hat: 25, shirt: 50, pants: 100, shoes: 0}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });
		
        if (getRandom(2) == 1){
            person['shoes'] = 'green';
        } else {
            person['shoes'] = 'purple';
        }

        return person;
    },
    validator : function(clothing){
		return (clothing.shirt && clothing.shoes == 'green') || (!clothing.shirt && clothing.shoes == 'purple');
    }
},

// LEVEL NINE
{
    generator : function(){
		console.log("trying to generate");
		
        person = []

        chanceOfWear = {hat: 50, shirt: 80, pants: 100, shoes: 80}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
		
		yellow = clothes[getRandom(4)];
		red = clothes[getRandom(4)];
		while (red == yellow){
			red = clothes[getRandom(4)];
		}
		
		person[yellow] = 'yellow';
		person[red] = 'red';
		
        clothes.forEach(function(entry){
            if (!(entry in person) && (getRandom(100) < chanceOfWear[entry] || !(entry in chanceOfWear))){
                person[entry] =  colours[getRandom(6)];
            }
        });

        return person;
    },
    randgen : function(){
        person = []

        chanceOfWear = {hat: 60, shirt: 85, pants: 100, shoes: 85}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

        return person;
    },
    validator : function(clothing){
		return (clothing.shirt == 'yellow' || clothing.hat == 'yellow' || clothing.pants == 'yellow' || clothing.shoes == 'yellow') && 
			(clothing.shirt == 'red' || clothing.hat == 'red' || clothing.pants == 'red' || clothing.shoes == 'red');
    }
},

// LEVEL TEN
{
    generator : function(){
        person = []
        
        order = setupinfo.order;

        start = getRandom(order.length);
		
		if (getRandom(2) == 0){
			person.hat = order[start];
			start = negativeminusonemod(start, order.length);
			person.shirt = order[start];
			start = negativeminusonemod(start, order.length);
			person.pants = order[start];
			start = negativeminusonemod(start, order.length);
			person.shoes = order[start];
		} else {
			person.hat = order[start];
			start = (start+1)%order.length;
			person.shirt = order[start];
			start = (start+1)%order.length;
			person.pants = order[start];
			start = (start+1)%order.length;
			person.shoes = order[start];
		}

        return person;
    },
    randgen : function(){
        person = []
        chanceOfWear = {hat: 100, shirt: 100, pants: 100, shoes: 100}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
		
		
        var coloursUsed = setupinfo['colours'].slice(0);
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
				var index = getRandom(coloursUsed.length);
				person[entry] =  coloursUsed[index];
				coloursUsed.splice(index, 1);
            }
        });
		
		console.log(person);
        return person;
    },
    validator : function(clothing){
		
		order = setupinfo.order;
		
		lastIndex = order.indexOf(clothing.hat);
		checkClothes = ['shirt', 'pants', 'shoes'];
		
		trueSoFar = checkClothes.forEach(function(entry){
			if (!clothing[entry])
				return false;
			thisIndex = order.indexOf(clothing[entry]);
			if (!((lastIndex+1)%order.length == thisIndex)){
				return false;
			}
			lastIndex = thisIndex;
		});
		if (trueSoFar){
			return true;
		}
		
		lastIndex = order.indexOf(clothing.hat);
		
		trueSoFar = true;
		trueSoFar = checkClothes.forEach(function(entry){
			if (!clothing[entry])
				return false;
			thisIndex = order.indexOf(clothing[entry]);
			if (!(negativeminusonemod(lastIndex, order.length) == thisIndex)){
				return false;
			}
			lastIndex = thisIndex;
		});
		return trueSoFar;
    },
    setup : function(){
		var setupinfo = [];
		setupinfo['colours'] = colours.slice(0);
		setupinfo['colours'].splice(getRandom(setupinfo['colours']).length, 1);
		setupinfo['colours'].splice(getRandom(setupinfo['colours']).length, 1);
		setupinfo['order'] = shuffle(setupinfo['colours']);
		
		return setupinfo;
	}
}];

stories = [
	"<h1>Chapter One: The Odd Job</h1><p>\"This has to be the oddest job we've been given, %PROT%.\"</p> <p>Jed was certainly right. As private investigators, we'd seen some interesting things, but nothing quite as bizarre.</p><p>\"Who has ever heard of an invite-only bank? How can such an exclusive organisation allow in people without any suits and ties? Can't a bank afford a less shabby building?\"</p><p>\"I noticed that too\", I added. \"We'd never fit in, we're too overdressed. We'd best pay a visit to the department store and select some more suitable costumes. Then if we act natural enough, we might be able to just walk in.\"</p>",
	
	"<h1>Chapter Two: A Return Visit</h1><p>\"Again?\" complained Jed. \"Will we be changing our name to '%PROT% and Jed, Mail Couriers?'\"</p><p>\"Whatever pays the bills, Jed.\"</p><p>\"At least we already have costumes this time. Let's get this over with.\"</p><p>\"Wait\", I said, motioning Jed to halt. \"Look at the line. Something has changed. I don't think we'll fit in with our old costumes anymore.\" It was time for another visit to the department store.</p>", 
	
	"<h1>Chapter Three: Interception</h1><p>\"Remind me why we're doing this again, please.\" complained Jed. \"What if our client finds out? What happened to 'whatever pays the bills'?\"</p><p>\"What happened to your sense of curiosity? You're the one that held the letter up to the light. You're the one who tracked down this place. We'll get in there, do a quick survey of the building, and get out.\"</p><p>\"Fine. But let's not poke our noses too deep.\"</p><p>\"Looks like we'll need to figure out the dress code again,\" I said, observing the people walking inside. \"Whoever sells bright colours around this town must be making a killing,\"</p>",
	
	"<h1><h1>Chapter Four: Tailing</h1><p>\"There!\" whispered Jed. \"He entered that building.\"</p><p>\"He was in a hurry\", I noted, \"he jumped the queue!\".</p><p>\"If he just stole something, I hardly think he'd be in the mood for politeness, %PROT%.\"</p><p>\"Okay. What's the plan?\"</p><p>Jed sighed. \"I guess we're sneaking into another of these weird buildings.\"</p></p>", 
	
	"<h1>Chapter Five: The Test</h1><p>\"Now this just seems silly\" I admitted to Jed. \"We're literally breaking into a restaurant for this guy.\"</p><p>\"If it's such an exclusive restaurant, why isn't the dress code a bit fancier?\" I puzzled.</p><p>\"Hippy commune?\" suggested Jed.</p><p>\"At this point I'm open to any theories, Jed.\"</p>",
	
	"<h1>Level Six</h1><p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "<p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "<p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here."
	
	
	
	
];

failures = ["<h1>No Entry</h1><p>As Jed and I approached the back of the queue, sporting our brand new costumes, the rest of the line fell silent. As the queue progressed, Jed pulled me aside.</p><p>\"Do you notice the guards are staring at us? I don't think they're going to allow us in.\"</p><p>\"You're right; they seem to be able to tell us apart. There must be a pattern that everyone else is following that we just don't fit. Perhaps we need to revisit the costume store and buy costumes that fit in.\"</p>"];
successes = ["<h1>No Questions Asked</h1><p>Jed and I joined the back of the queue without any noticeable reaction from the other members of the line. We followed the others through the bank entrance without any sign of challenge from the guards. </p><p>\"That was suprisingly easy\", I whispered. \"No questions or ID checks. We must have been able to fit in.\"</p><p>We found our way to the 24th office on the second floor, as instructed, nervously opening the door. On the desk there was a brown parcel with no labels or address. Jed looked relieved: \"Just as he told us, \" he said as he picked up the parcel.</p><p>\"Alright, we've got what we need. Let's keep it cool on the way out.\"</p>",


"<h1>Strange Behaviour</h1><p>Everything was exactly as before, with one exception: the object of interest was a small white envelope.</p><p>On the way out, a man seemed to recognise Jed and approached us. \"Ahoyo Bob three. Is this your newest underling?\" he inquired. Jed replied \"Yes indeed\" with an air of confidence. \"Alright. Good luck.\" the man said as he walked off. \"Don't forget: the dress code tomorrow is zero three eight zero jay.\"</p><p>...</p><p>\"Impressive performance in there Jed. Did you know the guy?\" I asked after a safe distance from the bank.</p><p>\"I didn't recognise him at all. And I know I've never had a nickname of Bob three.\"</p><p>\"I noticed his eyes looked glazed and inactive the whole time. Was he blind?\"</p><p>\"That could explain why he mistook me for someone else. This job only gets stranger.\"</p>",

"<h1>Alarming Sight</h1><p>As soon as we stepped in the building, alarms rang. The guards standing outside rushed in - straight past us. The scene quickly turned chaotic; people rushed out of the building whilst guards ran around frantically, to the tune of what sounded closer to a bombing siren than a fire alarm. Amidst the crowd we spotted the client, clearly carrying something, slip out of the building.</p>",

"<h1>Caught!</h1><p>The client had clearly been waiting for us. \"Come with me.\" he said sternly, like he was directing school-boys. Jed and I exchanged worried glances, getting ready to run. He noticed and softened his tone. \"There's nothing to worry about. But there's something we need to discuss.\"</p><p>He walked us to his small office and offered us chairs.</p><p>\"Although my sight may be poor, my smell is much keener than yours.\" he explained. \"However, you have both displayed an advanced level of code cracking proficiency. Your logic circuits are clearly well suited to breaking codes.\"</p><p>\"Err, thanks?\" replied Jed, cautiously, unsure of the compliment.</p><p>\"I have another task for you - or more accurately, a test.\"</p>", 

"Success! You got into building 5.", "Success! You got into building 6.", "Success! You got into building 7.", "Success! You got into the building.", "Success! You got into the building.", "Success! You got into the building. This was the last level - come back later for more!", "Success! You got into the building.", "Success! You got into the building.", "Success! You got into the building."];

hints = [
// Level 1
["\"Look at all the people that are getting into the bank. They must share something in common that allows each of them entry. We should buy two costumes which also have the characteristic that allows entry.\" suggested Jed."
, "Suddenly it hit me. Everyone had the same taste in pants!"],
// Level 2
["\"The entrants seem to have a choice of two options which both fit in.\" observed Jed.",
 "I came to realise realise that all entrants wore a matching set of shirt and pants, but there seemed to be a choice of colour."],
// Level 3
["\"There seems to be a lot of matching outfits.\" observed Jed.",
 "After hours of scoping the line, I came to notice the entrants were mostly wearing the same colour.."],
// Level 4
["\"Is there something happening in the hats and shoes?\" asked Jed.",
 "It seemed that there was a particular pair of clothing items which matched for every entrant."],
// Level 5
["\"People seem to be wearing at least two and at most 3 items of clothing. This must be a result of the dress code.\" said Jed.",
"I noticed there were two types of people entering the building, distinguished by their choice of hat and shoes."],
// Level 6
["\"Everyone is wearing a variety of colours today.\" observed Jed.",
"The dress code seemed to be something to do with the number of matching items."],
// Level 7
["\"I don't know why, but I keep checking the end of the line for a leprechaun with a pot of gold. The clothes also remind me of the refraction of light\" said Jed.", "Just when I thought I would go blind from all the bright colours, I began to discern a pattern in the order of the colours."],
// Level 8
["\"What's up with the shoes?\" asked Jed. \"Is there a particular reason why some people choose purple, and others choose green?\"", 
"I began to see a relationship between the shirt and shoes that all the entrants were wearing."],
// Level 9
["\"People here seem to all share some favourite colours,\" observed Jed.", 
"I came to see that everyone in the line favoured red and yellow."],
// Level 10
["\"I think there's an order on the colours again,\" suggested Jed.", 
"While there was an order on the colours, there seem to be disagreement on how to apply the order."]




]

buildings = [
["building_ground", "building_windows"],
["building_ground", "building_windows"],
["hideout_ground", "hideout_windows"],
["office_ground", "office_windows"],
["seafood_ground", "seafood_windows"],
["building_ground", "building_windows"],
["building_ground", "building_windows"],
["building_ground", "building_windows"],
["building_ground", "building_windows"],
["building_ground", "building_windows"],
["building_ground", "building_windows"],
["building_ground", "building_windows"],
["building_ground", "building_windows"]

]