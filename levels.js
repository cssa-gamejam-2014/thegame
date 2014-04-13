function getRandom(range){
    return Math.floor((Math.random()*range));
}

colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
allclothes = ['hat', 'shirt', 'pants', 'shoes'];

levels = [
// LEVEL ONE

{
    generator : function(){
        person = []

        chanceOfWear = {shirt: 95, hat: 80}
        var clothes = ['shirt', 'hat', 'shoes'];
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
        
        chanceOfWear = {shirt: 95, hat: 80}
        var clothes = allclothes;
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
		colours.forEach(function(entry){
			occurances = 0;
			clothing.forEach(function(item){
				if (item == entry){
					occurances++;
				}
			});
			if (occurances > 2){
				return true;
			}
		});
		return false;
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

        chanceOfWear = {hat: 65, shirt: 80, pants: 100, shoes: 45}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

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
		start = start+1%colours.length;
		person.shirt = colours[start];
		start = start+1%colours.length;
		person.pants = colours[start];
		start = start+1%colours.length;
		person.shoes = colours[start];

        return person;
    },
    randgen : function(){
        person = []
ckClothes.forEach(function(entry){
			if (!clothing[entry])
				return false;
			thisIndex = colours.indexOf(clothing[entry]);
			if (!(lastIndex+1%colours.length == thisIndex)){
				return false;
			}
			lastIndex = thisIndex;
		});
		
		return true;
    }
},
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
		
		lastIndex = colours.indexOf(clothing.hat);
		checkClothes = ['shirt', 'pants', 'shoes'];
		checkClothes.forEach(function(entry){
			if (!clothing[entry])
				return false;
			thisIndex = colours.indexOf(clothing[entry]);
			if (!(lastIndex+1%colours.length == thisIndex)){
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

        chanceOfWear = {hat: 0, shirt: 50, pants: 100, shoes: 0}
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

        chanceOfWear = {hat: 0, shirt: 50, pants: 100, shoes: 0}
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

        start = getRandom(colours.length);
		
		person.hat = colours[start];
		start = start+1%colours.length;
		person.shirt = colours[start];
		start = start+1%colours.length;
		person.pants = colours[start];
		start = start+1%colours.length;
		person.shoes = colours[start];

        return person;
    },
    randgen : function(){
        person = []
ckClothes.forEach(function(entry){
			if (!clothing[entry])
				return false;
			thisIndex = colours.indexOf(clothing[entry]);
			if (!(lastIndex+1%colours.length == thisIndex)){
				return false;
			}
			lastIndex = thisIndex;
		});
		
		return true;
    }
},
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
		
		lastIndex = colours.indexOf(clothing.hat);
		checkClothes = ['shirt', 'pants', 'shoes'];
		checkClothes.forEach(function(entry){
			if (!clothing[entry])
				return false;
			thisIndex = colours.indexOf(clothing[entry]);
			if (!(lastIndex+1%colours.length == thisIndex)){
				return false;
			}
			lastIndex = thisIndex;
		});
		
		return true;
    }.
    setup : function(){
		
	}
}];

stories = [
	"<h1>The Odd Job</h1><p>\"This has to be the oddest job we've been given, %PROT%.\"</p> <p>Jed was certainly right. As private investigators, we'd seen some interesting things, but nothing quite as bizarre.</p><p>\"Who has ever heard of an invite-only bank? How can such an exclusive organisation allow in people without any suits and ties? Can't a bank afford a less shabby building?\"</p><p>\"I noticed that too\", I added. \"We'd never fit in, we're too overdressed. We'd best pay a visit to the department store to pick up some more suitable costumes.\"</p>"
	
	
	
	
	
	, "<h1>Level Two</h1><p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "<h1>Level Three</h1><p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "<h1>Level Four</h1><p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "<h1>Level Five</h1><p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "<h1>Level Six</h1><p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "<p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "<p>This is just placeholder text. The level is still functional - can you spot the pattern?</p>", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here."
	
	
	
	
];

failures = ["<h1>No Entry</h1><p>As Jed and I approached the back of the queue, sporting our brand new costumes, the rest of the line fell silent. As the queue progressed, Jed pulled me aside.</p><p>\"Do you notice the guards are staring at us? I don't think they're going to allow us in.\"</p><p>\"You're right; they seem to be able to tell us apart. There must be a pattern that we just don't fit. Perhaps we need to revisit the costume store.\"</p>"];
successes = ["<h1>No Questions Asked</h1><p>Jed and I joined the back of the queue without any noticeable reaction from the other members of the line. We followed the others through the bank entrance without any sign of challenge from the guards. </p><p>\"That was suprisingly easy\", I whispered. \"No questions or ID checks. We must have been able to fit in.\"</p><p>We found our way to the 24th office on the second floor, as instructed, nervously opening the door. On the desk there was a brown parcel with no labels or address. Jed looked relieved: \"Just as he told us, \" he said as he picked up the parcel.</p><p>\"Alright, we've got what we need. Let's keep it cool on the way out.\"</p>", "Success! You got into building 2 .", "Success! You got into building 3.", "Success! You got into building 4.", "Success! You got into building 5.", "Success! You got into building 6.", "Success! You got into building 7.", "Success! You got into the building.", "Success! You got into the building.", "Success! You got into the building. This was the last level - come back later for more!", "Success! You got into the building.", "Success! You got into the building.", "Success! You got into the building."];
