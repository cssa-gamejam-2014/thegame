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

colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
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
		
        person = []

        start = getRandom(colours.length);
		
		person.hat = colours[start];
		start = (start+1)%colours.length;
		person.shirt = colours[start];
		start = (start+1)%colours.length;
		person.pants = colours[start];
		start = (start+1)%colours.length;
		person.shoes = colours[start];
		
        return person;
    },
    randgen : function(){
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
		
        return person;
    },
    validator : function(clothing){
		
		order = setupinfo.order;
		
		lastIndex = order.indexOf(clothing.hat);
		checkClothes = ['shirt', 'pants', 'shoes'];
		
		var trueSoFar = true; 
		
		checkClothes.forEach(function(entry){
			if (!clothing[entry]){
				trueSoFar = false;
			}
			thisIndex = order.indexOf(clothing[entry]);
			if (!((lastIndex+1)%order.length == thisIndex)){
				trueSoFar = false;
			}
			lastIndex = thisIndex;
		});
		if (trueSoFar){
			return true;
		}
		
		lastIndex = order.indexOf(clothing.hat);
		
		trueSoFar = true;
		checkClothes.forEach(function(entry){
			if (!clothing[entry])
				trueSoFar = false;
			thisIndex = order.indexOf(clothing[entry]);
			if (!(negativeminusonemod(lastIndex, order.length) == thisIndex)){
				trueSoFar = false;
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
},
	
// LEVEL ELEVEN
{
    generator : function(){
        person = []
        
		coloursNoRed = ['orange', 'yellow', 'green', 'blue', 'purple'];
		coloursNoYellow = ['red', 'orange', 'green', 'blue', 'purple'];
		
		if (getRandom(2) == 0){
			
			person.pants = "red";
			person.hat = colours[getRandom(colours.length)];
		} else {
			person.pants = coloursNoRed[getRandom(coloursNoRed.length)];
		}
		
		if (getRandom(2) == 0){
			
			person.shoes = "yellow";
			person.shirt = colours[getRandom(colours.length)];
		} else {
			person.shoes = coloursNoYellow[getRandom(coloursNoYellow.length)];
		}

        return person;
    },
    randgen : function(){
        person = []
        chanceOfWear = {hat: 50, shirt: 50, pants: 100, shoes: 100}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
		
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
				person[entry] =  colours[getRandom(colours.length)];
            }
        });
		
        return person;
    },
    validator : function(clothing){
		
		if (clothing.hat){
			if (!(clothing.pants == "red"))
				return false;
		} else {
			if (clothing.pants == "red")
				return false;
		}
		if (clothing.shirt){
			if (!(clothing.shoes == "yellow"))
				return false;
		} else {
			if (clothing.shoes == "yellow")
				return false;
		}
		
		return true;
    }
}];

