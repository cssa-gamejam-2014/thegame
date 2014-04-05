
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

    function getRandom(range){
        return Math.floor((Math.random()*range));
    }

    colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

    level0 = {
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
    }
    
    level1 = {
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
    }
    
    level2 = {
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
    }
    
    
    
    level3 = {
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
    }
    
    var level = level3

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
});