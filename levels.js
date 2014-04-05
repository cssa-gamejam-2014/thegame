function getRandom(range){
    return Math.floor((Math.random()*range));
}

colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

levels = [{
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
        person['hat'] = colours[getRandom(6)];
        person['shoes'] = colours[getRandom(6)];

        return person;
    },
    validator : function(clothing){
        if (clothing.shirt == 'blue' || clothing.shirt == 'green'){
            return true;
        } else {
            return false;
        }
    }
},

{
    generator : function(){
        person = []

        chanceOfWear = {hat: 80, shoes: 80}
        var clothes = ['hat', 'pants', 'jacket', 'socks', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

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
        person['hat'] = colours[getRandom(6)];
        person['shoes'] = colours[getRandom(6)];

        return person;
    },
    validator : function(clothing){
        if (clothing.shirt == 'blue' || clothing.shirt == 'green'){
            return true;
        } else {
            return false;
        }
    }
},

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
        if (clothing.shirt == 'blue' || clothing.shirt == 'green'){
            return true;
        } else {
            return false;
        }
    }
},

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

        chanceOfWear = {hat: 60, shirt: 100, pants: 100, shoes: 40}
        var clothes = ['hat', 'shirt', 'pants', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });

        return person;
    },
    validator : function(clothing){
        if ((clothing.hat && !clothing.pants) || (clothing.pants && clothing.hat)){
            return true;
        } else {
            return false;
        }
    }
},

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
        return false;
    }
}]
