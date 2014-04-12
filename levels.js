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

// LEVEL TWO
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

// LEVEL THREE
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

        chanceOfWear = {hat: 80, shirt: 100, pants: 100, shoes: 100}
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

// LEVEL FOUR

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
        if ((clothing.hat && !clothing.pants) || (clothing.pants && !clothing.hat)){
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
}];

stories = [
	"<h1>The Odd Job</h1><p>\"This has to be the oddest job we've been given, %PROT%\".</p> <p>Jed was certainly right. As private investigators, we'd seen some interesting things, but nothing quite as bizarre.</p><p>\"Who has ever heard of an invite-only bank? How can such an exclusive organisation allow in people without any suits and ties?\"</p><p>\"I noticed that too.\", I added. \"We'd never fit in, we're too overdressed. We'd best pay a visit to the department store to pick up some more suitable costumes.\"</p>"
	
	
	
	
	
	, "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here.", "Testing here."
	
	
	
	
]