stories = [
	["Chapter One: The Odd Job", "<p>\"This has to be the oddest job we've been given, %PROT%.\"</p> <p>Jed was certainly right. As private investigators, we'd seen some interesting things, but nothing quite as bizarre.</p><p>\"Who has ever heard of an invite-only bank? How can such an exclusive organisation allow in people without any suits and ties? Can't a bank afford a less shabby building?\"</p><p>\"I noticed that too\", I added. \"We'd never fit in, we're too overdressed. We'd best pay a visit to the department store and select some more suitable costumes. Then if we act natural enough, we might be able to just walk in.\"</p>"],
	
	["Chapter Two: A Return Visit", "<p>\"Again?\" complained Jed. \"Will we be changing our name to '%PROT% and Jed, Mail Couriers?'\"</p><p>\"Whatever pays the bills, Jed.\"</p><p>\"At least we already have costumes this time. Let's get this over with.\"</p><p>\"Wait\", I said, motioning Jed to halt. \"Look at the line. Something has changed. I don't think we'll fit in with our old costumes anymore.\" It was time for another visit to the department store.</p>"], 
	
	["Chapter Three: Interception", "<p>\"Remind me why we're doing this again, please.\" complained Jed. \"What if our client finds out? What happened to 'whatever pays the bills'?\"</p><p>\"What happened to your sense of curiosity? You're the one that held the letter up to the light. You're the one who tracked down this place. We'll get in there, do a quick survey of the building, and get out.\"</p><p>\"Fine. But let's not poke our noses too deep.\"</p><p>\"Looks like we'll need to figure out the dress code again,\" I said, observing the people walking inside. \"Whoever sells bright colours around this town must be making a killing,\"</p>"],
	
	["Chapter Four: Tailing", "<p>\"There!\" whispered Jed. \"He entered that building.\"</p><p>\"He was in a hurry\", I noted, \"he jumped the queue!\".</p><p>\"If he just stole something, I hardly think he'd be in the mood for politeness, %PROT%.\"</p><p>\"Okay. What's the plan?\"</p><p>Jed sighed. \"I guess we're sneaking into another of these weird buildings.\"</p></p>"],
	
	["Chapter Five: The Test", "<p>\"Now this just seems silly\" I admitted to Jed. \"We're literally breaking into a restaurant for this guy.\"</p><p>\"If it's such an exclusive restaurant, why isn't the dress code a bit fancier? Some people aren't even wearing shoes.\" I puzzled.</p><p>\"Hippy commune?\" suggested Jed.</p><p>\"At this point I'm open to any theories, Jed.\"</p>"],
	
	["Chapter Six: The Return Return Visit", "<p>The client fell far short of 'explaining everything'. He gave us as little information as possible, and refused to answer further questions. We learned that there was an additional intelligent life form inhabiting the planet. They  masqueraded as humans, aided by their own humanoid form. There was a recent split into two factions: one group desired infiltration for the furthering of the race's goals; the other was bent on destruction of the human race. Thankfully our client fell into the former category.</p><p>\"How's '%PROT% and Jed, saviours of the world'?\" I suggested. \"It's got a nice ring to it\".</p><p>Jed ignored me. \"And we've arrived back at the bank,\" he announced. \"Whatever is in those packages must be important.\"</p>"],
	
	["Chapter Seven: A Blank Book", "<p>\"We really should've thought of that,\" I confessed to Jed. \"Why would we ever think we could read another race's writing?\"</p><p>\"No, <em>HE</em> should have thought of that, not us, %PROT%.\" replied Jed, flicking through the 'code book' consisting of extremely thick pages with no visible writing. \"Do you get the feeling someone's playing a bit joke on us?\"</p><p>\"If someone is playing a joke, that's fine by me, given the sizeable payments we've already received.\"</p><p>\"I wonder how old the book is,\" said Jed, leaning in to smell. \"PHWOAR!\" he exclaimed, jerking back, \"It's really strong!\"</p><p>\"That's it!\" I realised. \"He said their smell is better than their sight - it makes sense their code book would be communicated in smells! We just need to figure out what each smell means. Then we can look up the code we were given, and see what to wear.\"</p><p>\"... Or we could just watch what people are wearing, again.\" reasoned Jed.</p><p>\"Yeah ok that seems simpler.\"</p>"], 
	
	["Chapter Eight: The Fourth Visit", "<p>\"I wish they didn't keep changing the dress code. It would make things so much easier for us.\" complained Jed.</p><p>\"If they didn't change the code you could just keep guessing it by trying different clothes.\" I suggested.</p><p>\"Then why don't they pick a better security method? Like a passphrase, or ID?\"</p><p>\"Passphrases can be overheard. Their eyesight might not be good enough to check IDs. If their pattern recognition is worse than ours, maybe a dress code is strong enough security for them.\"</p><p>\"Good points.\" said Jed. He scanned the line. \"I think I can see today's pattern.\"</p>"], 
	
	["Chapter Nine: The Last Piece", "<p>We approached the target building in the required costumes: purple hat and yellow shoes.</p><p>\"Something's not right,\" Jed whispered. \"Nobody else fits the pattern. Either the client smelt the code book index wrong, or the dress code was changed.\"</p><p>\"You're right. We should have known it wouldn't be that simple. We'll just have to crack the code ourselves.\"</p><p>\"Because my trash can doesn't already have enough green shoes.\" grumbled Jed sarcastically.</p>"],

    ["Chapter Ten: The Detonator!", "<p>It wasn't hard to spot the 'secret' base. It was the only building across the road with a line of bright colours queuing to enter.</p><p>\"We need to be quick,\" I urged, \"We don't know how much time there is left.\"</p><p>\"Stay calm, %PROT%, we need to concentrate.\" said Jed. \"Bob whatever said this would be a difficult code.\"</p><p>\"Put on this cologne,\" he added. \"We should mask our smell to avoid identification.\"</p>"],
    ["Chapter Eleven: A Lack of Recognition", "<p>On return to the client's office building, we were barred entry.</p><p>\"It's the cologne,\" I suggested, \"Our smell isn't recognised anymore.\"</p><p>\"Looks like we're cracking another dress code\" sighed Jed.</p>"],
    ["Test", "Testing here."],
    ["Test", "Testing here."],
    ["Test", "Testing here."],
];

failures = ["<h1>No Entry</h1><p>As Jed and I approached the back of the queue, sporting our brand new costumes, the rest of the line fell silent. As the queue progressed, Jed pulled me aside.</p><p>\"Do you notice the guards are staring at us? I don't think they're going to allow us in.\"</p><p>\"You're right; they seem to be able to tell us apart. There must be a pattern that everyone else is following that we just don't fit. Perhaps we need to revisit the costume store and buy costumes that fit in.\"</p>"];
successes = ["<h1>No Questions Asked</h1><p>Jed and I joined the back of the queue without any noticeable reaction from the other members of the line. We followed the others through the bank entrance without any sign of challenge from the guards. </p><p>\"That was suprisingly easy\", I whispered. \"No questions or ID checks. We must have been able to fit in.\"</p><p>We found our way to the 24th office on the second floor, as instructed, nervously opening the door. On the desk there was a brown parcel with no labels or address. Jed looked relieved: \"Just as he told us, \" he said as he picked up the parcel.</p><p>\"Alright, we've got what we need. Let's keep it cool on the way out.\"</p>",


"<h1>Strange Behaviour</h1><p>Everything was exactly as before, with one exception: the object of interest was a small white envelope.</p><p>On the way out, a man seemed to recognise Jed and approached us. \"Ahoyo Bob three three four three. Is this your newest underling?\" he inquired. Jed replied \"Yes indeed\" with an air of confidence. \"Alright. Good luck.\" the man said as he walked off. \"Don't forget: the dress code tomorrow is zero three eight zero jay.\"</p><p>...</p><p>\"Impressive performance in there Jed. Did you know the guy?\" I asked after a safe distance from the bank.</p><p>\"I didn't recognise him at all. And I know I've never had a nickname of Bob.\"</p><p>\"I noticed his eyes looked glazed and inactive the whole time. Was he blind?\"</p><p>\"That could explain why he mistook me for someone else. This job only gets stranger.\"</p>",

"<h1>Alarming Sight</h1><p>As soon as we stepped in the building, alarms rang. The guards standing outside rushed in - straight past us. The scene quickly turned chaotic; people rushed out of the building whilst guards ran around frantically, to the tune of what sounded closer to a bombing siren than a fire alarm. Amidst the crowd we spotted the client, clearly carrying something, slip out of the building.</p>",

"<h1>Caught!</h1><p>The client had clearly been waiting for us. \"Come with me.\" he said sternly, like he was directing school-boys. Jed and I exchanged worried glances, getting ready to run. He noticed and softened his tone. \"There's nothing to worry about. But there's something we need to discuss.\"</p><p>He walked us to his small office and offered us chairs.</p><p>\"Although my sight may be poor, my smell is much keener than yours.\" he explained. \"However, you have both displayed an advanced level of code cracking proficiency. Your logic circuits are clearly well suited to breaking codes.\"</p><p>\"Err, thanks?\" replied Jed, cautiously, unsure of the compliment.</p><p>\"I have another task for you - or more accurately, a test.\"</p>", 

"<h1>A Passing Grade</h1><p>We entered the restaurant just to prove we'd cracked the code. It looked like any other fancy restaurant, with the exception of a large changing room. Bright colours entered, suits and ties exited. \"Dressing up twice seems like a lot of effort\" remarked Jed.</p><p>Our client was visibly impressed. \"Our best code breakers spent weeks on this place after we couldn't get a reservation. You humans must have specialised pattern recognition hardware.\"</p><p>\"You mean you're not ... human?\" I asked.</p><p>\"Come. I will explain everything.\"</p>",


"<h1>Mission Possible</h1><p>We knew the drill by now. We retrieved the package and exited the building without event.</p>",

"<h1>The Egg Hunt</h1><p>It was just where the client said it would be. The egg, just like the two others he showed us, but bright red.</p><p>\"For such an important item, there's next to zero security.\" observed Jed. \"It's in this unguarded room for anyone to grab.\"</p><p>\"Ready?\"</p><p>\"Ready.\"</p><p>I put the egg in my pocket, and we made for the exit.</p>", 

"<h1>Watched</h1><p>As we retrieved the next package, I couldn't shake the feeling we were being watched. But we left the building without challenge, once again.</p>", 

"<h1>The Trap!</h1><p>The moment we entered the building, the guards closed the doors behind us. More guards emerged to surround us, cutting off any option of flight.</p><p>...</p><p>His preference for senses was clearly evident: he had the smallest eyes I'd ever seen, next to the largest nose I'd ever seen. His choice of clothing screamed super villain.</p><p>\"Good afternoon my dears! I'm your host, Bob one. What a lovely day to watch the destruction of the human race! From this tower you will view my brilliant plan come to fruition, whilst helplessly tied to your chairs.\"</p><p>\"Just give us the detonator we're here to collect, and no-one will get hurt.\" demanded Jed, unconvincingly.</p><p>Bob one ignored him. \"You see, my dear Bobs, I was your 'informer'. I let you collect the seeds of extermination, despite the extreme costs involved with obtaining them. See, they are indestructable by any technology available in this world. And as they are remotely activated, it doesn't matter where they are. It's all the more fitting the gas should originate from your headquarters!\" He was clearly very proud of himself.</p><p>\"I even made you hunt after a non-existant 'detonator'! However, your code breaking teams have come a long way - I sent you the wrong dress code for this building and it took you less than a day to crack it.\"</p><p>\"Technically if they're remotely activated, there must be a detonator.\" I interjected.</p><p>\"WRONG WRONG WRONG!\" he yelled as he swooped on me. \"It's on a countdown, controlled by our secret base across the road.\"</p><p>\"Maybe I shouldn't have mentioned that.\" He paused for a moment. \"No matter: your hands are tied, you wouldn't be able to find the secret base, and it's protected by the strongest dress code ever invented.\"</p><p>He turned to exited the room, with a twirl of his cape. \"Enjoy the show!\" he said, closing the door behind. We were alone.</p><p>\"Their eye sight really is rubbish.\" remarked Jed. \"These knots are terrible!\"</p><p>I joined Jed in slipping out of my bindings.</p>", 

"<h1>Big Buttons</h1><p>It wasn't hard to spot the countdown console - inside a room helpfully labelled \"CONTROL ROOM\" in large red letters. A large screen was counting down: 50 seconds, 49 seconds, 48 seconds ...</p><p>The console consisted of two large red buttons labelled \"Cancel\" and \"Detonate\", and a large touch screen. I quickly hit the cancel button.</p><p>A dialog appeared on the touch screen. \"Dress Code Required: Please drag the appropriate clothes onto the figure.\"</p><p>Suddenly the screen and console died. Jed had pulled out the power cord. \"We had no time!\" explained Jed, anticipating my protest.</p><p>\"Look around\" I said. \"We had to find the technology he was talking about and disable it, so it can't be used to activate the detonation later.\"</p><p>\"Like this?\" asked Jed, reaching underneath the console and ripping out a long metal rod. \"It's got another two red buttons, but no writing.\"</p><p>\"Wait, these buttons have a strong smell on them...\"</p><p>\"I <em>KNEW</em> there must be a detonator!\" I said. \"Let's get out of here before Bob whatsits returns.\"</p>", 

"<h1>Disarmament</h1><p>The client was extremely relieved when we arrived at his office. \"You were gone for a long time, I was getting worried! Why do you smell funny?\"</p><p>I explained everything, and presented the metal rod. The client smelt the two buttons individually for a long time, pondering their meaning. He then quickly sniffed each, as if to double check.</p><p>\"This button ends your species,\" he said, \"But the other disintegrates the seeds - in effect safely disposing of them.\"</p><p>He offered it back to me. \"You can have the honours. Just press <em>THAT</em> button,\" he said, pointing with both hands to make sure he was understood.</p><p>I pressed the button nervously. The eggs disappeared in a puff. We had saved the world!</p><h2>THE END.</h2><h3>... for now ... </h3>", 

"Success! You got into the building.", "Success! You got into the building."];

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
// Level 11
["\"There seems to be a relationship between the bottom half and the top half,\" observed Jed.", 
"There were two relationships between the bottom half and the top half of their costumes. One for whether to wear a hat, another for whether to wear a shirt."]



]

buildings = [
["building_ground", "building_windows"],
["building_ground", "building_windows"],
["hideout_ground", "hideout_windows"],
["office_ground", "office_windows"],
["seafood_ground", "seafood_windows"],
["building_ground", "building_windows"],
["third_ground", "third_windows"],
["building_ground", "building_windows"],
["tower_ground", "tower_windows"],
["secret_ground", "secret_windows"],
["office_ground", "office_windows"]

]
